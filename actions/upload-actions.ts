'use server'
import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatedFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function generatePdfSummary(uploadResponse: any) {
    if (!uploadResponse || !uploadResponse[0]?.serverData?.file?.url) {
        return {
            success: false,
            message: 'File Upload failed',
            data: null,
        };
    }

    const {
        serverData: { userId, file: { ufsUrl: pdfUrl, name: fileName } },
    } = uploadResponse[0];

    try {
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log("this is pdf text", pdfText);

       
        let summary;
        let title;

        try { 
            // generate summary

            summary = await generateSummaryFromOpenAI(pdfText);
            console.log("this is summary", summary);

           
        } catch (error) {
            
            // call gemani

            if(error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED'){
                try{
 
                   summary = await generateSummaryFromGemini(pdfText);  
                   console.log("this is summary from gemini", summary);                     
                }catch(geminiError){
                   console.log('Gemini API fails after the OpenAI quota exceeded', geminiError);
                   throw new Error('Failed to generate summary with available AI provider');
                }
               
            }else{
                throw error;
            }
        }
       
        if(!summary){
            return {
                success: false,
                message: 'Summary generation failed',
                data: null,
            };
        }
        return {
            success: true,
            message: 'Summary generated successfully',
            data: {
                summary,
                
            },
        };
    } catch (error) {
        console.log("this is the error of upload-action block", error);
        return {
            success: false,
            message: 'File Parsing failed',
            data: null,
        };
    }
}

 interface pdfSummaryType {
    userId?: string;
    fileUrl: string;
    summary: string;
    title: string;
    fileName: string;
 }

export async function savePdfSummary({
    userId,
    fileUrl,
    summary, 
    title, 
    fileName
    }: pdfSummaryType) {

        // sql inserting pdf summary
    try{
      const sql = await getDbConnection();
      await sql`INSERT INTO pdf_summary(
        user_id,
        original_file_url,
        summary_text,
        status,  
        title,      
        file_name)
        VALUES(
          ${userId},
          ${fileUrl},         
          ${summary},
          ${'completed'},
          ${title},
          ${fileName}
        )`
    }catch(error){
        console.error('Error saving PDF summary:', error);
        throw Error;
    }
}

export async function storedPdfSummaryAction({
    fileUrl,
    summary,
    title,  
    fileName,   
}: pdfSummaryType){
    // user is logged in and has a useId
    // savePdf summary
    //save pdfsummary()

    let savedSummary:any;
    try {
        const {userId } = await auth();
        if(!userId){
            return {
                success: false,
                message:'User not found',
            }
        }
        savedSummary = await savePdfSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName,
        });

        if(!savedSummary){
            return {
                success: false,
                message: 'Failed to save PDF summary , please try again...',
            };
        }
        
        const formatedFileName = formatedFileNameAsTitle(fileName)

        
    } catch (error) {
        return {
            success : false,
            message: error instanceof Error ? error.message : 'Error saving PDF summary',
        };
    }

    // revalidate the cache   
    revalidatePath(`/summaries/${savedSummary.id}`);

    return {
        success: true,
        message: 'PDF summary saved successfully',
        data: {
            id:savedSummary.id,
            title:fileName,
            summary,
        }
    };
}