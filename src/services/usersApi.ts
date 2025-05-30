import axios from 'axios';

const API_URL = 'http://localhost:3001';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  profilePicture?: string | null;
}

export interface EditUserArgs {
  name: string;
  email: string;
  role: string;
  profilePicture?: string | null;
}

export const usersApi = {
  getAll: async (): Promise<User[]> => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  },

  getById: async (id: number): Promise<User> => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  },

  create: async (user: EditUserArgs): Promise<User> => {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  },

  update: async (id: number, user: EditUserArgs): Promise<User> => {
    const response = await axios.put(`${API_URL}/users/${id}`, user);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/users/${id}`);
  },
};
