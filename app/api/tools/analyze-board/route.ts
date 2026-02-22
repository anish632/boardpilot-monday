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
        healthScore: `${analysis.healthScore}/100`,
        summary,
        totalItems: String(analysis.totalItems),
        completedItems: String(analysis.completedItems),
        atRiskItems: String(analysis.atRiskItems),
        overdueItems: String(analysis.overdueItems),
      },
    });
  } catch (e) {
    return errorResponse(e);
  }
}
