import { reactive } from 'vue'
import { LETTERS } from './config'

export const gameState = reactive({
  // ex: { A: 5, B: 0, ... } => la lettre correspond au morceau (index correct 0..8)
  letterToCorrectIndex: {} as Record<string, number>,
})

export function randomizeLetters(): string[] {
  const shuffled = [...LETTERS]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  const map: Record<string, number> = {}
  // la iᵉ position correcte (0..8) reçoit la lettre shuffled[i]
  shuffled.forEach((letter, i) => { map[letter] = i })
  gameState.letterToCorrectIndex = map
  return shuffled
}
