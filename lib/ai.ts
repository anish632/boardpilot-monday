import Groq from "groq-sdk";
import { AnalysisResult } from "./analyze";
import { BoardData, BoardItem } from "./monday";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function chat(prompt: string): Promise<string> {
  const res = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1,
    max_tokens: 800,
  });
  return res.choices[0]?.message?.content ?? "";
}

function itemLine(item: BoardItem): string {
  const status = item.column_values.find(c => c.type === "color" || c.type === "status")?.text ?? "No status";
  const due = item.column_values.find(c => c.type === "date" || c.id === "date" || c.id === "due_date")?.text ?? "No date";
  const assignee = item.column_values.find(c => c.type === "multiple-person" || c.type === "person")?.text || "Unassigned";
  return `"${item.name}" | Group: ${item.group.title} | Status: ${status} | Due: ${due} | Assignee: ${assignee}`;
}

export async function generateHealthSummary(board: BoardData, analysis: AnalysisResult): Promise<string> {
  const items = board.items.map(itemLine).join("\n");
  return chat(
    `Summarize this board's health in 2-3 sentences. ONLY reference items that appear in the data below. Do not invent or assume any items, dates, or people not listed.

Board: "${board.name}"
Health Score: ${analysis.healthScore}/100
Total: ${analysis.totalItems} | Done: ${analysis.completedItems} | Overdue: ${analysis.overdueItems} | Stuck: ${analysis.stuckItems} | Unassigned: ${analysis.unassignedItems} | Stale: ${analysis.staleItems}

All items:
${items}

Be specific — name the actual items that are at risk.`
  );
}

export async function generateRiskReport(board: BoardData, analysis: AnalysisResult): Promise<string> {
  const risks = [
    ...analysis.overdueList.map(i => `OVERDUE: ${itemLine(i)}`),
    ...analysis.stuckList.map(i => `STUCK: ${itemLine(i)}`),
    ...analysis.unassignedList.map(i => `UNASSIGNED: ${itemLine(i)}`),
    ...analysis.staleList.map(i => `STALE: ${itemLine(i)}`),
  ];

  if (risks.length === 0) return "No risks identified. All items are on track.";

  return chat(
    `Generate a concise risk report for board "${board.name}". ONLY reference the items listed below. Do not invent any items, dates, or people.

Risk items:
${risks.join("\n")}

Group by risk type. Suggest one action per item. Keep it under 300 words.`
  );
}

export async function generatePrioritization(board: BoardData, analysis: AnalysisResult): Promise<string> {
  const active = board.items
    .filter(i => {
      const s = i.column_values.find(c => c.type === "color" || c.type === "status")?.text?.toLowerCase() ?? "";
      return !s.includes("done") && !s.includes("complete");
    })
    .map(itemLine);

  if (active.length === 0) return "All items are complete. Nothing to prioritize.";

  return chat(
    `Rank these active tasks by priority. ONLY reference items listed below. Do not invent any items, dates, or people not in this list.

Board: "${board.name}"
Stats: ${analysis.overdueItems} overdue, ${analysis.stuckItems} stuck, ${analysis.unassignedItems} unassigned

Active items:
${active.join("\n")}

Return a numbered list grouped into High/Medium/Low tiers. One sentence per item explaining why. Keep it under 300 words.`
  );
}

export async function generateStatusReport(board: BoardData, analysis: AnalysisResult, audience: string = "team"): Promise<string> {
  const done = board.items.filter(i => {
    const s = i.column_values.find(c => c.type === "color" || c.type === "status")?.text?.toLowerCase() ?? "";
    return s.includes("done") || s.includes("complete");
  }).map(i => `- ${i.name}`);

  const inProgress = board.items.filter(i => {
    const s = i.column_values.find(c => c.type === "color" || c.type === "status")?.text?.toLowerCase() ?? "";
    return s.includes("working") || s.includes("progress");
  }).map(i => `- ${i.name}`);

  const stuck = analysis.stuckList.map(i => `- ${i.name}`);
  const upcoming = board.items.filter(i => {
    const s = i.column_values.find(c => c.type === "color" || c.type === "status")?.text?.toLowerCase() ?? "";
    return !s || (!s.includes("done") && !s.includes("complete") && !s.includes("working") && !s.includes("progress") && !s.includes("stuck") && !s.includes("block"));
  }).map(i => `- ${i.name}`);

  const tone = audience === "stakeholders"
    ? "Write for executives — outcomes and decisions needed."
    : "Write for the team — specifics on progress and blockers.";

  return chat(
    `Generate a status report for board "${board.name}". ${tone}
ONLY reference items listed below. Do not invent any items.

Done: ${done.length > 0 ? done.join("\n") : "None"}
In Progress: ${inProgress.length > 0 ? inProgress.join("\n") : "None"}
Blocked: ${stuck.length > 0 ? stuck.join("\n") : "None"}
Upcoming: ${upcoming.length > 0 ? upcoming.join("\n") : "None"}

Health Score: ${analysis.healthScore}/100 | Completion: ${Math.round((analysis.completedItems / Math.max(analysis.totalItems, 1)) * 100)}%

Format: Summary (2 sentences), then Done/In Progress/Blocked/Upcoming sections. Keep it under 250 words.`
  );
}
