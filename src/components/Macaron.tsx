import { Link } from 'react-router';
import { useState } from 'react';

// import du custom type (interface) Macaron pour typer la prop macaronToDisplay
// on importe pas une valeur mais juste un type donc on met 'type' derriere import
import type IMacaron from '../@types/macaron';

// import du style du composant macaron
import './Macaron.scss';

// TYPESCRIPT qui défini le type des props du composant Macaron
interface IMacaronProps {
  // prop macaronToDisplay
  macaronToDisplay: IMacaron;
}

// COMPOSANT
function Macaron({ macaronToDisplay }: IMacaronProps) {
  // STATE local : utilisé dans ce composant uniquement
  const [like, setLike] = useState(0);

  // return le morceau de JSX qui dessine 1 macaron
  return (
    <Link to={`/macaron/${macaronToDisplay.flavour}`}>
      <div className="macaron">
        <button
          type="button"
          onClick={() => {
            setLike(like + 1);
          }}
          className="macaron__like"
        >
          {like}❤️
        </button>

        <div
          className="macaron__coque"
          // changement de la couleur avec du CSS-in-JS
          style={{ backgroundColor: macaronToDisplay.color }}
        />

        <div className="macaron__filling">{macaronToDisplay.flavour}</div>
        <div
          className="macaron__coque reversed"
          style={{ backgroundColor: macaronToDisplay.color }}
        />
      </div>
    </Link>
  );
}

export default Macaron;
