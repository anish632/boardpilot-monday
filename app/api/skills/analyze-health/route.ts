import { NextRequest, NextResponse } from "next/server";
import { parseRequest, getBoardAndAnalysis, errorResponse } from "@/lib/helpers";
import { generateHealthSummary } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { boardId, token } = await parseRequest(req);
    const { board, analysis } = await getBoardAndAnalysis(boardId, token);
    const summary = await generateHealthSummary(board, analysis);

    return NextResponse.json({
      outputFields: {
        success: true,
        boardName: board.name,
        healthScore: analysis.healthScore,
        analysis: summary,
      },
    });
  } catch (e) {
    return errorResponse(e);
  }
}
