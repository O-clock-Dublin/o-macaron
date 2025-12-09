import { useEffect, useRef } from 'react';
import Macaron from '../components/Macaron';
import type IMacaron from '../@types/macaron';

interface AccueilPageProps {
  macaronList: IMacaron[];
  setMacaronList: React.Dispatch<React.SetStateAction<IMacaron[]>>;
  searchString: string;
  // => void veut dire que la fonction ne return rien !
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: null | string;
  isLoading: boolean;
}

export default function AccueilPage({
  macaronList,
  setMacaronList,
  searchString,
  handleChange,
  errorMessage,
  isLoading,
}: AccueilPageProps) {
  // REF, c'est une variable qui va contenir l'input après le rendu
  // mais au debut elle est vide car quand elle est créé l'input n'existe pas encore
  const myInputRef = useRef<null | HTMLInputElement>(null);

  // EFFET pour recuperer un element du DOM, faut attendre que le dom soit reconcilié avec le JSX qu'on va renvoyer
  // donc faut le faire APRES le rendu donc dans un useEffect
  useEffect(() => {
    // pour recuperer l'input on pourrait faire :
    // const inputElt = document.querySelector('#search-input') as HTMLElement; -> PAS BIEN
    // au lieu d'utiliser querySelector on va placer une ref sur l'element du JSX
    // la ref sera "rempli" automatiquement après le rendu par react
    console.log(myInputRef.current);

    (myInputRef.current as HTMLInputElement).focus();
  }, []);

  // FILTRE des macarons avec la valeur de searchString
  const filteredMacarons = macaronList.filter((macaron) => {
    // la callback de filter doit return :
    //  - true si on garde la ligne dans le nouveau tableau
    //  - false si on veut pas garder la ligne
    // donc on retourne la réponse à la question : est ce que la search string est inclue dans le nom du parfum ?
    return macaron.flavour.includes(searchString);
  });

  return (
    <div>
      <form className="form">
        <input
          // je branche cet element JSX avec ma ref, automatiquement react va remplir la ref avec l'element input du DOM (le vrai node) quand il sera pret, il va mettre l'input dans la clé current de l'objet ref
          ref={myInputRef}
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
        // depuis React 19 on peut utiliser direct la prop action,
        // la callback on reçoit direct le formData en param, ça fait le preventDefault tout seul et ça vide les inputs !
        action={(formData) => {
          // formData.get ne renvoie pas une string mais un FormDataEntryValue | null
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
          // on veut ajouter ce nouveau macaron au state de app
          // macaronList.push(newMac); -> INTERDIT de MUTER LE STATE
          // on va utiliser le setter setMacaronList sinon y'a pas de nouveau rendu
          // le setter si on lui donne la meme valeur qu'avant il ne refait pas de rendu
          // or si on lui file macaronList, meme si y'a une nouvelle ligne dedans c'est le meme tableau qu'avant
          // le setter fait une comparaison de surface entre le tableau qu'on lui file et le tableau que y'a dans le state, il ne va pas check en profondeur si y'a des lignes en +

          // donc on doit créer un nouveau tableau
          const newMacaronsTab = [
            // deverser les anciens macarons avec le spread opérator, le spread copie les lignes du tableau macaronList, dans le nouveau tableau newMacaronsTab
            ...macaronList,
            // et à la fin j'ajoute le nouveau
            newMac,
          ];

          // on file bien au setter un tout nouveau tableau comme ça il verra que c'est pas la meme ref et il refera le rendu !
          setMacaronList(newMacaronsTab);
        }}
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
    </div>
  );
}
