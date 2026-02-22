export interface BoardData {
  name: string;
  columns: { id: string; title: string; type: string }[];
  groups: { id: string; title: string }[];
  items: BoardItem[];
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

  const res = await fetch(MONDAY_API, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ query, variables: { id: [boardId] } }),
  });

  if (!res.ok) throw new Error(`monday API error: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);

  const board = json.data.boards[0];
  if (!board) throw new Error("Board not found");

  return {
    name: board.name,
    columns: board.columns,
    groups: board.groups,
    items: board.items_page.items,
  };
}
