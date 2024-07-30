<script lang="ts">
    import { page } from '$app/stores';
    import { user, logout } from '$lib/stores/user';
    import { goto } from '$app/navigation';
  
    function handleLogout() {
      logout();
      goto('/');
    }
  </script>
  
  <nav class="navbar bg-base-100">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost normal-case text-xl">Vico4Dev</a>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <li><a href="/" class:active={$page.url.pathname === '/'}>Accueil</a></li>
        {#if $user}
          <li><a href="/dashboard" class:active={$page.url.pathname === '/dashboard'}>Tableau de bord</a></li>
          <li><button on:click={handleLogout}>Déconnexion</button></li>
        {:else}
          <li><a href="/login" class:active={$page.url.pathname === '/login'}>Connexion</a></li>
        {/if}
      </ul>
    </div>
  </nav>