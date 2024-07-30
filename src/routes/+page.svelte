<script lang="ts">
  import { onMount } from 'svelte';
  import api from '$lib/api';

  let articles: any[] = [];
  let error = '';
  let loading = true;

  function fixImageUrl(url: string): string {
    if (!url) return '';
    if (url.startsWith('http://127.0.0.1:8000')) {
      return url.replace('http://127.0.0.1:8000', 'https://cloud.4devs.ovh');
    }
    return url;
  }

  onMount(async () => {
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
</script>

<div class="container mx-auto px-4">
  <h1 class="text-5xl font-bold text-center my-10">Bienvenue sur le site de démo de vico :D</h1>

  {#if error}
    <div class="alert alert-error shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{error}</span>
      </div>
    </div>
  {:else if loading}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each Array(6) as _, i}
        <div class="card bg-base-100 shadow-xl">
          <div class="skeleton h-48 w-full"></div>
          <div class="card-body">
            <h2 class="skeleton h-8 w-3/4 mb-4"></h2>
            <p class="skeleton h-4 w-full"></p>
            <p class="skeleton h-4 w-5/6"></p>
            <p class="skeleton h-4 w-4/6"></p>
            <div class="skeleton h-4 w-28 mt-2"></div>
            <div class="card-actions justify-end mt-4">
              <div class="skeleton h-10 w-28"></div>
            </div>
          </div>
        </div>
      {/each}
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
            <p class="line-clamp-3">{@html truncateHTML(article.contenu, 150)}</p>
            <div class="flex justify-between items-center mt-4 text-sm text-gray-500">
              <span>Par {article.auteur?.username || 'Anonyme'}</span>
              <span>{formatDate(article.date_creation)}</span>
            </div>
            <div class="card-actions justify-end mt-4">
              <a href={`/articles/${article.id}`} class="btn btn-primary btn-outline">Lire plus</a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="alert alert-info shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Aucun article n'a été publié pour le moment.</span>
      </div>
    </div>
  {/if}
</div>