import React from "react";
import styles from "../styles/dashboard.module.css";

const TodoList = ({ todos, onUpdateStatus, onDelete }) => {
  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center bg-gray-50 p-4 rounded-md border border-gray-200 hover:shadow-md transition duration-200"
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => onUpdateStatus(todo.id, e.target.checked)}
            className="mr-4"
          />
          <span
            className={`flex-1 text-gray-800 ${todo.completed ? "line-through opacity-50" : ""}`}
          >
            {todo.title}
          </span>
          <button
            onClick={() => onDelete(todo.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition duration-200"
          >
            Excluir
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
