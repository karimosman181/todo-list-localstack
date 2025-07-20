import { createSignal, onMount } from "solid-js";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api/api";

export default function App() {
  const [todos, setTodos] = createSignal([]);
  const [editing, setEditing] = createSignal(null);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal(null);

  async function fetchTodos() {
    setLoading(true);
    setError(null);
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  onMount(fetchTodos);

  async function handleSave(todo) {
    setLoading(true);
    setError(null);
    try {
      if (todo.id) {
        // Update
        await updateTodo(todo.id, todo);
      } else {
        // Create
        await createTodo(todo);
      }
      setEditing(null);
      await fetchTodos();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setLoading(true);
    setError(null);
    try {
      await deleteTodo(id);
      await fetchTodos();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleComplete(todo) {
    await handleSave({ ...todo, completed: !todo.completed });
  }

  return (
    <div class="max-w-md mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">SolidJS To-Do App</h1>
      {error() && (
        <div class="bg-red-100 text-red-700 p-2 mb-4 rounded">{error()}</div>
      )}
      {loading() && <div>Loading...</div>}
      <TodoForm
        todo={editing()}
        onSave={handleSave}
        onCancel={() => setEditing(null)}
      />
      <TodoList
        todos={todos()}
        onEdit={setEditing}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}
