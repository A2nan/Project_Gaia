import { reactive } from 'vue'
import { LETTERS } from './config'

const LS_KEY = 'cappella_letter_mapping_v2'

export const gameState = reactive({
  letterToCorrectIndex: {} as Record<string, number>,
})

export function initLetterMappingOnce(): void {
  if (Object.keys(gameState.letterToCorrectIndex).length === LETTERS.length) return

  const saved = localStorage.getItem(LS_KEY)
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (parsed && Object.keys(parsed).length === LETTERS.length) {
        gameState.letterToCorrectIndex = parsed
        console.log('🧩 Mapping rechargé depuis localStorage :', parsed)
        return
      }
    } catch {}
  }

  const positions = Array.from({ length: LETTERS.length }, (_, i) => i)
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[positions[i], positions[j]] = [positions[j], positions[i]]
  }

  const mapping: Record<string, number> = {}
  LETTERS.forEach((letter, i) => (mapping[letter] = positions[i]))

  gameState.letterToCorrectIndex = mapping
  localStorage.setItem(LS_KEY, JSON.stringify(mapping))

  console.log('🧩 Nouveau mapping généré :', mapping)
}

export function resetLetterMapping(): void {
  localStorage.removeItem(LS_KEY)
  gameState.letterToCorrectIndex = {}
  initLetterMappingOnce()
}

export function getLettersFromMapping(): string[] {
  return LETTERS.slice()
}
