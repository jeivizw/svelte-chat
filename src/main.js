import { mount } from 'svelte';
import './app.css'; // Mantenha se você tiver um arquivo css global, ou apague se não tiver
import App from './App.svelte';

const targetElement = document.getElementById('app');

// 🪄 A mágica: Limpa a tela de loading antes de renderizar o chat
targetElement.innerHTML = ''; 

const app = mount(App, {
  target: targetElement,
});

export default app;