<script setup lang="ts">
import { ref } from 'vue'
import FullScreenWrapper from '@/components/FullScreenWrapper.vue'
import backgroundImage from '@/components/images/Background1.jpg'
import { useRouter } from 'vue-router'   // ⬅️ ajouté

interface Artist { name: string; image: string }

const router = useRouter()               // ⬅️ ajouté

const artists: Artist[] = [
  { name: 'Giotto di Bondone',     image: new URL('@/components/images/giotto.jpg',     import.meta.url).href },
  { name: 'Sandro Botticelli',      image: new URL('@/components/images/botticelli.jpg', import.meta.url).href },
  { name: 'Leonardo da Vinci',      image: new URL('@/components/images/leonard.jpg',    import.meta.url).href },
  { name: 'Michel-Ange Buonarroti', image: new URL('@/components/images/michelange.jpg', import.meta.url).href },
  { name: 'Raphaël Sanzio',         image: new URL('@/components/images/raphael.jpg',    import.meta.url).href },
  { name: 'Le Caravage',            image: new URL('@/components/images/caravage.jpg',   import.meta.url).href },
]

// Ordre correct gauche -> droite
const correctOrder = [
  'Giotto di Bondone',
  'Sandro Botticelli',
  'Leonardo da Vinci',
  'Michel-Ange Buonarroti',
  'Raphaël Sanzio',
  'Le Caravage',
]

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const tray = ref<Artist[]>(shuffle([...artists]))
const slots = ref<(Artist | null)[]>(Array(6).fill(null))
const message = ref('')
const dragging = ref<Artist | null>(null)

/* ===== AJOUT: état pour la bulle Machiavel ===== */
const showBubble = ref(false)
const bubbleText = ref('')

function onDragStart(a: Artist) { dragging.value = a }
function onDrop(index: number) {
  if (!dragging.value || slots.value[index]) return
  slots.value[index] = dragging.value
  tray.value = tray.value.filter(x => x.name !== dragging.value!.name)
  dragging.value = null
}
function removeFromSlot(index: number) {
  const art = slots.value[index]
  if (!art) return
  tray.value.push(art)
  slots.value[index] = null
}

/* ===== AJOUT: petite banque de punchlines ===== */
function getRandomMachiavelQuote() {
  const quotes = [
    "Voyons… tu as perdu la notion du temps, cher Prince.",
    "La chronologie n’est pas une opinion… réessaie.",
    "Même un sablier irait plus droit que votre frise.",
    "Entre Giotto et Caravage, vous vous êtes… égarés."
  ]
  return quotes[Math.floor(Math.random() * quotes.length)]
}

/* ===== MODIFIÉ: redirige vers /next au clic ===== */
function validate() {
  const placed = slots.value.map(s => s?.name)
  if (placed.includes(undefined)) {
    message.value = '⚠️ Placez les six artistes avant de valider.'
  } else {
    const ok = placed.every((n, i) => n === correctOrder[i])
    if (ok) {
      message.value = '✨ Bravo ! L’ordre est parfait. Mot secret : VIRTUS'
      setTimeout(() => router.push('/next'), 5000)
      showBubble.value = false
    } else {
      message.value = '❌ L’ordre n’est pas exact. Réessayez en vous coordonnant.'
      if (!showBubble.value) {
        bubbleText.value = getRandomMachiavelQuote()
        showBubble.value = true
        setTimeout(() => { showBubble.value = false }, 5000)
      }
    }
  }
}
</script>


<template>
  <FullScreenWrapper :background="backgroundImage">
    <header class="game-header">
      <h1>Machiavel.exe</h1>
      <h2>L’Arbre de la Renaissance</h2>
    </header>

    <main class="board">
      <!-- FRISE HORIZONTALE FINE ET ÉLÉGANTE -->
      <section class="timeline">
        <h3>Frise chronologique (← plus ancien | plus récent →)</h3>
        <div class="slots-row">
          <div
            v-for="(slot, index) in slots"
            :key="index"
            class="slot"
            @dragover.prevent
            @drop="onDrop(index)"
          >
            <template v-if="slot">
              <div class="slot-artist">
                <img :src="slot.image" :alt="slot.name" />
                <p>{{ slot.name }}</p>
                <button class="remove" @click="removeFromSlot(index)">×</button>
              </div>
            </template>
            <template v-else>
              <span class="slot-index">{{ index + 1 }}</span>
            </template>
          </div>
        </div>
      </section>

      <!-- PORTRAITS (CARTES PLUS PETITES) -->
      <section class="tray">
        <h3>Artistes</h3>
        <div class="tray-row">
          <div
            v-for="a in tray"
            :key="a.name"
            class="artist-card"
            draggable="true"
            @dragstart="onDragStart(a)"
          >
            <img :src="a.image" alt="" />
            <p>{{ a.name }}</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <!-- AJOUT: bulle Machiavel -->
      <transition name="fade">
        <div v-if="showBubble" class="machiavel-bubble">
          <p>{{ bubbleText }}</p>
        </div>
      </transition>

      <button class="validate-btn" @click="validate">Valider</button>

      <!-- AJOUT: applique la classe 'error' si message commence par ❌ -->
      <p class="msg" :class="{ error: message.startsWith('❌') }">{{ message }}</p>
    </footer>
  </FullScreenWrapper>
</template>

<style scoped>
/* --- Titres --- */
.game-header { text-align: center; margin-top: .5rem; }
.game-header h1 {
  font-size: 3rem; color: #8f2709; text-shadow: 2px 2px 10px rgba(0,0,0,.5);
  margin: 0; font-family: "Poppins", sans-serif;
}
.game-header h2 {
  font-family: "Cascadia Code", monospace; font-size: 1.4rem; color: #c94e2e;
  margin: .2rem 0 1rem;
}

/* --- Plateau global : frise (haut) + portraits (bas), pas de scroll --- */
.board {
  display: grid;
  grid-template-rows: 34vh 24vh; /* frise plus fine / portraits compacts */
  gap: 12px;
  padding: 0 1.5rem;
  height: 66vh; /* + header/footer = 100% sur 1080p */
}

/* --- Frise horizontale élégante --- */
.timeline {
  background: rgba(0,0,0,.52);
  border: 2px solid #ffd700;
  border-radius: 14px;
  padding: .6rem .8rem .8rem;
  text-align: center;
  box-shadow: 0 6px 22px rgba(0,0,0,.25);
}
.timeline h3 {
  color: #ffd700;
  margin: 0 0 .4rem;
  font-size: 1rem;
  letter-spacing: .2px;
}
.slots-row {
  height: calc(34vh - 2.8rem); /* garde une frise fine */
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
}
.slot {
  position: relative;
  border: 1.6px dashed #ffd700;
  background: linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.02));
  border-radius: 12px;
  overflow: hidden;
  display: flex; align-items: center; justify-content: center;
}
.slot-index {
  color: #ffd700; font-weight: 800; font-size: 1rem; opacity: .9;
}

/* contenu déposé (plus fin) */
.slot-artist {
  width: 100%; height: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: rgba(255,255,255,.9);
  color: #222; padding: 4px 6px; box-sizing: border-box;
  border-radius: 10px;
}
.slot-artist img {
  width: 70%;           /* plus compact */
  height: 110%;          /* plus compact */
  object-fit: cover;
  border-radius: 8px;
  display: block;
  box-shadow: 0 2px 6px rgba(0,0,0,.25);
}
.slot-artist p {
  margin: 6px 0 0;
  font-weight: 700;
  font-size: .78rem;    /* un peu plus fin */
  color: #222;
  background: rgba(255,255,255,.9);
  padding: 2px 6px;
  border-radius: 6px;
}
.remove {
  position: absolute; top: 6px; right: 6px;
  width: 18px; height: 18px; line-height: 18px;
  border: none; border-radius: 50%; background: #a92b2b; color: #fff; cursor: pointer;
}

/* --- Plateau portraits (plus petits) --- */
.tray {
  background: rgba(0,0,0,.52);
  border: 2px solid #ffd700;
  border-radius: 14px;
  padding: .6rem .8rem .8rem;
  box-shadow: 0 6px 22px rgba(0,0,0,.25);
}
.tray h3 { color: #ffd700; text-align: center; margin: 0 0 .4rem; }
.tray-row {
  height: calc(24vh - 2.6rem);
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
}
.artist-card {
  background: rgba(255,255,255,.92);
  border-radius: 10px;
  padding: 4px;
  text-align: center;
  cursor: grab;
  transition: transform .15s ease;
  display: flex; flex-direction: column; align-items: center;
}
.artist-card:hover { transform: scale(1.03); }
.artist-card img {
  width: 60%;
  height: 86px;       /* plus petit */
  object-fit: cover;
  border-radius: 8px;
  display: block;
  box-shadow: 0 2px 6px rgba(0,0,0,.25);
}
.artist-card p {
  margin: 4px 0 0;
  font-weight: 600;
  font-size: .72rem;  /* plus fin */
  color: #222;
  background: rgba(255,255,255,.85);
  padding: 2px 6px;
  border-radius: 6px;
}

/* --- Footer --- */
.footer { position: relative; text-align: center; margin-top: 10px; }
.validate-btn {
  background: #ffd700; color: #333; font-weight: bold; font-family: "Cascadia Code", monospace;
  border: none; border-radius: 8px; padding: .5rem 1.5rem; cursor: pointer; transition: transform .2s ease;
}
.validate-btn:hover { transform: scale(1.05); }

/* ===== AJOUT: message d'erreur rouge sur fond blanc ===== */
.msg {
  font-weight: 600;
  margin-top: .6rem;
  display: inline-block;
  padding: .35rem .75rem;
  border-radius: 8px;
  color: #fff; /* par défaut si OK on garde blanc (ou ta couleur existante) */
}
.msg.error {
  background: rgba(255,255,255,.95);
  color: #b30000;
  box-shadow: 0 2px 10px rgba(0,0,0,.15);
}

/* ===== AJOUT: bulle Machiavel ===== */
.machiavel-bubble {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,.85);
  color: #ffd700;
  border: 2px solid #ffd700;
  border-radius: 12px;
  padding: .8rem 1rem;
  max-width: 420px;
  font-style: italic;
  box-shadow: 0 8px 22px rgba(0,0,0,.35);
}
.fade-enter-active, .fade-leave-active { transition: opacity .25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* Sécurité responsive */
@media (max-width: 1280px) {
  .slot-artist p, .artist-card p { font-size: .7rem; }
}
</style>
