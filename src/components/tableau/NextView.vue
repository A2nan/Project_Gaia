<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import FullScreenWrapper from '@/components/FullScreenWrapper.vue'
import backgroundImage from '@/components/images/Background3.jpg'

const router = useRouter()

type Artwork = {
  id: string
  img: string
  accepted: string[]
  answer: string
  input: string
}

const artworks = ref<Artwork[]>([
  {
    id: 'fra-angelico',
    // L’Annonciation (Fra Angelico, Prado) – lien fiable
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/La%20Anunciaci%C3%B3n%2C%20by%20Fra%20Angelico%2C%20from%20Prado%20in%20Google%20EarthFXD.jpg',
    accepted: [
      "l'annonciation", 'annonciation', 'annonce a marie', 'annonce à marie',
      'annunciation', 'the annunciation'
    ],
    answer: 'L’Annonciation (Fra Angelico, Prado)',
    input: ''
  },
  {
    id: 'giorgione-tempest',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Giorgione_019.jpg',
    accepted: ['la tempete','la tempête','tempete','tempête','the tempest','tempest'],
    answer: 'La Tempête (Giorgione)',
    input: ''
  },
  {
    id: 'botticelli-primavera',
    img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sandro%20Botticelli%20-%20La%20Primavera%20-%20Google%20Art%20Project.jpg',
    accepted: [
      'la primavera','primavera','le printemps','printemps',
      'allegorie du printemps','allégorie du printemps','allegory of spring'
    ],
    answer: 'La Primavera (Botticelli)',
    input: ''
  }
])

const success = ref(false)
const message = ref('')
const secretCode = ref('VIRTUS')

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim()
}
function isCorrect(userInput: string, accepted: string[]): boolean {
  const u = normalize(userInput)
  return accepted.some(a => normalize(a) === u)
}
function validateAll() {
  const allGood = artworks.value.every(a => isCorrect(a.input, a.accepted))
  if (allGood) {
    success.value = true
    message.value = '🎉 Bravo ! Les 3 titres sont corrects.'
    setTimeout(() => router.push('/pagefin'), 5000)
  } else {
    success.value = false
    message.value = '❌ Il y a au moins une erreur. Réessaie !'
  }
}
function onEnterSubmit(idx: number) {
  if (idx === artworks.value.length - 1) validateAll()
}
const canValidate = computed(() => artworks.value.every(a => a.input.trim().length > 0))
</script>

<template>
  <FullScreenWrapper :background="backgroundImage">
    <div class="dark-frame">
      <div class="captain-view">
        <h1 class="room-title">🧭 Poste du Capitaine</h1>

        <p class="description">
          Objectif : identifie les <strong>3 tableaux</strong> ci-dessous et saisis leurs titres.
        </p>

        <!-- 👉 Code obtenu placé ici, entre l'objectif et les images -->
        <transition name="fade">
          <div v-if="success" class="code-banner">
            🔓 Code obtenu : <strong>{{ secretCode }}</strong>
          </div>
        </transition>

        <!-- Grille des 3 tableaux -->
        <div class="art-grid">
          <div v-for="(art, i) in artworks" :key="art.id" class="art-card">
            <div class="art-thumb">
              <img :src="art.img" :alt="art.answer" />
            </div>
            <input
              class="art-input"
              type="text"
              v-model="art.input"
              :placeholder="`Titre du tableau #${i+1}`"
              @keyup.enter="onEnterSubmit(i)"
            />
          </div>
        </div>

        <div class="actions">
          <button class="validate-button" :disabled="!canValidate" @click="validateAll">
            Valider les 3 titres
          </button>
        </div>

        <transition name="fade">
          <div v-if="message" class="result-message" :class="{ success }">
            {{ message }}
          </div>
        </transition>
      </div>
    </div>
  </FullScreenWrapper>
</template>

<style scoped>
/* Cadre noir pour le contraste */
.dark-frame {
  background: rgba(0,0,0,.82);         /* fond noir autour */
  border: 1px solid rgba(255,215,0,.25);
  border-radius: 20px;
  padding: 18px 22px;
  max-width: 1040px;
  width: min(92vw, 1040px);
  margin: 24px auto;
  box-shadow:
    0 0 24px rgba(0,0,0,.6),
    0 0 28px rgba(255,215,0,.12) inset;
}

.captain-view {
  text-align: center;
  color: #fff;
  margin: 0 auto;
}

/* Titre */
.room-title {
  font-family: 'Brush Script MT', cursive;
  font-size: 2.6rem;
  color: #ffd700;
  margin-bottom: .6rem;
  text-shadow: 2px 2px 10px rgba(0,0,0,.7);
}

/* Intro */
.description {
  font-size: 1.1rem;
  margin-bottom: .8rem;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,215,0,.35);
  border-radius: 12px;
  padding: .7rem .9rem;
}

/* Bannière du code (entre objectif et images) */
.code-banner {
  margin: .6rem auto 1rem;
  width: fit-content;
  padding: .6rem 1rem;
  border-radius: 999px;
  background: rgba(20,20,20,.85);
  border: 1px solid rgba(255,215,0,.55);
  color: #ffd700;
  font-weight: 900;
  letter-spacing: .12rem;
  font-size: 1.2rem;
  box-shadow: 0 0 14px rgba(255,215,0,.25);
}

/* Grille 3 colonnes responsive */
.art-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  gap: 16px;
  margin: 0 auto 1rem;
}
@media (max-width: 920px) { .art-grid { grid-template-columns: repeat(2, minmax(220px, 1fr)); } }
@media (max-width: 600px) { .art-grid { grid-template-columns: 1fr; } }
/* --- Carte d’œuvre : réserve de la place pour l’input en bas --- */
.art-card {
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgba(0,0,0,.55);
  border: 1px solid rgba(255,215,0,.35);
  border-radius: 14px;
  padding: 10px 10px 64px;   /* ⬅️ padding bas = place pour l’input */
  box-shadow: 0 0 18px rgba(255,215,0,.18);
  overflow: hidden;          /* ⬅️ rien ne dépasse de la carte */
}

/* Vignette inchangée */
.art-thumb {
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 4/3;
  background: #111;
  box-shadow: 0 0 10px rgba(255,215,0,.15) inset;
}
.art-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* --- Input fixé à l’intérieur de la carte --- */
.art-input {
  position: absolute;        /* ⬅️ positionné dans .art-card */
  left: 10px;
  right: 10px;
  bottom: 10px;
  box-sizing: border-box;    /* largeur exacte */
  width: auto;               /* (left/right gèrent la largeur) */
  padding: .7rem .9rem;
  border-radius: 10px;
  border: none;
  text-align: center;
  font-size: 1.05rem;
  background: rgba(255,255,255,.12);
  color: #fff;
  outline: none;
  border-bottom: 2px solid #ffd700;
}

/* Optionnel : glow plus doux au focus */
.art-input:focus { box-shadow: 0 0 8px #ffd700; }


.actions { margin-top: .4rem; }

.validate-button {
  background: linear-gradient(135deg, #ff7043, #fdd835);
  border: none;
  border-radius: 12px;
  padding: 0.65rem 1.6rem;
  color: #222;
  font-size: 1.05rem;
  font-weight: bold;
  cursor: pointer;
  transition: .25s ease;
  box-shadow: 0 0 12px rgba(255,215,0,.3);
}
.validate-button:disabled { opacity: .55; cursor: default; }
.validate-button:hover:not(:disabled) {
  transform: scale(1.04);
  box-shadow: 0 0 18px rgba(255,215,0,.5);
}

/* Résultat */
.result-message {
  margin-top: .9rem;
  font-size: 1.15rem;
  font-weight: 700;
  padding: .7rem;
  border-radius: 12px;
  background: rgba(255,0,0,.18);
  color: #ff8a8a;
  box-shadow: 0 0 12px rgba(255,0,0,.25);
}
.result-message.success {
  background: rgba(0,255,0,.18);
  color: #8aff8a;
  box-shadow: 0 0 12px rgba(0,255,0,.35);
}

/* Fade */
.fade-enter-active, .fade-leave-active { transition: opacity .3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
