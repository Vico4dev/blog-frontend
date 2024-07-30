<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { user } from '$lib/stores/user';
  import api from '$lib/api';

  let articles = [];
  let error = '';
  let loading = true;

  function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }

  function truncateHTML(html: string, maxLength: number) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  function fixImageUrl(url: string): string {
    if (!url) return '';
    if (url.startsWith('http://127.0.0.1:8000')) {
      return url.replace('http://127.0.0.1:8000', 'https://cloud.4devs.ovh');
    }
    return url;
  }

  onMount(async () => {
    if (!$user) {
      goto('/login');
      return;
    }

    try {
      const response = await api.get('articles/');
      articles = response.data;
    } catch (err) {
      console.error('Erreur lors de la récupération des articles:', err);
      error = 'Impossible de charger les articles. Veuillez réessayer plus tard.';
    } finally {
      loading = false;
    }
  });

  async function deleteArticle(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      try {
        await api.delete(`articles/${id}/`);
        articles = articles.filter(article => article.id !== id);
      } catch (err) {
        console.error('Erreur lors de la suppression de l\'article:', err);
        error = 'Impossible de supprimer l\'article. Veuillez réessayer plus tard.';
      }
    }
  }
</script>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold mb-8 text-center">Tableau de bord</h1>

  {#if error}
    <div class="alert alert-error shadow-lg mb-6">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{error}</span>
      </div>
    </div>
  {/if}

  <div class="text-center mb-8">
    <a href="/articles/new" class="btn btn-primary">Créer un nouvel article</a>
  </div>

  {#if loading}
    <div class="flex justify-center items-center h-64">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  {:else if articles.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each articles as article}
        <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
          {#if article.image}
            <figure>
              <img src={fixImageUrl(article.image)} alt={article.titre} class="w-full h-48 object-cover" />
            </figure>
          {:else}
            <div class="bg-gray-200 h-48 w-full flex items-center justify-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          {/if}
          <div class="card-body">
            <h2 class="card-title">{article.titre}</h2>
            <p class="line-clamp-3">{@html truncateHTML(article.contenu, 100)}</p>
            <p class="text-sm text-gray-500 mt-2">Publié le {formatDate(article.date_creation)}</p>
            <div class="card-actions justify-end mt-4">
              <a href={`/articles/${article.id}/edit`} class="btn btn-info btn-sm">Modifier</a>
              <button on:click={() => deleteArticle(article.id)} class="btn btn-error btn-sm">Supprimer</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="alert alert-info shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Vous n'avez pas encore publié d'articles. Commencez par en créer un !</span>
      </div>
    </div>
  {/if}
</div>