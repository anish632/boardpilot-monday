import { NextRequest, NextResponse } from "next/server";
import { fetchBoardData } from "./monday";
import { analyzeBoard, AnalysisResult } from "./analyze";
import { BoardData } from "./monday";

export async function parseRequest(req: NextRequest) {
  const body = await req.json();
  const payload = body.payload ?? body;
  const fields = payload?.inboundFieldValues ?? {};
  const boardId = fields.board;
  const token = payload?.shortLivedToken;
  if (!boardId || !token) throw new Error("Missing board or shortLivedToken");
  return { boardId: Number(boardId), token: String(token), fields };
}

export async function getBoardAndAnalysis(boardId: number, token: string): Promise<{ board: BoardData; analysis: AnalysisResult }> {
  const board = await fetchBoardData(boardId, token);
  const analysis = analyzeBoard(board);
  return { board, analysis };
}

export function errorResponse(e: unknown) {
  const msg = e instanceof Error ? e.message : "Unknown error";
  return NextResponse.json({ outputFields: { error: msg } }, { status: 200 });
}
