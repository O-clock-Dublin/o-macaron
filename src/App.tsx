// useState est une fonction speciale importée de React, c'est un hook c'est à dire qu'elle n'a le droit d'etre utilisée que dans des composants (fonction qui return du JSX) et elle ne doit etre executée que à la racine du composant (pas dans des boucles, des conditions, des sous fonctions)
import { useState } from 'react';

// COMPOSANT : un composant est une fonction qui return du JSX
// on met une majuscule au debut du nom de la fonction composant
function App() {
  // ici on peut definir des variables (bidons: qui ne sont pas réactives)
  // on a un tableau de string et on veut fabriquer un tableau de div pour notre JSX on va utiliser MAP
  const macaronList = ['choco', 'citron', 'framboise'];

  // on peut aussi definird es variables réactives, des variables de state, on utilise useState
  // je veux créer 2 variables à partir des 2 lignes de mon tableau, j'utilise la syntaxe du destructuring  directement
  const [count, setCount] = useState(60);

  return (
    <div className="app">
      <header className="header">
        <h1 className="header-title">O'Macarons</h1>
      </header>
      <main className="main">
        {
          // avec map on fabrique un tableau d'element div JSX
          macaronList.map((parfum) => {
            // on doit return la ligne du tableau généré par map: un element JSX div
            // on est obligé d'ajouter une prop "key" aux elements quand ils sont dan sun tableau pour que React puisse les identifier (attention on ne met pas l'index du tableau en key)
            return <div key={parfum}>Macaron {parfum}</div>;
          })
        }
      </main>
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
      </footer>
    </div>
  );
}

// on pense à exporter le composant pour qu'il soit utilisable ailleurs
export default App;
