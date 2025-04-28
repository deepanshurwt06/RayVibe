import { getDbConnection } from "./db";


export async function getSummaries(userId :string){
    const sql = await getDbConnection();
    const summaries = await sql`SELECT * from pdf_summary where user_id = ${userId} ORDER BY created_at DESC`;

    return summaries;
}