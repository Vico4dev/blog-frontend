<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import api from '$lib/api';

  let article: any = null;
  let error = '';
  let loading = true;

  function formatDate(dateString: string) {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }

  function getInitial(name: string | undefined | null): string {
    return name && name.length > 0 ? name[0].toUpperCase() : 'A';
  }

  function fixImageUrl(url: string): string {
    if (!url) return '';
    if (url.startsWith('http://127.0.0.1:8000')) {
      return url.replace('http://127.0.0.1:8000', 'https://cloud.4devs.ovh');
    }
    return url;
  }

  onMount(async () => {
    try {
      const response = await api.get(`articles/${$page.params.id}/`);
      article = response.data;
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'article:', err);
      error = 'Impossible de charger l\'article. Veuillez réessayer plus tard.';
    } finally {
      loading = false;
    }
  });
</script>

<div class="container mx-auto px-4 py-8">
  {#if error}
    <div class="alert alert-error shadow-lg mb-6">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{error}</span>
      </div>
    </div>
  {:else if loading}
    <div class="flex justify-center items-center h-64">
      <span class="loading loading-spinner loading-lg"></span>
    </div>
  {:else if article}
    <article class="card bg-base-100 shadow-xl">
      {#if article.image}
        <figure>
          <img src={fixImageUrl(article.image)} alt={article.titre} class="w-full h-64 object-cover" />
        </figure>
      {/if}
      <div class="card-body">
        <h1 class="card-title text-4xl mb-4">{article.titre}</h1>
        <div class="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <div class="avatar placeholder">
            <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
              <span>{getInitial(article.auteur?.username)}</span>
            </div>
          </div>
          <span>Par {article.auteur?.username || 'Anonyme'}</span>
          <span>•</span>
          <span>{formatDate(article.date_creation)}</span>
        </div>
        <div class="prose max-w-none">
          {@html article.contenu}
        </div>
        {#if article.video_url}
          <div class="aspect-w-16 aspect-h-9 mt-6">
            <iframe src={article.video_url.replace('watch?v=', 'embed/')} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen class="w-full h-full"></iframe>
          </div>
        {/if}
      </div>
    </article>
  {:else}
    <div class="alert alert-info shadow-lg">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Aucun article trouvé.</span>
      </div>
    </div>
  {/if}
</div>