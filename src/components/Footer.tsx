import { useState } from 'react';

// import de composants de la lib react-feather quon a installé avec la commande 'pnpm i react-feather'
import { Moon, Sun } from 'react-feather';

// import du style du composant Footer
import './Footer.scss';

// import du type defini dans @types
import type IMacaron from '../@types/macaron';

// TYPAGE des props
interface IFooterProps {
  // un tableau d'objets
  macaronList: IMacaron[];
  isDark: boolean;
  // setDark est une fonction créé et renvoyée par useState, pour connaitre son type on passe la souris au dessus du nm de la fonction et on copie colle le type
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
}

function Footer({ macaronList, isDark, setDark }: IFooterProps) {
  // STATE pour stocker le compteur du footer
  // c'est un etat local au composant footer
  // si il est modifier il n'y a que footer qui refait son rendu
  const [count, setCount] = useState(0);

  // return juste le JSX du footer
  return (
    <footer className="footer">
      <p className="result">
        {/* dans le JSX on peut mettre des expressions JS si on les entoure d'accolades (un peu comme dans les template string) */}
        resultat <span>{count}</span>
      </p>
      <button
        // on ecoute le click et on execute le handler defini ici dans le JSX quand un click survient
        onClick={() => {
          console.log('click');
          // on veut incrementer le compteur, il faut utiliser le setter renvoyé par useState
          // on donne en paramètre au setter la nouvelle valeur de count
          // ATTENTION on ne doit jamais modifier le state directement
          // count = count + 1 --> INTERDIT !!!
          setCount(count + 1);

          // si je log ici le count il sera tjs à zéro: le setter ne change pas tout de suite la valeur du state mais il le changera que dans la prochaine execution du composant
          console.log(count);
        }}
        type="button"
      >
        +
      </button>
      <button
        type="button"
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -
      </button>
      <button
        type="button"
        onClick={() => {
          // reset le compteur
          setCount(0);
        }}
      >
        reset
      </button>
      <p>{macaronList.length} macarons dispos</p>
      <button
        className="darkmode"
        type="button"
        onClick={() => {
          // changer la valeur de isDark dans le state de App
          // sauf que là on est dans Footer
          setDark(!isDark);
        }}
      >
        {isDark ? <Sun /> : <Moon />}
      </button>
    </footer>
  );
}

export default Footer;
