import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";

const addTodo = async (userId, title) => {
  const todosRef = collection(db, "users", userId, "todos");
  const docRef = await addDoc(todosRef, {
    title,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

const getTodos = async (userId) => {
  const todosRef = collection(db, "users", userId, "todos");
  const q = query(todosRef, orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const updateTodoStatus = async (userId, todoId, completed) => {
  const todoRef = doc(db, "users", userId, "todos", todoId);
  await updateDoc(todoRef, {
    completed,
    updatedAt: new Date(),
  });
};

const updateTodoTitle = async (userId, todoId, title) => {
  const todoRef = doc(db, "users", userId, "todos", todoId);
  await updateDoc(todoRef, {
    title,
    updatedAt: new Date(),
  });
};

const deleteTodo = async (userId, todoId) => {
  const todoRef = doc(db, "users", userId, "todos", todoId);
  await deleteDoc(todoRef);
};

export { addTodo, getTodos, updateTodoStatus, updateTodoTitle, deleteTodo };
