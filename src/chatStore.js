import { writable } from 'svelte/store';

// Criamos uma store gravável com o histórico inicial
export const messagesStore = writable([
  { id: 1, text: "E aí! Já viu como o Svelte é rápido?", sender: "bot", time: "10:00" },
  { id: 2, text: "Tô testando as animações agora. Olha isso!", sender: "me", time: "10:01" }
]);

// Função para encapsular a lógica de adicionar mensagens (Regra de Negócio)
export function addMessage(text, sender = "me") {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  messagesStore.update(currentMessages => [
    ...currentMessages,
    { id: Date.now(), text, sender, time }
  ]);
}