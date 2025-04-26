'use client'

import { on } from "events";
import UploadFormInput from '@/components/upload/upload-form-input';
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
// import { generatePdfSummary } from "@/actions/upload-actions";

const schema = z.object({
    file: z
   .instanceof(File , {message : 'Invalid file'})
   .refine((file) => file.size <= 20 * 1024 * 1024, 'File size must be less than 20MB'   
   )
   .refine((file) => file.type.startsWith('application/pdf'), 'File must be a PDF')
});



export default function UploadForm() {
     
    const {startUpload , routeConfig} = useUploadThing("pdfUploader", {
        onClientUploadComplete: () => {
            console.log('uploaded successfully');
        },
        onUploadError:()=>{
            console.log("error occured while uploading")
        },
        onUploadBegin:({file})=>{
            console.log('uploading has begin', file);
        }
    });
   

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)  =>{
        e.preventDefault();

        console.log("submitted");
        const formData = new FormData(e.currentTarget);
        const file = formData.get("file") as File;

        // validating the fields 
         const validatedFields = schema.safeParse({file});
         
            console.log(validatedFields);

         if(!validatedFields.success){
            console.log(validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid file');
            return;
         }
         

        // schema validation with zod
        // upload the file to upload thing
        const resp = await startUpload([file]);
        if(!resp) {
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
        const summary = await summaryRes.json();
        console.log({summary});
        // summarize the pdf using AI
        // save the summary to the database 
        // redirect to the summary page

    }
   return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
     <UploadFormInput onSubmit={handleSubmit}
     />
    </div>
  );
}
