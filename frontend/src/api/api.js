const API_BASE = "http://localhost:4566/restapis/{apiId}/local/_user_request_";

export async function getTodos() {
  const res = await fetch(`${API_BASE}/todos`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return await res.json();
}

export async function createTodo(todo) {
  const res = await fetch(`${API_BASE}/todo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return await res.json();
}

export async function updateTodo(id, todo) {
  const res = await fetch(`${API_BASE}/todo/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!res.ok) throw new Error("Failed to update todo");
  return await res.json();
}

export async function deleteTodo(id) {
  const res = await fetch(`${API_BASE}/todo/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete todo");
  return await res.json();
}
