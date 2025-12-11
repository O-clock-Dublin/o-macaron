//Cette fonction composant prend en argument {macaron}
// On décide de en récupérer QUE cette clé venant des props
import { useEffect } from "react"
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
  useEffect(() => {
    // 🟢 Dès qu'un nouveau dragon est monté, un petit message apparaît
    // dans la console
    console.log(`Dragon "${dragon.name}" est monté 🍥`)

    // 🟢 Quand le dragon est démonté, on applique un effet de cleanup
    // 🟢 Ce sera utile pour éviter des effets de bord
    return () => {
      console.log(`Dragon "${dragon.name}" a disparu 💨`)
    }
  }, [dragon.name])

  return (
    <button onClick={() => setCurrentDragon(dragon)} key={dragon.id}>
      Dragon {dragon.name}
    </button>
  )
}
