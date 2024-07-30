<script lang="ts">
    import { goto } from '$app/navigation';
    import { login } from '$lib/stores/user';
    import api from '$lib/api';
  
    let username = '';
    let password = '';
    let error = '';
  
    async function handleSubmit() {
      try {
        const response = await api.post('token/', { username, password });
        const { access, refresh } = response.data;
  
        console.log('Token reçu:', access);
        console.log('Contenu du token:', JSON.parse(atob(access.split('.')[1])));
  
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
  
        login({ username, token: access });
  
        goto('/dashboard');
      } catch (err) {
        console.error('Erreur de connexion:', err);
        error = 'Échec de la connexion. Vérifiez vos identifiants.';
      }
    }
  </script>
  
  <h1 class="text-3xl font-bold mb-4">Connexion</h1>
  
  {#if error}
    <p class="text-red-500 mb-4">{error}</p>
  {/if}
  
  <form on:submit|preventDefault={handleSubmit} class="space-y-4">
    <div>
      <label for="username" class="block mb-2">Nom d'utilisateur</label>
      <input 
        id="username" 
        bind:value={username} 
        required 
        class="input input-bordered w-full" 
        autocomplete="username"
      />
    </div>
  
    <div>
      <label for="password" class="block mb-2">Mot de passe</label>
      <input 
        id="password" 
        type="password" 
        bind:value={password} 
        required 
        class="input input-bordered w-full" 
        autocomplete="current-password"
      />
    </div>
  
    <button type="submit" class="btn btn-primary">Se connecter</button>
  </form>