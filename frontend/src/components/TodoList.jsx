import { For } from "solid-js";

export default function TodoList(props) {
  return (
    <ul>
      <For each={props.todos}>
        {(todo) => (
          <li
            class="flex justify-between items-center border-b py-2"
            key={todo.id}
          >
            <span
              class={todo.completed ? "line-through text-gray-500" : ""}
              onClick={() =>
                props.onToggleComplete(todo)
              }
              style={{ cursor: "pointer" }}
            >
              {todo.task}
            </span>
            <div class="space-x-2">
              <button
                class="text-green-600 hover:underline"
                onClick={() => props.onEdit(todo)}
              >
                Edit
              </button>
              <button
                class="text-red-600 hover:underline"
                onClick={() => props.onDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        )}
      </For>
    </ul>
  );
}
