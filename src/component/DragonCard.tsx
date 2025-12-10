//Cette fonction composant prend en argument {macaron}
// On décide de en récupérer QUE cette clé venant des props
import { DragonI } from "../type/DragonI"

// On la type ensuite afin de s'assurer que l'on récupère une chaine de caractère
export default function DragonCard({
  dragon,
  setCurrentDragon,
}: {
  dragon: DragonI
  setCurrentDragon: (dragon: DragonI) => void
}) {
  console.log(dragon)
  return (
    <button onClick={() => setCurrentDragon(dragon)} key={dragon.id}>
      Dragon {dragon.name}
    </button>
  )
}
