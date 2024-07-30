<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import api from '$lib/api';
    import Quill from 'quill';
  
    let article: any = null;
    let titre = '';
    let contenu = '';
    let image: File | null = null;
    let videoUrl = '';
    let error = '';
    let success = '';
    let quillInstance: Quill | null = null;
    let loading = true;
    let editorElement: HTMLElement;
  
    $: if (editorElement && !quillInstance) {
      quillInstance = new Quill(editorElement, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }
      });
      if (contenu) {
        quillInstance.root.innerHTML = contenu;
      }
    }
  
    onMount(async () => {
      try {
        const response = await api.get(`articles/${$page.params.id}/`);
        article = response.data;
        titre = article.titre;
        contenu = article.contenu;
        videoUrl = article.video_url || '';
  
        // Set Quill content after it's initialized and article data is loaded
        if (quillInstance) {
          quillInstance.root.innerHTML = contenu;
        }
      } catch (err) {
        console.error('Erreur lors de la récupération de l\'article:', err);
        error = 'Impossible de charger l\'article. Veuillez réessayer plus tard.';
      } finally {
        loading = false;
      }
    });
  
    async function handleSubmit() {
      try {
        const formData = new FormData();
        formData.append('titre', titre);
        formData.append('contenu', quillInstance ? quillInstance.root.innerHTML : '');
        if (image) {
          formData.append('image', image);
        }
        formData.append('video_url', videoUrl);
  
        await api.put(`articles/${$page.params.id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        success = 'Article modifié avec succès !';
        setTimeout(() => goto(`/articles/${$page.params.id}`), 2000);
      } catch (err) {
        console.error('Erreur lors de la modification de l\'article:', err);
        error = 'Impossible de modifier l\'article. Veuillez réessayer.';
      }
    }
  </script>
  
  <svelte:head>
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
  </svelte:head>
  
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8 text-center">Modifier l'article</h1>
  
    {#if error}
      <div class="alert alert-error shadow-lg mb-6">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{error}</span>
        </div>
      </div>
    {/if}
  
    {#if success}
      <div class="alert alert-success shadow-lg mb-6">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{success}</span>
        </div>
      </div>
    {/if}
  
    {#if loading}
      <div class="flex justify-center items-center h-64">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
    {:else if article}
      <form on:submit|preventDefault={handleSubmit} class="space-y-6 bg-base-200 p-6 rounded-lg shadow-lg">
        <div>
          <label for="titre" class="label">
            <span class="label-text">Titre de l'article</span>
          </label>
          <input id="titre" bind:value={titre} required class="input input-bordered w-full" />
        </div>
  
        <div>
          <label for="editor" class="label">
            <span class="label-text">Contenu de l'article</span>
          </label>
          <div bind:this={editorElement} class="bg-white" style="height: 300px;"></div>
        </div>
  
        <div>
          <label for="image" class="label">
            <span class="label-text">Image de couverture</span>
          </label>
          <input id="image" type="file" accept="image/*" on:change={(e) => image = e.target.files[0]} class="file-input file-input-bordered w-full" />
        </div>
  
        <div>
          <label for="videoUrl" class="label">
            <span class="label-text">URL de la vidéo YouTube</span>
          </label>
          <input id="videoUrl" bind:value={videoUrl} class="input input-bordered w-full" />
        </div>
  
        <div class="text-center">
          <button type="submit" class="btn btn-primary btn-wide">Modifier l'article</button>
        </div>
      </form>
    {:else}
      <div class="alert alert-info shadow-lg">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current flex-shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Impossible de trouver l'article.</span>
        </div>
      </div>
    {/if}
  </div>