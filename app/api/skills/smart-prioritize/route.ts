import { NextRequest, NextResponse } from "next/server";
import { parseRequest, getBoardAndAnalysis, errorResponse } from "@/lib/helpers";
import { generatePrioritization } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const { boardId, token } = await parseRequest(req);
    const { board, analysis } = await getBoardAndAnalysis(boardId, token);
    const prioritization = await generatePrioritization(board, analysis);

    return NextResponse.json({
      outputFields: {
        success: true,
        boardName: board.name,
        prioritization,
      },
    });
  } catch (e) {
    return errorResponse(e);
  }
}
