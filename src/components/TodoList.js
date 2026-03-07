import React from 'react';
import styles from '../styles/dashboard.module.css';

const TodoList = ({ todos, onUpdateStatus, onDelete }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map(todo => (
        <li key={todo.id} className={styles.todoItem}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => onUpdateStatus(todo.id, e.target.checked)}
          />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;