import DragonCard from "../component/DragonCard"
import { DragonI } from "../type/DragonI"
import { useEffect, useState } from "react"

export default function Home() {
  // ici on peut definir des variables (bidons: qui ne sont pas réactives)
  // on a un tableau de string et on veut fabriquer un tableau de div pour notre JSX on va utiliser MAP
  // const dragonlist: DragonI[] = [
  //   {
  //     id: 1,
  //     name: "Shenron",
  //     licence: "Dragon Ball",
  //     popularity: 5,
  //   },
  //   {
  //     id: 2,
  //     name: "Krokmou",
  //     licence: "Dragons",
  //     popularity: 5,
  //   },
  //   {
  //     id: 3,
  //     name: "Smolder",
  //     licence: "LoL",
  //     popularity: 5,
  //   },
  // ]

  // STEPS POUR CONSOMMER UNE API

  // 1. Je crée le state qui me permet de manager mes données (un tableau en général ou un objet)
  //2. Je crée le UseEffect afin d'appeler l'api
  //3. au sein du useEffect je transforme ma promesse en json
  //4. Je set mon state avec les données fraichement aquises
  //5 je map sur mon tableau pour afficher mes données

  //Je crée un state pour accueillir et manager mes datas api
  const [datas, setDatas] = useState<DragonI[]>([])

  // Je souhaite consomer mon API
  // UseEffect me permet d'effectuer des tâches APRES le rendu définitif de mon application
  useEffect(() => {
    ;(async () => {
      const httpResponse = await fetch("http://localhost:3000/api/dragons")
      const dataArray = await httpResponse.json()
      console.log(dataArray)
      return setDatas(dataArray)
    })()
  }, [])

  // Je crée un state qui va manager mon tableau
  // J'en ai besoin parce que un form permet d'ajouter des dragons
  const [dragons, setDragons] = useState<DragonI[]>([])
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
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYPDHx1XjxObHtt2GSqqGhoybTTiOUkVaRlg&s",
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

  // Le useEffect intervient pour effectuer des actions
  // APRES que le vdom ai modifié le dom réel
  // Ainsi toutes les manipoulations dom sont accessibles
  // Sert pour appel api / mise en place de timer / interaction avec services externes (mails...)
  useEffect(
    () => {
      console.log("hello mate")
      // Le dom etant chargé je peux aller target ma class main et changer son style
      //document.querySelector("main").style.backgroundColor = "blue"
    },
    //le deuxieme parametre est un tableau de dépendance (dependency array)
    // Il est vide : Le useEffect ne sera appelé qu'une seule fois après le premier rendu
    // des dépendances sont à l'interieur : Le useEffect sera lancé à CHAQUE FOIS qu'une des dépendance est modifiée
    // il n'existe pas : le useEffect est appelé après chaque rendu du composant
    []
  )

  //J'essaye de modifier le background color de mon main
  // Impossible en l'état, car le vdom n'est pas chargé tout de suite au lancement de l'application
  // Il faut donc attendre que le VDOM soit chargé, afin d'appliquer le style
  // On deplace donc cette ligne dans le hook useEffect
  //document.querySelector("main").style.backgroundColor = "blue"

  return (
    <div>
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
      <div>
        {datas.length > 0 &&
          datas.map((data) => (
            <div key={data.id}>
              <h2>{data.name}</h2>
              <img src={data.imgUrl} alt={data.name} />
              <p>{data.licence}</p>
            </div>
          ))}
      </div>
    </div>
  )
}
