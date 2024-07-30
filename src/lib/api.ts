import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cloud.4devs.ovh/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  // N'inclure le token que pour les requêtes non-GET
  if (token && config.method !== 'get') {
    config.headers['Authorization'] = `Bearer ${token}`;
    console.log('Token envoyé:', token);
  } else {
    console.log('Requête sans token');
  }
  return config;
});

export default api;