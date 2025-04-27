'use client'

import { on } from "events";
import UploadFormInput from '@/components/upload/upload-form-input';
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { storedPdfSummaryAction } from "@/actions/upload-actions";


const schema = z.object({
    file: z
   .instanceof(File , {message : 'Invalid file'})
   .refine((file) => file.size <= 20 * 1024 * 1024, 'File size must be less than 20MB'   
   )
   .refine((file) => file.type.startsWith('application/pdf'), 'File must be a PDF')
});



export default function UploadForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
     
    const {startUpload , routeConfig} = useUploadThing("pdfUploader", {
        onClientUploadComplete: () => {
            toast.success('File uploaded successfully ✅');
        },
        onUploadError:()=>{
            console.log("error occured while uploading")
        },
        onUploadBegin:({file})=>{
            toast.message('Uploading started 📤');
        }
    });
   

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)  =>{
        e.preventDefault();
        try {
        setIsLoading(true);

        console.log("submitted");
        const formData = new FormData(e.currentTarget);
        const file = formData.get("file") as File;

        // validating the fields 
         const validatedFields = schema.safeParse({file});
         
            console.log(validatedFields);

         if(!validatedFields.success){
            console.log(validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file');

           setIsLoading(false);
            return;
         }
         

        // schema validation with zod
        // upload the file to upload thing
        const resp = await startUpload([file]);
        if(!resp) {
            setIsLoading(false);
            return;
        }
       
        // parse the pdf using lang chain
        const summaryRes = await fetch("/api/generate-summary", {
            method: "POST",
            body: JSON.stringify(resp),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const result = await summaryRes.json();
        

        const {data = null , message = null } = result ||{};
        if(data){
            let storeResult : any;
            toast.success('Summary generated successfully 📚✨');

            
            if(data.summary){
               storeResult = await storedPdfSummaryAction({
                    summary : data.summary,
                    fileUrl : resp[0].serverData.file.url,
                    title : data.title,
                    fileName : file.name,

                })
              // save the summary to database
              toast.success('Your PDF has been successfully summarized and saved ✨');
              formRef.current?.reset();
            } 

            
        }
       
            
       
        // summarize the pdf using AI
        // save the summary to the database 
        // redirect to the summary page

    } catch (error) {
        setIsLoading(false);
        console.error('Error occurred', error);
        formRef.current?.reset();
    }


    }
   return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
     <UploadFormInput 
      isLoading={isLoading}
     ref={formRef} onSubmit={handleSubmit}
     />
    </div>
  );
}
