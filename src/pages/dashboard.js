import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';
import { addTodo, getTodos, updateTodoStatus, deleteTodo } from '../services/todoService';
import styles from '../styles/dashboard.module.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    if (!user) return;
    try {
      const todosData = await getTodos(user.uid);
      setTodos(todosData);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user, fetchTodos]);

  const handleAddTodo = async (title) => {
    try {
      await addTodo(user.uid, title);
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleUpdateStatus = async (todoId, completed) => {
    try {
      await updateTodoStatus(user.uid, todoId, completed);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await deleteTodo(user.uid, todoId);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <h1>Todo List</h1>
      <button onClick={logout}>Logout</button>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;