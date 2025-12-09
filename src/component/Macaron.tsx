//Cette fonction composant prend en argument {macaron}
// On décide de en récupérer QUE cette clé venant des props

import { MacaronI } from "../type/MacaronI"

// On la type ensuite afin de s'assurer que l'on récupère une chaine de caractère
export default function Macaron({
  macaron,
  setCurrentMacaron,
}: {
  macaron: MacaronI
  setCurrentMacaron: (macaron: MacaronI) => void
}) {
  console.log(macaron)
  return (
    <button onClick={() => setCurrentMacaron(macaron)} key={macaron.perfume}>
      Macaron {macaron.perfume}
    </button>
  )
}
