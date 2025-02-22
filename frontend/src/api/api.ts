import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const register = (data: { username: string; password: string }) => API.post("/auth/register", data);
export const login = (data: { username: string; password: string }) => API.post("/auth/login", data);

export const fetchTasks = () => API.get("/tasks");
export const fetchTask = (taskId: number) => API.get(`/tasks/${taskId}`);
export const createTask = (data: { title: string; description?: string }) => API.post("/tasks", data);
export const updateTask = (taskId: number, data: { title?: string; description?: string; is_complete?: boolean }) =>
  API.put(`/tasks/${taskId}`, data);
export const deleteTask = (taskId: number) => API.delete(`/tasks/${taskId}`);
