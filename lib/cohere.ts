import { CohereClient } from 'cohere-ai';
import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || '',
});

export const generateSummaryFromCohere = async (pdfText: string) => {
  try {
    const prompt = `${SUMMARY_SYSTEM_PROMPT}

Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting using the format above in the prompt. Also, generate a short, clear title (less than 8 words) for the document. Respond ONLY in this JSON format:

{
  "title": "Generated Title",
  "summary": "Generated Summary"
}

Document to summarize:

${pdfText}`;

    const chat = await cohere.chat({
      model: 'command-r',
      temperature: 0.7,
      message: prompt,
    });

    const text = chat.text.trim();

    const cleaned = text.replace(/^```json|```$/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return parsed;
  } catch (error) {
    console.error('Cohere failed:', error);
    throw error;
  }
};
