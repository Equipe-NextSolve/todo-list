import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import {
  addTodo,
  getTodos,
  updateTodoStatus,
  updateTodoTitle,
  deleteTodo,
} from "../services/todoService";
import styles from "../styles/dashboard.module.css";

const Dashboard = () => {
  const { user, logout, loading, renewSession } = useAuth();
  const router = useRouter();
  const [todos, setTodos] = useState([]);

  const fetchTodos = useCallback(async () => {
    if (!user) return;
    try {
      const todosData = await getTodos(user.uid);
      setTodos(todosData);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      renewSession(); // Renovar a sessão ao carregar a página
      fetchTodos();
    }
  }, [user, renewSession, fetchTodos]);

  const handleAddTodo = async (title) => {
    try {
      await addTodo(user.uid, title);
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleUpdateStatus = async (todoId, completed) => {
    // Otimizar: atualizar estado local primeiro
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed } : todo,
      ),
    );

    try {
      await updateTodoStatus(user.uid, todoId, completed);
      // Após sucesso, refetch para garantir consistência
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
      // Reverter em caso de erro
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !completed } : todo,
        ),
      );
    }
  };

  const handleEdit = async (todoId, currentTitle) => {
    const newTitle = window.prompt("Editar tarefa:", currentTitle);
    if (newTitle && newTitle.trim() !== currentTitle) {
      // Atualizar localmente primeiro
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, title: newTitle.trim() } : todo,
        ),
      );

      try {
        await updateTodoTitle(user.uid, todoId, newTitle.trim());
        fetchTodos();
      } catch (error) {
        console.error("Error updating todo title:", error);
        // Reverter
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === todoId ? { ...todo, title: currentTitle } : todo,
          ),
        );
      }
    }
  };

  const handleDelete = async (todoId) => {
    try {
      await deleteTodo(user.uid, todoId);
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">To-Do List</h1>
          <button
            onClick={logout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md transition duration-200"
          >
            Logout
          </button>
        </div>
        <TodoForm onAddTodo={handleAddTodo} />
        <TodoList
          todos={todos}
          onUpdateStatus={handleUpdateStatus}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
