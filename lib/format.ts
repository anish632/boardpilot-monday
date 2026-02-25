import { BoardData, BoardItem } from "./monday";
import { AnalysisResult } from "./analyze";

function getStatus(item: BoardItem): string {
  return item.column_values.find(c => c.type === "status" || c.type === "color")?.text || "Not set";
}

function getDate(item: BoardItem): string {
  return item.column_values.find(c => c.type === "date")?.text || "No deadline";
}

function getAssignee(item: BoardItem): string {
  const pv = item.column_values.find(c => c.type === "people" || c.type === "multiple-person" || c.type === "person" || c.id === "person");
  return pv?.text || "Unassigned";
}

export function formatHealthReport(board: BoardData, analysis: AnalysisResult): string {
  const lines: string[] = [];
  lines.push(`📊 Board Health Score: ${analysis.healthScore}/100`);
  lines.push(`Total: ${analysis.totalItems} items | Done: ${analysis.completedItems} | Overdue: ${analysis.overdueItems} | Stuck: ${analysis.stuckItems} | Unassigned: ${analysis.unassignedItems}`);
  lines.push("");

  for (const group of board.groups) {
    const groupItems = board.items.filter(i => i.group.id === group.id);
    if (groupItems.length === 0) continue;
    lines.push(`**${group.title}**`);
    for (const item of groupItems) {
      const status = getStatus(item);
      const date = getDate(item);
      const assignee = getAssignee(item);
      const flags: string[] = [];
      if (analysis.overdueList.some(o => o.id === item.id)) flags.push("⚠️ OVERDUE");
      if (analysis.stuckList.some(o => o.id === item.id)) flags.push("🛑 STUCK");
      if (analysis.unassignedList.some(o => o.id === item.id)) flags.push("👤 Unassigned");
      lines.push(`• ${item.name} — Status: ${status} | Due: ${date} | Owner: ${assignee}${flags.length ? " | " + flags.join(", ") : ""}`);
    }
    lines.push("");
  }

  if (analysis.atRiskItems > 0) {
    lines.push(`⚠️ ${analysis.atRiskItems} items need attention.`);
  } else {
    lines.push("✅ All items are on track.");
  }

  return lines.join("\n");
}

export function formatStatusReport(board: BoardData, analysis: AnalysisResult, audience: string): string {
  const lines: string[] = [];
  lines.push(`📋 Status Report — ${board.name}`);
  lines.push(`Health: ${analysis.healthScore}/100 | Completion: ${Math.round((analysis.completedItems / Math.max(analysis.totalItems, 1)) * 100)}%`);
  lines.push("");

  const done = board.items.filter(i => {
    const s = getStatus(i).toLowerCase();
    return s.includes("done") || s.includes("complete");
  });
  const inProgress = board.items.filter(i => {
    const s = getStatus(i).toLowerCase();
    return s.includes("working") || s.includes("progress");
  });
  const stuck = board.items.filter(i => {
    const s = getStatus(i).toLowerCase();
    return s.includes("stuck") || s.includes("block");
  });
  const notStarted = board.items.filter(i => {
    const s = getStatus(i);
    return s === "Not set";
  });

  if (done.length) {
    lines.push("✅ **Completed**");
    done.forEach(i => lines.push(`• ${i.name} (${getDate(i)})`));
    lines.push("");
  }

  if (inProgress.length) {
    lines.push("🔄 **In Progress**");
    inProgress.forEach(i => lines.push(`• ${i.name} — Due: ${getDate(i)} | Owner: ${getAssignee(i)}`));
    lines.push("");
  }

  if (stuck.length) {
    lines.push("🛑 **Blocked**");
    stuck.forEach(i => lines.push(`• ${i.name} — Due: ${getDate(i)} | Owner: ${getAssignee(i)}`));
    lines.push("");
  }

  if (notStarted.length) {
    lines.push("📅 **Not Started**");
    notStarted.forEach(i => lines.push(`• ${i.name} — Due: ${getDate(i)} | Owner: ${getAssignee(i)}`));
    lines.push("");
  }

  return lines.join("\n");
}

export function formatPrioritization(board: BoardData, analysis: AnalysisResult): string {
  const active = board.items.filter(i => {
    const s = getStatus(i).toLowerCase();
    return !s.includes("done") && !s.includes("complete");
  });

  if (active.length === 0) return "✅ All items are complete. Nothing to prioritize.";

  // Score items: overdue +3, stuck +3, no status +1, unassigned +1, sooner deadline +1
  const now = new Date();
  const scored = active.map(item => {
    let score = 0;
    if (analysis.overdueList.some(o => o.id === item.id)) score += 3;
    if (analysis.stuckList.some(o => o.id === item.id)) score += 3;
    if (analysis.unassignedList.some(o => o.id === item.id)) score += 1;
    if (getStatus(item) === "Not set") score += 1;
    const dateStr = item.column_values.find(c => c.type === "date")?.text;
    if (dateStr) {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime()) && d < now) score += 2;
      else if (!isNaN(d.getTime())) {
        const daysOut = (d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        if (daysOut < 3) score += 1;
      }
    }
    return { item, score };
  }).sort((a, b) => b.score - a.score);

  const lines: string[] = [];
  lines.push(`🎯 Priority Ranking — ${board.name}`);
  lines.push("");

  const high = scored.filter(s => s.score >= 3);
  const medium = scored.filter(s => s.score >= 1 && s.score < 3);
  const low = scored.filter(s => s.score === 0);

  if (high.length) {
    lines.push("🔴 **High Priority**");
    high.forEach((s, i) => {
      const reasons: string[] = [];
      if (analysis.overdueList.some(o => o.id === s.item.id)) reasons.push("overdue");
      if (analysis.stuckList.some(o => o.id === s.item.id)) reasons.push("stuck");
      if (analysis.unassignedList.some(o => o.id === s.item.id)) reasons.push("unassigned");
      lines.push(`${i + 1}. ${s.item.name} — Status: ${getStatus(s.item)} | Due: ${getDate(s.item)} | Owner: ${getAssignee(s.item)}${reasons.length ? " (" + reasons.join(", ") + ")" : ""}`);
    });
    lines.push("");
  }

  if (medium.length) {
    lines.push("🟡 **Medium Priority**");
    medium.forEach((s, i) => {
      lines.push(`${high.length + i + 1}. ${s.item.name} — Status: ${getStatus(s.item)} | Due: ${getDate(s.item)} | Owner: ${getAssignee(s.item)}`);
    });
    lines.push("");
  }

  if (low.length) {
    lines.push("🟢 **Low Priority**");
    low.forEach((s, i) => {
      lines.push(`${high.length + medium.length + i + 1}. ${s.item.name} — Status: ${getStatus(s.item)} | Due: ${getDate(s.item)} | Owner: ${getAssignee(s.item)}`);
    });
  }

  return lines.join("\n");
}
