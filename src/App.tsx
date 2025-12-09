// useState est une fonction speciale importée de React, c'est un hook c'est à dire qu'elle n'a le droit d'etre utilisée que dans des composants (fonction qui return du JSX) et elle ne doit etre executée que à la racine du composant (pas dans des boucles, des conditions, des sous fonctions)
import Header from "./component/Header"
import Footer from "./component/Footer"
import Dragon from "./component/Dragon"
import Macaron from "./component/Macaron"
import { MacaronI } from "./type/MacaronI"
import { useState } from "react"

// COMPOSANT : un composant est une fonction qui return du JSX
// on met une majuscule au debut du nom de la fonction composant
function App() {
  // ici on peut definir des variables (bidons: qui ne sont pas réactives)
  // on a un tableau de string et on veut fabriquer un tableau de div pour notre JSX on va utiliser MAP
  const macaronList: MacaronI[] = [
    {
      perfume: "Choco",
      color: "Marron",
    },
    {
      perfume: "Framboise",
      color: "rose",
    },
    {
      perfume: "Pistache",
      color: "Vert",
    },
  ]

  //Je crée un state pour choisir mon macaron
  const [currentMacaron, setCurrentMacaron] = useState(macaronList[0])

  return (
    <div className="app">
      <Header />
      <Dragon />
      <main className="main">
        {
          // avec map on fabrique un tableau d'element div JSX
          macaronList.map((macaron) => {
            // on doit return la ligne du tableau généré par map: un element JSX div
            // on est obligé d'ajouter une prop "key" aux elements quand ils sont dan sun tableau pour que React puisse les identifier (attention on ne met pas l'index du tableau en key)
            return (
              <Macaron
                macaron={macaron}
                setCurrentMacaron={setCurrentMacaron}
              />
            )
          })
        }
        <p>
          {/* // 🟢 Vu que le state est global, je peux utiliser des infos à
          différents endroits de mon application Votre choix :{" "} */}
          <span id="choice">
            Votre choix actuel : macaron {currentMacaron.perfume}
          </span>
        </p>
      </main>
      {/* <ComposantImporté props1DuComposantImporté = {propsQueJeTransmet} /> */}
      <Footer />
    </div>
  )
}

// on pense à exporter le composant pour qu'il soit utilisable ailleurs
export default App
