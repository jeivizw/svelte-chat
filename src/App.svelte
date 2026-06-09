<script>
  import { flip } from 'svelte/animate';
  import { messagesStore, addMessage } from './chatStore.js';
  import MessageBubble from './MessageBubble.svelte';

  let newMessage = $state("");
  let chatContainer = $state();

  const botReplies = [
    "Sistema operando da melhor forma .",
    "Bifurcação de dados concluída. Renderização cirúrgica.",
    "Esse chat demorou um tempo pra ser feito.",
    "O Svelte é curiosamente muito bom, mas tem q saber pensar um pouco pra fazer rodar."
    "Queria deixar claro que este trabalho vai pro meu linkedin."
  ];

  function scrollToBottom() {
    if (chatContainer) {
      setTimeout(() => chatContainer.scrollTop = chatContainer.scrollHeight, 30);
    }
  }

  function handleSend(event) {
    event.preventDefault(); 
    if (!newMessage.trim()) return;
    
    addMessage(newMessage, "me");
    newMessage = "";

    setTimeout(() => {
      const randomText = botReplies[Math.floor(Math.random() * botReplies.length)];
      addMessage(randomText, "bot");
    }, 600);
  }

  $effect(() => {
    $messagesStore; 
    scrollToBottom();
  });
</script>

<main class="minimal-app">
  <aside class="sidebar">
    <div class="brand">
      <span class="brand-dot"></span>
      <h2>SVELTE // CORE</h2>
    </div>
    
    <nav class="menu">
      <div class="menu-item active">
        <span class="indicator">[x]</span> console_geral
      </div>
      <div class="menu-item">
        <span class="indicator">[ ]</span> dev_logs
      </div>
    </nav>

    <div class="status-footer">
      STATUS: <span class="online-txt">ONLINE</span>
    </div>
  </aside>

  <section class="chat-area">
    <header class="chat-header">
      <div class="title-group">
        <h1>// CONSOLE_GERAL</h1>
        <span class="counter">{ $messagesStore.length } MSG(s)</span>
      </div>
    </header>

    <div class="messages-flow" bind:this={chatContainer}>
      {#each $messagesStore as msg (msg.id)}
        <div animate:flip={{ duration: 150 }}>
          <MessageBubble {msg} />
        </div>
      {/each}
    </div>

    <form onsubmit={handleSend} class="bottom-form">
      <div class="input-container">
        <input 
          type="text" 
          bind:value={newMessage} 
          placeholder="Digitar comando ou mensagem..." 
        />
        <button type="submit" disabled={!newMessage.trim()}>
          ENVIAR
        </button>
      </div>
    </form>
  </section>
</main>

<style>
  /* Configuração Global Brutalista/Minimalista */
  :global(body) {
    margin: 0;
    font-family: monospace; /* Fonte mono para reforçar o visual técnico/clean */
    background-color: #000000;
    color: #FFFFFF;
  }

  .minimal-app {
    display: flex;
    height: 100vh;
    width: 100vw;
    background-color: #000000;
  }

  /* Barra Lateral */
  .sidebar {
    width: 240px;
    border-right: 1px solid #222222;
    display: flex;
    flex-direction: column;
    padding: 24px;
    box-sizing: border-box;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 40px;
  }

  .brand-dot {
    width: 8px;
    height: 8px;
    background-color: #FF3B30; /* Ponto de atenção vermelho */
  }

  .brand h2 {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin: 0;
  }

  .menu { display: flex; flex-direction: column; gap: 8px; flex: 1; }
  
  .menu-item {
    font-size: 0.8rem;
    color: #555555;
    cursor: pointer;
    padding: 4px 0;
    transition: color 0.2s;
  }

  .menu-item:hover, .menu-item.active { color: #FFFFFF; }
  .menu-item.active .indicator { color: #007AFF; } /* Detalhe em azul */

  .status-footer { font-size: 0.7rem; color: #555555; letter-spacing: 0.05em; }
  .online-txt { color: #007AFF; font-weight: 700; }

  /* Janela do Chat */
  .chat-area {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .chat-header {
    padding: 24px;
    border-bottom: 1px solid #222222;
  }

  .title-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .chat-header h1 { font-size: 0.9rem; font-weight: 700; margin: 0; letter-spacing: 0.05em; }
  .counter { font-size: 0.75rem; color: #555555; }

  .messages-flow {
    flex: 1;
    padding: 24px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  /* Form e Input de Alta Precisão */
  .bottom-form {
    padding: 24px;
    border-top: 1px solid #222222;
  }

  .input-container {
    display: flex;
    border: 1px solid #222222;
    background: #000000;
    transition: border-color 0.2s;
  }

  .input-container:focus-within {
    border-color: #007AFF; /* Foco muda para azul */
  }

  .input-container input {
    flex: 1;
    background: none;
    border: none;
    color: #FFFFFF;
    font-family: monospace;
    font-size: 0.85rem;
    padding: 14px;
    outline: none;
  }

  .input-container button {
    background: #FFFFFF;
    border: none;
    color: #000000;
    font-family: monospace;
    font-weight: 700;
    font-size: 0.75rem;
    padding: 0 24px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .input-container button:hover:not(:disabled) {
    background: #007AFF;
    color: #FFFFFF;
  }

  .input-container button:disabled {
    background: #111111;
    color: #444444;
    cursor: not-allowed;
  }
</style>
