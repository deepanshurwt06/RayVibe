"use server";
import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatedFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { generateSummaryFromCohere } from "@/lib/cohere";

export async function generatePdfSummary({
  fileUrl,
  fileName
}:{
  fileUrl: string,
  fileName: string,
}) {
  if(!fileUrl) {
    return {
      success : false,
      message: 'File uploaded failed',
      data: null,
    };
  }

  if(!fileUrl){
    return {
      success : false,
      message: 'File uploaded failed',
      data: null,
    };
  }

 

  try {
    const pdfText = await fetchAndExtractPdfText(fileUrl);
    console.log("this is pdf text", pdfText);

    let summaryData;
    let summary = "";
    let title = "";

    // 1. Try Cohere
    try {
      summaryData = await generateSummaryFromCohere(pdfText);
      summary = summaryData.summary;
      title = summaryData.title;
      console.log('this is title from cohere', title);
      console.log("this is summary from Cohere", summary);
    } catch (cohereError) {
      console.warn("Cohere failed:", cohereError);

      // 2. Try Gemini
      try {
        summaryData = await generateSummaryFromGemini(pdfText);
        summary = summaryData.summary;
        title = summaryData.title;
        console.log(
          "this is summary from Gemini",
          summary,
          "this is title",
          title
        );
      } catch (geminiError) {
        console.warn("Gemini failed:", geminiError);

        // 3. Try OpenAI
        try {
          summaryData = await generateSummaryFromOpenAI(pdfText);
          summary = summaryData.summary;
          title = summaryData.title;
          console.log("this is summary from OpenAI", summary, title);
        } catch (openAiError) {
          console.error("OpenAI also failed:", openAiError);
          throw new Error("All providers failed to generate summary.");
        }
      }
    }

    if (!summary) {
      return {
        success: false,
        message: "Summary generation failed",
        data: null,
      };
    }

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        summary,
        title,
      },
    };
  } catch (error) {
    console.log("this is the error of upload-action block", error);
    return {
      success: false,
      message: "File Parsing or Summary generation failed",
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
  fileName,
}: pdfSummaryType) {
  // sql inserting pdf summary
  try {
    const sql = await getDbConnection();
    const [savedSummary] = await sql`INSERT INTO pdf_summary(
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
          ${"completed"},
          ${title},
          ${fileName}
        )  RETURNING id , summary_text;`;
    return savedSummary;
  } catch (error) {
    console.error("Error saving PDF summary:", error);
    throw Error;
  }
}

export async function storedPdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: pdfSummaryType) {
  // user is logged in and has a useId
  // savePdf summary
  //save pdfsummary()

  let savedSummary: any;
  try {
    const { userId } = await auth();
    if (!userId) {
      return {
        success: false,
        message: "User not found",
      };
    }
    savedSummary = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!savedSummary) {
      return {
        success: false,
        message: "Failed to save PDF summary , please try again...",
      };
    }

    const formatedFileName = formatedFileNameAsTitle(fileName);
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving PDF summary",
    };
  }

  // revalidate the cache
  revalidatePath(`/summaries/${savedSummary.id}`);

  return {
    success: true,
    message: "PDF summary saved successfully",
    data: {
      id: savedSummary.id,
      title: fileName,
      summary,
    },
  };
}
