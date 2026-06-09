<script>
  import { fade } from 'svelte/transition';
  
  // Svelte 5 Props
  let { msg } = $props();
</script>

<div 
  in:fade={{ duration: 150 }} 
  out:fade={{ duration: 100 }}
  class="msg-row {msg.sender}"
>
  <div class="msg-block">
    <div class="msg-header">
      <span class="user-label">{msg.sender === 'me' ? 'USER' : 'BOT'}</span>
      <span class="msg-time">// {msg.time}</span>
    </div>
    <div class="msg-body">
      <p>{msg.text}</p>
    </div>
  </div>
</div>

<style>
  .msg-row {
    display: flex;
    width: 100%;
    margin-bottom: 4px;
  }

  /* Alinhamento minimalista: tudo à esquerda, o que muda é a borda colorida */
  .msg-block {
    max-width: 80%;
    padding: 12px 16px;
    background: #111111;
    border: 1px solid #222222;
    transition: border-color 0.2s ease;
  }

  /* O toque de cor cirúrgico (Azul para Você, Vermelho para o Bot) */
  .msg-row.me .msg-block {
    border-left: 3px solid #007AFF; 
  }

  .msg-row.bot .msg-block {
    border-left: 3px solid #FF3B30;
  }

  .msg-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }

  .user-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  .msg-row.me .user-label { color: #007AFF; }
  .msg-row.bot .user-label { color: #FF3B30; }

  .msg-time {
    font-size: 0.65rem;
    color: #555555;
    font-family: monospace;
  }

  .msg-body p {
    margin: 0;
    font-size: 0.9rem;
    color: #FFFFFF;
    line-height: 1.4;
  }
</style>