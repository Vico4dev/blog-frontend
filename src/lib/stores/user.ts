import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';

export const user = writable(null);

export function login(userData) {
  user.set(userData);
  if (isBrowser) {
    localStorage.setItem('user', JSON.stringify(userData));
  }
}

export function logout() {
  user.set(null);
  if (isBrowser) {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

// Initialiser l'état de l'utilisateur à partir du localStorage
if (isBrowser) {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.set(JSON.parse(storedUser));
  }
}