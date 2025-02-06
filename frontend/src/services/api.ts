import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = (email: string, password: string) => {
  return api.post("/auth/login", { email, password });
};

export const fetchUsers = () => {
  return api.get("/users");
};

export const createUser = (userData: any) => {
  return api.post("/users", userData);
};

export const updateUser = (id: number, userData: any) => {
  return api.put(`/users/${id}`, userData);
};

export const deleteUser = (id: number) => {
  return api.delete(`/users/${id}`);
};

export default api;
