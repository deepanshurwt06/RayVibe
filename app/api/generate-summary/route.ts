import { generatePdfSummary } from "@/actions/upload-actions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const result = await generatePdfSummary(body);

    return NextResponse.json(result);
}
