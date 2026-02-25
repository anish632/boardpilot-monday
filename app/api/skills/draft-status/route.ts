import { NextRequest, NextResponse } from "next/server";
import { parseRequest, getBoardAndAnalysis, errorResponse } from "@/lib/helpers";
import { formatStatusReport } from "@/lib/format";

export async function POST(req: NextRequest) {
  try {
    const { boardId, token, fields } = await parseRequest(req);
    const audience = (fields.audience as string) || "team";
    const { board, analysis } = await getBoardAndAnalysis(boardId, token);
    const report = formatStatusReport(board, analysis, audience);

    return NextResponse.json({
      outputFields: {
        success: true,
        boardName: board.name,
        statusUpdate: report,
      },
    });
  } catch (e) {
    return errorResponse(e);
  }
}
