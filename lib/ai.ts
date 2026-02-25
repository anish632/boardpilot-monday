import Groq from "groq-sdk";
import { AnalysisResult } from "./analyze";
import { BoardData } from "./monday";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function chat(prompt: string): Promise<string> {
  const res = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 1024,
  });
  return res.choices[0]?.message?.content ?? "";
}

export async function generateHealthSummary(board: BoardData, analysis: AnalysisResult): Promise<string> {
  return chat(
    `You are a project health analyst. Summarize this monday.com board health in 2-3 concise sentences.
Board: "${board.name}"
Health Score: ${analysis.healthScore}/100
Total Items: ${analysis.totalItems}, Completed: ${analysis.completedItems}
At Risk: ${analysis.atRiskItems}, Overdue: ${analysis.overdueItems}, Stuck: ${analysis.stuckItems}
Unassigned: ${analysis.unassignedItems}, Stale (14+ days): ${analysis.staleItems}
Be specific and actionable.`
  );
}

export async function generateRiskReport(board: BoardData, analysis: AnalysisResult): Promise<string> {
  const risks = [
    ...analysis.overdueList.map((i) => `OVERDUE: "${i.name}" (${i.group.title})`),
    ...analysis.stuckList.map((i) => `STUCK: "${i.name}" (${i.group.title})`),
    ...analysis.unassignedList.map((i) => `UNASSIGNED: "${i.name}" (${i.group.title})`),
    ...analysis.staleList.map((i) => `STALE: "${i.name}" (${i.group.title})`),
  ].slice(0, 50);

  return chat(
    `You are a project risk analyst. Generate a concise risk report for board "${board.name}".
Risks found:\n${risks.join("\n")}
Group by risk type. Prioritize by severity. Suggest actions. Keep it under 500 words.`
  );
}

export async function generatePrioritization(board: BoardData, analysis: AnalysisResult): Promise<string> {
  const tasks = board.items
    .filter((i) => {
      const s = i.column_values
        .find((c) => c.type === "color" || c.type === "status")
        ?.text?.toLowerCase() ?? "";
      return !s.includes("done") && !s.includes("complete");
    })
    .slice(0, 50)
    .map((i) => {
      const status = i.column_values.find((c) => c.type === "color" || c.type === "status")?.text ?? "Unknown";
      const due = i.column_values.find((c) => c.type === "date" || c.id === "date" || c.id === "due_date")?.text ?? "No due date";
      const assignee = i.column_values.find((c) => c.type === "multiple-person" || c.type === "person")?.text ?? "Unassigned";
      return `- "${i.name}" | Group: ${i.group.title} | Status: ${status} | Due: ${due} | Assignee: ${assignee}`;
    });

  return chat(
    `You are a project prioritization expert. Rank the following active tasks from board "${board.name}" by priority.
Consider: approaching/past deadlines, stuck/blocked status, unassigned items, and workload balance.

Active tasks:
${tasks.join("\n")}

Board stats: ${analysis.totalItems} total, ${analysis.completedItems} done, ${analysis.overdueItems} overdue, ${analysis.stuckItems} stuck, ${analysis.unassignedItems} unassigned.

Return a numbered priority list. For each task explain briefly why it's ranked there. Group into High/Medium/Low priority tiers. Keep it under 500 words.`
  );
}

export async function generateStatusReport(board: BoardData, analysis: AnalysisResult, audience: string = "team"): Promise<string> {
  const tone = audience === "stakeholders"
    ? "Write for executive stakeholders — focus on outcomes, risks, and decisions needed. Keep it high-level."
    : "Write for the project team — include specifics on what's done, in-progress, blocked, and upcoming.";

  return chat(
    `You are a project manager. Generate a status report for monday.com board "${board.name}".
Audience: ${audience}. ${tone}
Health Score: ${analysis.healthScore}/100
Total: ${analysis.totalItems} items, ${analysis.completedItems} completed (${Math.round((analysis.completedItems / Math.max(analysis.totalItems, 1)) * 100)}%)
At Risk: ${analysis.atRiskItems}, Overdue: ${analysis.overdueItems}, Stuck: ${analysis.stuckItems}
Unassigned: ${analysis.unassignedItems}, Stale: ${analysis.staleItems}
Groups: ${board.groups.map((g) => g.title).join(", ")}
Format with sections: Executive Summary, Progress, Risks & Issues, Recommendations. Be professional and concise.`
  );
}
