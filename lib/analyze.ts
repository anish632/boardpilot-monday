import { BoardData, BoardItem } from "./monday";

export interface AnalysisResult {
  healthScore: number;
  totalItems: number;
  completedItems: number;
  atRiskItems: number;
  overdueItems: number;
  stuckItems: number;
  unassignedItems: number;
  staleItems: number;
  overdueList: BoardItem[];
  stuckList: BoardItem[];
  unassignedList: BoardItem[];
  staleList: BoardItem[];
}

function getStatus(item: BoardItem): string {
  const sv = item.column_values.find(
    (c) => c.type === "color" || c.type === "status"
  );
  return sv?.text?.toLowerCase() ?? "";
}

function getDueDate(item: BoardItem): Date | null {
  const dv = item.column_values.find(
    (c) => c.type === "date" || c.id === "date" || c.id === "due_date"
  );
  if (!dv?.text) return null;
  const d = new Date(dv.text);
  return isNaN(d.getTime()) ? null : d;
}

function isAssigned(item: BoardItem): boolean {
  const pv = item.column_values.find(
    (c) => c.type === "multiple-person" || c.type === "person" || c.id === "person"
  );
  if (!pv) return true;
  if (!pv.text && !pv.value) return false;
  if (pv.value) {
    try {
      const v = JSON.parse(pv.value);
      if (v.personsAndTeams && v.personsAndTeams.length === 0) return false;
    } catch {}
  }
  return !!pv.text;
}

export function analyzeBoard(data: BoardData): AnalysisResult {
  const now = new Date();
  const staleThreshold = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

  const completed: BoardItem[] = [];
  const stuck: BoardItem[] = [];
  const overdue: BoardItem[] = [];
  const unassigned: BoardItem[] = [];
  const stale: BoardItem[] = [];
  const atRisk: Set<string> = new Set();

  for (const item of data.items) {
    const status = getStatus(item);

    if (status.includes("done") || status.includes("complete")) {
      completed.push(item);
      continue;
    }

    if (status.includes("stuck") || status.includes("block")) {
      stuck.push(item);
      atRisk.add(item.id);
    }

    const due = getDueDate(item);
    if (due && due < now) {
      overdue.push(item);
      atRisk.add(item.id);
    }

    if (!isAssigned(item)) {
      unassigned.push(item);
      atRisk.add(item.id);
    }

    const updated = new Date(item.updated_at);
    if (updated < staleThreshold) {
      stale.push(item);
      atRisk.add(item.id);
    }
  }

  const total = data.items.length;
  if (total === 0) {
    return {
      healthScore: 100, totalItems: 0, completedItems: 0, atRiskItems: 0,
      overdueItems: 0, stuckItems: 0, unassignedItems: 0, staleItems: 0,
      overdueList: [], stuckList: [], unassignedList: [], staleList: [],
    };
  }

  const completionRate = completed.length / total;
  const riskRate = atRisk.size / total;
  const overdueRate = overdue.length / total;
  const stuckRate = stuck.length / total;

  const score = Math.round(
    Math.max(0, Math.min(100,
      completionRate * 50 +
      (1 - riskRate) * 25 +
      (1 - overdueRate) * 15 +
      (1 - stuckRate) * 10
    ))
  );

  return {
    healthScore: score,
    totalItems: total,
    completedItems: completed.length,
    atRiskItems: atRisk.size,
    overdueItems: overdue.length,
    stuckItems: stuck.length,
    unassignedItems: unassigned.length,
    staleItems: stale.length,
    overdueList: overdue,
    stuckList: stuck,
    unassignedList: unassigned,
    staleList: stale,
  };
}
