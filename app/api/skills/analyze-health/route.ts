import { NextRequest, NextResponse } from "next/server";
import { parseRequest, getBoardAndAnalysis, errorResponse } from "@/lib/helpers";
import { formatHealthReport } from "@/lib/format";

export async function POST(req: NextRequest) {
  try {
    const { boardId, token } = await parseRequest(req);
    const { board, analysis } = await getBoardAndAnalysis(boardId, token);
    const report = formatHealthReport(board, analysis);

    return NextResponse.json({
      outputFields: {
        success: true,
        boardName: board.name,
        healthScore: analysis.healthScore,
        analysis: report,
      },
    });
  } catch (e) {
    return errorResponse(e);
  }
}
