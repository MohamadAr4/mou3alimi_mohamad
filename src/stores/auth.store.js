import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  isAuthenticated: true,
  user: null,
  login: (userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));