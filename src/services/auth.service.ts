import apiClient from "../api/apiClient";

interface LoginPayload {
  username: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role: "USER";
}

export const loginUser = async (payload: LoginPayload) => {
  const response = await apiClient.post("/users/login", payload);
  return response.data;
};


export const registerUser = async (payload: RegisterPayload) => {
  const response = await apiClient.post("/users/register", payload);
  return response.data;
};


export const getCurrentUser = async () => {
  const response = await apiClient.get("/users/current-user");
  return response.data;
};