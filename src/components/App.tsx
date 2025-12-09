// import du hook de react pour créer les states
import { useEffect, useState } from 'react';

// import de la lib axios qu'on a installé avec 'pnpm i axios' qui va servir à faire des fetch (si vous preferez ne pas l'utiliser et faire des fetch natif vous pouvez !)
import axios from 'axios';

// import du sous composant Macaron qui affiche un seul macaron
import Macaron from './Macaron';
import Footer from './Footer';

// import du tableau de données : on va devoir le placer dans un state, car on veut qu'il evolue et que l'affichage evolue avec lui !!!
// on va aller les chercher sur une API
// import data from '../data/macarons';

// import du style du composant App
import './App.scss';

// import du type IMacaron pour typer le state qui stocke le tableau des macarons
import type IMacaron from '../@types/macaron';

// COMPOSANT : un composant est une fonction qui return du JSX
// on met une majuscule au debut du nom de la fonction composant
function App() {
  console.log('rendu de App');

  // STATE qui pilote l'affichage de la classe app--dark dans app
  // mais Footer a besoin de isDark et setIDark car le bouton qui modifie le state est dans Footer
  // c'est un etat partagé car on fait passer sa valeur ou son setter à un sous composant
  const [isDark, setDark] = useState(false);

  // STATE pour stocker les macarons, valeur initiale, le tableau des data
  // ce tableau du state est utilisé pour le map pour afficher les macarons dans le JSX
  // quand on va valider le form, on va ajouter une entrée dans le tableau et le composant va refaire son rendu ave cun macarons de plus !
  // attention useState "type" l'emplacemennt de state avec la valeur initiale, ici la valeur initiale c'est un tableau vide donc il croit que ça sera tjs un tableau vide
  // dans ce cas il faut dire à useState que le type du state n'est pas celui de la valeur initiale et on va le lui donner en généric entre chevrons comme ceci : <IMacaron[]>
  const [macaronList, setMacaronList] = useState<IMacaron[]>([]);
  // STATE pour stocker l'état de loading des données macarons
  const [isLoading, setIsLoading] = useState(true);
  // STATE pour stocker l'eventuelle erreur
  const [errorMessage, setErrorMessage] = useState('');

  // STATE pour stocker la valeur de l'input filter search, l'affichage va s'adapter à chaque fois que la valeur change on va filtrer les macarons affichés
  // SSoT : le state est la seule source de vérité donc on veut que le state "pilote" l'input, on a un input controlé par le state
  const [searchString, setSearchString] = useState('');

  // call API avec fetch (non utilisé car on finalement on utilsie axios ;)
  // biome-ignore lint/correctness/noUnusedVariables: <la fonction n'est pas utilisée mais je la laisse pour exemple de cours>
  const getMacaronsAvecFetch = async () => {
    try {
      const response = await fetch(
        'https://oclock-api.vercel.app/api/macaronnnnns',
      );
      if (!response.ok) {
        // de base fetch ne throw pas d'erreur si la response est 404 donc on le fait à la main
        throw new Error('404');
      }
      const datas = await response.json();
      console.log(datas);
    } catch (e) {
      console.log(e);
    }
  };

  // EFFET qui sera executé que au premier rendu
  useEffect(() => {
    const getMacaronsAvecAxios = async () => {
      // on enleve la potentielle erreur
      setErrorMessage('');
      try {
        // on va fetch avec une lib axios qu'il faut installer : "pnpm i axios"
        const response = await axios.get(
          'https://oclock-api.vercel.app/api/macarons',
        );
        // on a direct les données dans la propriété data de l'objet reçu
        // TJS loguer les données reçues d'une API pour voir la structure
        console.log(response.data);

        // on a les données on va en faire quoi ???? -> les enregistrer dans le state !
        setMacaronList(response.data);
      } catch (e) {
        // si y'a une erreur on l'enregistre dans le state
        // on pourrait adapter le message en fonction de l'erreur reçue...
        setErrorMessage('Erreur de fetch des macarons');
        console.log(e);
      }
      // on a reçu les données on les met dans le state OU on a rien reçu y'a une erreur :
      // on passe l'etat à false pour cacher le loader !
      setIsLoading(false);
    };
    getMacaronsAvecAxios();
  }, []);

  // EFFET executée après chaque rendu : le mount (le premier) et tous les updates !
  useEffect(() => {
    // ici le code à executer APRES le rendu quand le JSX est reconcilié avec le DOM
    console.log('effet executé après le mount ET les updates');
    // ici on pourrait executer tout code qui ne concerne pas la construction du JSX :
  });

  // EFFET executé QUE après le premier rendu (pas après les updates) : tableau vide en deuxieme argument
  useEffect(
    // - premier argument : la callback avec le code de l'effet
    () => {
      console.log('effet executé après le mount');
      // ici on pourrait executer tout code qui ne concerne pas la construction du JSX :
      // on veut garde run composant PURE donc pas d'effets de bord dan sle code du composant, les effets de bord ça va dans le useEffect !
      // - agir sur le DOM quand il est pret
      // - modifier le titre de l'onglet (hors scope JSX)
      // - enregistrer dans un fichier de log le fait que le user a chargé ma page
      // - envoyer un mail
      // - faire un call api pour recuperer au sauvegarder des données
      // - se connecter à un serveur websocket
      // .... etc
    },
    // - deuxieme argument : tableau de deps vide
    [],
  );

  // EFFET executé au premier rendu (mount) ET à chaque fois que la dep change : tableau avec dep dedans
  useEffect(
    // - premier argument : la callback avec le code de l'effet
    () => {
      // on change le titre de l'onglet de la page si isDark change
      document.title = `OMacarons - ${isDark ? 'dark' : 'light'}`;
    },
    // deuxieme argument : tableau de dependance avec isDark
    [isDark],
  );

  // on se sert de la vameur de searchString pour filtrer le tableau macaronList
  const filteredMacarons = macaronList.filter((macaron) => {
    // on return true si on garde la ligne dans le nouveau tableau
    // et false si on veut pas garder la ligne

    // est ce que la search string est inclue dans le nom du parfum
    return macaron.flavour.includes(searchString);
  });

  // attention si on "sort" le handler du JSX l'event n'est plus automatiquement typé donc il faut l'expliciter !
  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    // on change le state, ce qui va changer la value puisque la value c'est ce qu'il y a dans le state
    // on va recuperer la chaine de caractère tapée par l'utilisateur dans l'event change
    const newText = event.currentTarget.value;
    setSearchString(newText);
  }

  return (
    <div className={isDark ? 'app app--dark' : 'app'}>
      <header className="header">
        <h1 className="header-title">O'Macarons</h1>
        {/* si on est en mode dark on veut afficher un message */}
        {isDark && <p>On est en mode dark</p>}
      </header>

      <form className="form">
        <input
          id="search-input"
          className="form__input"
          type="text"
          placeholder="search...."
          // controle en lecture, l'utilisateur "lit" le state dans l'input
          value={searchString}
          // controle en ecriture : quand l'utilisateur tape un caractère dans l'input on va ecrire ce caractère dans le state
          onChange={handleChange}
        />
      </form>

      <main className="main">
        {errorMessage && <p>{errorMessage}</p>}
        {isLoading && <div className="loader" />}
        {
          // avec map on fabrique un tableau d'element div JSX
          // à partir du tableau filtré par la search string, on n'affiche pas TOUS les macarons, on affiche que ceux qui sont dans le tableau filtré
          filteredMacarons.map((macaron) => {
            // on return la ligne du tableau généré par map: un element JSX div
            // on est obligé d'ajouter une prop "key" aux elements quand ils sont dans un tableau pour que React puisse les identifier
            // (attention on ne met pas l'index du tableau en key) !
            // on ajoute une prop à notre sous composant macarons, on l'apelle macaronToDisplay et en valeur on donne l'objet macaron à afficher
            return <Macaron key={macaron.id} macaronToDisplay={macaron} />;
          })
        }
      </main>

      <form
        className="form"
        // depuis React 19 on peut utiliser direct la prop action et dans la callback on reçoit direct en param le formData et ça fait le preventDefault tout seul
        action={(formData) => {
          // formData.get renvoie pas une string mais un FormDataEntryValue | null
          // on précise que c'est une string avec "as string" parmis null, file ou string
          const flavourFromForm = formData.get('parfum') as string;

          // on créé un tableau d'ids
          const idsTab = macaronList.map((macaron) => macaron.id);
          // on prend le plus grand avec math.max
          const biggestId = Math.max(...idsTab);
          console.log(biggestId);

          // creation d'un nouvel objet macaron
          const newMac = {
            id: biggestId + 1,
            // flavour doit contenir une string
            flavour: flavourFromForm,
            color: formData.get('color') as string,
          };

          console.log(newMac);

          // on veut l'ajouter au state de app
          // macaronList.push(newMac); -> INTERDIT de MUTER LE STATE
          // on va utiliser le setter setMacaronList sinon y'a pas de nouveau rendu
          // le setter si on lui donne la meme valeur qu'avant il ne refait pas de rendu
          // or si on lui file macaronList, meme si y'a une nouvelle ligne dedans c'est le meme tableau qu'avant
          // le setter fait une comparaison de surface entre le tableau qu'on lui file et le tableau que y'a dans le state, là il voit que c'est le meme, il va pas check en profondeur si y'a des lignes en + donc il refait pas le rendu

          // on doit créer un nouveau tableau
          const newMacaronsTab = [
            // deverser les anciens macarons avec le spread opérator, le spread copie les lignes du tableau macaronList, dans le nouveau tableau newMacaronsTab
            ...macaronList,
            // et à la fin j'ajoute le nouveau
            newMac,
          ];

          // on file bien au setter un tout nouveau tableau comme ça il verra que c'est pas la meme ref et il refera le rendu !
          setMacaronList(newMacaronsTab);
        }}
        // vielle méthode
        //</div>onSubmit={(event) => {
        // submit du form recharge la page : ce qu'on ne veut pas !! on est en SPA on a qu'une page , on veut pas refaire de requete au serveur front sinon on perd les données qu'il y a dans le state
        //event.preventDefault();
        // ajouter une ligne dans le tableau des macarons!
        // on recuperer le event.currentTarget -> le formulaire !!!
        // avec currentTarget on sait que c'est le form
        // c'est important en TS pour que myform soit bien typé (un HTMLFormElement)
        //const myform = event.currentTarget;
        // on créé un formdata à partir de notre forumaire
        //const myformdata = new FormData(myform);
        // on recupere la valeur de l'input parfum avec la méthode get du formData
        //const parfum = myformdata.get('parfum');
        //console.log(parfum);
        //}}
      >
        <input
          className="form__input"
          type="text"
          placeholder="parfum...."
          name="parfum"
        />
        <input
          className="form__input"
          type="text"
          placeholder="color...."
          name="color"
        />
        <button className="form__btn" type="submit">
          Ajouter
        </button>
      </form>

      <Footer
        /* Le sous composant Footer à 3 props */
        macaronList={macaronList}
        isDark={isDark}
        setDark={setDark}
      />
    </div>
  );
}

// on pense à exporter le composant pour qu'il soit utilisable ailleurs
export default App;
