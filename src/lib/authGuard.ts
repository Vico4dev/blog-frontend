import { goto } from '$app/navigation';
import { get } from 'svelte/store';
import { user } from './stores/user';

export function authGuard(url: string) {
  const currentUser = get(user);
  if (!currentUser) {
    goto('/login');
    return false;
  }
  return true;
}