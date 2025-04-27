'use server'
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";

 

// export async function generatePdfSummary(uploadResponse: [{
//     serverData :{
//         userId: string;
//         file: {
//             url: string;
//             name: string;
//         };
//     };
// }]){

//    if(!uploadResponse){
//     return {
//         success : false,
//         message: 'File Upload failed',
//         data: null,
//     };
//    }

//    const {serverData :{
//         userId,
//         file : {url :pdfUrl , name: fileName},
//    }} = uploadResponse[0];

//    if(!pdfUrl){
//     return {
//         success : false,
//         message: 'File Upload failed',
//         data: null,
//     };
//    }

//    try {
//     const pdfText = await fetchAndExtractPdfText(pdfUrl);
//     console.log("this is pdf text" , pdfText);

//     return {
//         success: true,
//         message: 'PDF parsed successfully',
//         data: {
//           userId,
//           fileName,
//           pdfUrl,
//           pdfText,
//         },
//       };
//    } catch (error) {
//     console.log("this is the error of upload-action block ",error);  // remove the console log after testing
//     return {
//         success : false,
//         message: 'File Upload failed',
//         data: null,
//     };
//    }
// }     


// new code for server action 



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

        try {
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
