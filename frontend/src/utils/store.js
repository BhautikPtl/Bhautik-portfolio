import { create } from 'zustand';

const useStore = create((set) => ({
  theme: localStorage.getItem('theme') || 'dark',
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    return { theme: newTheme };
  }),
  
  isLoggedIn: !!localStorage.getItem('token'),
  token: localStorage.getItem('token'),
  setLogin: (token) => {
    localStorage.setItem('token', token);
    set({ isLoggedIn: true, token });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ isLoggedIn: false, token: null });
  }
}));

export default useStore;
