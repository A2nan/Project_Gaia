<script setup lang="ts">
import { ref } from 'vue'
import FullScreenWrapper from '@/components/FullScreenWrapper.vue'
import backgroundImage from '@/components/images/Background1.jpg'

// Liste d'énigmes temporelles (niveau facile)
const enigmes = [
  "L’homme qui peignit Vénus avant que Léonard ne songe à Mona Lisa vit la Renaissance naissante.",
  "Celui qui sculpta David est né après celui qui peignit La Naissance de Vénus.",
  "Celui qui éclaira Rome de son clair-obscur vint bien après la mort de Raphaël.",
  "Avant que la lumière ne s’assombrisse, les anges de Giotto chantaient déjà.",
  "Entre la grâce de Botticelli et la fureur du Caravage, le monde eut Léonard."
]

const current = ref(enigmes[0])

let currentIndex = 0

function newEnigme() {
  currentIndex = (currentIndex + 1) % enigmes.length
  current.value = enigmes[currentIndex]
}

</script>

<template>
  <FullScreenWrapper :background="backgroundImage">
    <header class="game-header">
      <h1>🦊 Il Volpe</h1>
      <h2>Machiavel.exe — Le Verrou de Florence</h2>
    </header>

    <main class="board">
      <section class="enigme-card">
        <p class="enigme-text">“{{ current }}”</p>
      </section>

      <div class="button-zone">
        <button class="new-btn" @click="newEnigme">Nouvelle énigme</button>
        <p class="tip">Transmets cet indice au Prince pour guider la frise.</p>
      </div>
    </main>
  </FullScreenWrapper>
</template>

<style scoped>
/* HEADER */
.game-header {
  text-align: center;
  margin-top: 0.5rem;
}
.game-header h1 {
  font-size: 3.2rem;
  color: #ffd700;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6);
  margin: 0;
  font-family: "Poppins", sans-serif;
}
.game-header h2 {
  font-family: "Cascadia Code", monospace;
  font-size: 1.4rem;
  color: #c94e2e;
  margin: 0.3rem 0 1rem;
}

/* STRUCTURE */
.board {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  gap: 2rem;
}

/* CADRE DE L'ÉNIGME */
.enigme-card {
  background: rgba(0, 0, 0, 0.55);
  border: 2px solid #ffd700;
  border-radius: 14px;
  padding: 2rem;
  max-width: 800px;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.3);
  text-align: center;
  transition: all 0.3s ease;
}
.enigme-card:hover {
  box-shadow: 0 0 25px rgba(255, 215, 0, 0.6);
}
.enigme-text {
  font-size: 1.5rem;
  font-style: italic;
  color: #fff;
  line-height: 1.5;
  font-family: "Cascadia Code", monospace;
}

/* BOUTON */
.button-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.new-btn {
  background: #ffd700;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 2rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: "Cascadia Code", monospace;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
.new-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.7);
}
.tip {
  color: #ddd;
  font-size: 0.9rem;
  margin-top: 0.8rem;
  font-style: italic;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
}

/* RESPONSIVE */
@media (max-width: 1280px) {
  .enigme-card {
    padding: 1.4rem;
  }
  .enigme-text {
    font-size: 1.1rem;
  }
}
</style>
