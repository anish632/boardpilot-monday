import { NextRequest, NextResponse } from "next/server";
import { parseRequest, getBoardAndAnalysis, errorResponse } from "@/lib/helpers";
import { generateRiskReport } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { boardId, token } = await parseRequest(req);
    const { board, analysis } = await getBoardAndAnalysis(boardId, token);
    const riskReport = await generateRiskReport(board, analysis);

    return NextResponse.json({
      outputFields: {
        risksFound: String(analysis.atRiskItems),
        riskReport,
      },
    });
  } catch (e) {
    return errorResponse(e);
  }
}
