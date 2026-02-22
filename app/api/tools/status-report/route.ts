import { NextRequest, NextResponse } from "next/server";
import { parseRequest, getBoardAndAnalysis, errorResponse } from "@/lib/helpers";
import { generateStatusReport } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { boardId, token } = await parseRequest(req);
    const { board, analysis } = await getBoardAndAnalysis(boardId, token);
    const report = await generateStatusReport(board, analysis);

    return NextResponse.json({ outputFields: { report } });
  } catch (e) {
    return errorResponse(e);
  }
}
