import OpenAI from "openai";
import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummaryFromOpenAI(pdfText: string) {


    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role : 'system', 
                    content : SUMMARY_SYSTEM_PROMPT,
                },
                {
                    role: "user",
                    content: ` Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting. Also, generate a short, clear title (less than 8 words) for the document. Respond ONLY in this JSON format:\n\n{ "title": "Generated Title", "summary": "Generated Summary" }\n\nDocument:\n\n${pdfText}`,

                   
                },
            ],
           temperature:0.7,
           max_tokens: 1500,
        });
        const result = completion.choices[0].message.content;
        let parsedResult;

        try {
            if (result === null) {
                throw new Error("OpenAI response is null");
            }
            parsedResult = JSON.parse(result); // Parse the response to extract title and summary
        } catch (e) {
            console.error("Error parsing the response from OpenAI:", e);
            throw new Error("Invalid response format");
        }

        return parsedResult; 
    
    } catch (error :any) {
        if(error?.status === 429){
           throw new Error('RATE_LIMIT_EXCEEDED');
        }
        throw error;
    }

}


