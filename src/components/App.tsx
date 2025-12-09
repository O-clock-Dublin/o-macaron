// import des composants Routes et Route de react-router qui permettent de definir les routes
// une route est un mapping entre une URL "path" et un composant affiché "element"
import { Route, Routes } from 'react-router';

// import des hooks de react
import { useEffect, useRef, useState } from 'react';

// import de la lib axios (installé avec 'pnpm i axios') qui permet de faire des requetes HTTP
// (si vous preferez ne pas l'utiliser et utilise le fetch natif vous pouvez !)
import axios from 'axios';

// import du style du composant App
import './App.scss';

// import du type IMacaron pour typer le state qui stocke le tableau des macarons
import type IMacaron from '../@types/macaron';

// import des sous composants
import NavBar from './NavBar';
import Footer from './Footer';
import AccueilPage from '../pages/AccueilPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';
import MacaronPage from '../pages/MacaronPage';

// COMPOSANT : un composant est une fonction qui return du JSX
// on met une majuscule au debut du nom de la fonction composant
function App() {
  // REF pour stocker le nombre de rendu, elle ne sera initialisé à zéro qu'au premier rendu,
  // ensuite elle conserve sa valeur !
  const myRefNbRendus = useRef(0);
  myRefNbRendus.current++;
  console.log('rendu numéro : ', myRefNbRendus.current);

  // STATE qui pilote l'affichage de la classe app--dark dans app
  // mais Footer a besoin de isDark et setIDark car le bouton qui modifie le state est dans Footer
  // c'est un etat partagé car on fait passer sa valeur ou son setter à un sous composant
  const [isDark, setDark] = useState(false);

  /* STATE pour stocker les macarons, valeur initiale, le tableau des data
  ce tableau du state est utilisé pour le map pour afficher les macarons dans le JSX
  quand on va valider le form, on va ajouter une entrée dans le tableau et le composant va refaire son rendu avec un macarons de plus !
  attention useState "type" l'emplacemennt de state avec la valeur initiale, ici la valeur initiale c'est un tableau vide donc il croit que ça sera tjs un tableau vide
  dans ce cas il faut dire à useState que le type du state n'est pas celui de la valeur initiale et on va le lui donner en généric entre chevrons comme ceci : <IMacaron[]> */
  const [macaronList, setMacaronList] = useState<IMacaron[]>([]);
  // STATE pour stocker l'état de loading des données macarons
  const [isLoading, setIsLoading] = useState(true);
  // STATE pour stocker l'eventuelle erreur
  const [errorMessage, setErrorMessage] = useState('');

  // STATE pour stocker la valeur de l'input filter search, l'affichage va s'adapter à chaque fois que la valeur change on va filtrer les macarons affichés
  // SSoT : le state est la seule source de vérité donc on veut que le state "pilote" l'input, on a un input controlé par le state
  const [searchString, setSearchString] = useState('');

  // EFFET qui sera executé que au premier rendu
  useEffect(() => {
    // call API avec fetch (non utilisé car on finalement on utilise axios ;)
    // biome-ignore lint/correctness/noUnusedVariables: <la fonction n'est pas utilisée mais je la laisse pour exemple de cours>
    const getMacaronsAvecFetchNonUtilisé = async () => {
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
    const getMacaronsAvecAxios = async () => {
      // on enleve la potentielle erreur
      setErrorMessage('');
      try {
        // on va fetch avec une lib axios qu'il faut installer : "pnpm i axios"
        const response = await axios.get(
          'https://oclock-api.vercel.app/api/macarons',
        );
        // on a direct les données dans la propriété data de l'objet reçu
        // Bien penser à TOUJOURS loguer les données reçues d'une API pour voir la structure !
        console.log(response.data);

        // on a les données on va en faire quoi ???? -> les enregistrer dans le state !
        setMacaronList(response.data);
      } catch (e) {
        // si y'a une erreur on l'enregistre dans le state
        // on pourrait adapter le message en fonction de l'erreur reçue...
        setErrorMessage('Erreur de fetch des macarons');
        console.log(e);
      }
      // on a reçu les données on les a mise dans le state OU on a rien reçu car y'a eu une erreur
      // mais dans tous les cas, on passe l'etat à false pour cacher le loader !
      setIsLoading(false);
    };
    getMacaronsAvecAxios();
  }, []);

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
        <NavBar />
        <h1 className="header-title">O'Macarons</h1>
        {/* si on est en mode dark on veut afficher un message */}
        {isDark && <p>On est en mode dark</p>}
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <AccueilPage
              macaronList={macaronList}
              searchString={searchString}
              handleChange={handleChange}
              errorMessage={errorMessage}
              isLoading={isLoading}
              setMacaronList={setMacaronList}
            />
          }
        />
        <Route path="/contact" element={<ContactPage />} />

        {/* cette route a un segment dynamique qu'on precede de ":" donc elle va matcher (elle va affiche le composant MacaronPage) quelque soit la valeur rééle du segment dans l'URL  */}
        <Route
          path="/macaron/:flavour"
          element={<MacaronPage macaronList={macaronList} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

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
