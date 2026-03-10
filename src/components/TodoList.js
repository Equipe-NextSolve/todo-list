import React from "react";
import styles from "../styles/dashboard.module.css";

const TodoList = ({ todos, onUpdateStatus, onEdit, onDelete }) => {
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
            className="mr-4 w-4 h-4 transition-all duration-300 ease-in-out transform hover:scale-110"
          />
          <span
            className={`flex-1 text-gray-800 transition-all duration-300 ease-in-out ${
              todo.completed ? "line-through opacity-50" : ""
            }`}
          >
            {todo.title}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(todo.id, todo.title)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-sm transition duration-200 transform hover:scale-105"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-sm transition duration-200 transform hover:scale-105"
            >
              Excluir
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
