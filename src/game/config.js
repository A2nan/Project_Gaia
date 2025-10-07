// Image publique (Wikimedia Commons)
export const IMAGE_URL =
  'https://upload.wikimedia.org/wikipedia/commons/4/4d/Saint_Jerome_Writing-Caravaggio_%281605-6%29.jpg'

// Plateau 3x3 (9 pièces)
export const SIZE = 3
export const BOARD_PX = 600

// Lettres A..I mappées à la position correcte (1..9 -> 0..8)
// Ici on choisit : A=case1 (0), B=case2 (1), ..., I=case9 (8)
export const LETTERS = ['A','B','C','D','E','F','G','H','I']
export const CORRECT_INDEX_BY_LETTER = LETTERS.reduce((acc, letter, i) => {
  acc[letter] = i
  return acc
}, {})

// (Optionnel) descriptions "Leone" – placeholders que tu peux éditer
export const DEFAULT_DESCRIPTIONS = {
  A: "Coin supérieur gauche",
  B: "Haut centre",
  C: "Haut droit",
  D: "Milieu gauche",
  E: "Centre",
  F: "Milieu droit",
  G: "Bas gauche",
  H: "Bas centre",
  I: "Bas droit"
}
