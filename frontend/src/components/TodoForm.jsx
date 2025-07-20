import { createSignal, createEffect } from "solid-js";

export default function TodoForm(props) {
  const [task, setTask] = createSignal(props.todo?.task || "");

  createEffect(() => {
    if (props.todo) setTask(props.todo.task);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task().trim()) return;
    props.onSave({ ...props.todo, task: task().trim() });
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} class="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Enter task"
        value={task()}
        onInput={(e) => setTask(e.target.value)}
        class="border rounded px-2 py-1 flex-grow"
      />
      <button
        type="submit"
        class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
      >
        {props.todo ? "Update" : "Add"}
      </button>
      {props.todo && (
        <button
          type="button"
          class="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
          onClick={() => props.onCancel()}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
