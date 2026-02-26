export interface BoardData {
  name: string;
  columns: { id: string; title: string; type: string }[];
  groups: { id: string; title: string }[];
  items: BoardItem[];
  userTimezone: string;
}

export interface BoardItem {
  id: string;
  name: string;
  column_values: { id: string; text: string; value: string | null; type: string }[];
  group: { id: string; title: string };
  created_at: string;
  updated_at: string;
}

const MONDAY_API = "https://api.monday.com/v2";

export async function fetchBoardData(boardId: number, token: string): Promise<BoardData> {
  const query = `query ($id: [ID!]!) {
    me { time_zone_identifier }
    boards(ids: $id) {
      name
      columns { id title type }
      groups { id title }
      items_page(limit: 500) {
        items {
          id name
          column_values { id text value type }
          group { id title }
          created_at updated_at
        }
      }
    }
  }`;

  // Try provided token first, fall back to API key
  const tokens = [token, process.env.MONDAY_API_KEY].filter(Boolean) as string[];
  let lastError = "";

  for (const t of tokens) {
    const res = await fetch(MONDAY_API, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: t },
      body: JSON.stringify({ query, variables: { id: [boardId] } }),
    });

    if (!res.ok) { lastError = `monday API error: ${res.status}`; continue; }
    const json = await res.json();
    if (json.errors) { lastError = json.errors[0].message; continue; }

    const board = json.data.boards[0];
    if (!board) { lastError = "Board not found"; continue; }

    const userTimezone = json.data.me?.time_zone_identifier || "UTC";
    return {
      name: board.name,
      columns: board.columns,
      groups: board.groups,
      items: board.items_page.items,
      userTimezone,
    };
  }

  throw new Error(lastError || "Failed to fetch board data");
}
