// useState est une fonction speciale importée de React, c'est un hook c'est à dire qu'elle n'a le droit d'etre utilisée que dans des composants (fonction qui return du JSX) et elle ne doit etre executée que à la racine du composant (pas dans des boucles, des conditions, des sous fonctions)
import Header from "./component/Header"
import Footer from "./component/Footer"
import Dragon from "./component/Dragon"
import DragonCard from "./component/DragonCard"
import { DragonI } from "./type/DragonI"
import { useState } from "react"

// COMPOSANT : un composant est une fonction qui return du JSX
// on met une majuscule au debut du nom de la fonction composant
function App() {
  // ici on peut definir des variables (bidons: qui ne sont pas réactives)
  // on a un tableau de string et on veut fabriquer un tableau de div pour notre JSX on va utiliser MAP
  const dragonlist: DragonI[] = [
    {
      id: 1,
      name: "Shenron",
      licence: "Dragon Ball",
      popularity: 5,
    },
    {
      id: 2,
      name: "Krokmou",
      licence: "Dragons",
      popularity: 5,
    },
    {
      id: 3,
      name: "Smolder",
      licence: "LoL",
      popularity: 5,
    },
  ]

  // Je crée un state qui va manager mon tableau
  // J'en ai besoin parce que un form permet d'ajouter des dragons
  const [dragons, setDragons] = useState<DragonI[]>(dragonlist)
  //Je crée un state pour choisir mon dragon
  const [currentDragon, setCurrentDragon] = useState(dragons[0])

  //Je crée un state pour gérer la cote de popularité du dragon
  const [popularity, setPopularity] = useState(3)

  const handleAction = (formData: FormData) => {
    //Je recupère les clés du form qui m'interressent
    const name = formData.get("name")
    const licence = formData.get("licence")
    // Je duplique mon tableau qui est dans un state
    //Ce qui crée une nouvelle adresse pour mon tableau
    // IMPORTANT on,, ne modifie JAMAIS un state sans passer par son setter
    const duplicatedDragons = [...dragons]
    //J'ajoute la nouvelle entrée demandée par l'administrateur
    duplicatedDragons.push({
      id: duplicatedDragons.length + 1,
      name: name as string,
      licence: licence as string,
      popularity: popularity,
    })
    //Je peux créer ma duplication de tableau ET le mettre à jour en même temps
    //Grace au spread operator
    // const duplicatedMacarons = [
    //   ...macarons,
    //   {
    //     perfume: perfume as string,
    //     color: color as string,
    //   },
    // ]
    //Je set mon state pour update le tableau
    setDragons(duplicatedDragons)
  }

  // Les types non primitifs ne peuvenbt pas être comparés comme les types primitifs,
  //  à moins qu'ils partagent la même "adresse"
  const array = ["pomme", "poire", "peche"]
  const array2 = array
  //return true
  console.log(array === array2)

  return (
    <div className="app">
      <Header />
      <Dragon />
      <main className="main">
        {
          // avec map on fabrique un tableau d'element div JSX
          dragons.map((dragon) => {
            // on doit return la ligne du tableau généré par map: un element JSX div
            // on est obligé d'ajouter une prop "key" aux elements quand ils sont dan sun tableau pour que React puisse les identifier (attention on ne met pas l'index du tableau en key)
            return (
              <DragonCard dragon={dragon} setCurrentDragon={setCurrentDragon} />
            )
          })
        }
        <p>
          {/* // 🟢 Vu que le state est global, je peux utiliser des infos à
          différents endroits de mon application Votre choix :{" "} */}
          <span id="choice">
            Votre choix actuel : Dragon {currentDragon.name}
          </span>
        </p>
        <form action={handleAction}>
          <label htmlFor="name">name</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="licence">licence</label>
          <input type="text" name="licence" id="licence" />
          <label htmlFor="popularity">Popularité : de 1 à 5</label>
          <input
            min="1"
            max="5"
            name="popularity"
            id="popularity"
            type="range"
            value={popularity}
            onChange={(event) => setPopularity(Number(event.target.value))}
          />
          <button type="submit">Envoyer</button>
        </form>
      </main>
      {/* <ComposantImporté props1DuComposantImporté = {propsQueJeTransmet} /> */}
      <Footer />
    </div>
  )
}

// on pense à exporter le composant pour qu'il soit utilisable ailleurs
export default App
