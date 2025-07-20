// authStore.js
import axios from "axios";
import { create } from "zustand";
import { BASE_URL } from "./contants";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
  isLoading: false,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, credentials);
      set({
        isAuthenticated: true,
        user: response.data.data.user,
        token: response.data.token,
        isLoading: false,
      });
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try{
      const response = await axios.post(`${BASE_URL}auth/logout` , {} ,{
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('logout response : ' , response);
      set({ isAuthenticated: false, user: null, token: null });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }catch(e){
      console.log("Error when the logout", e );
    }
  },
}));
