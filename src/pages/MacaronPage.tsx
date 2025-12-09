// on ne peux pas recevoir le macaron a afficher en props puisque qu'on est sur une route avec segment dynamique , on voudrait à la place recevoir la valeur du segment dynamique
import { useParams } from 'react-router';
import type IMacaron from '../@types/macaron';

interface IMacaronPageProps {
  macaronList: IMacaron[];
}

export default function MacaronPage({ macaronList }: IMacaronPageProps) {
  const params = useParams();
  const flavourFromURL = params.flavour;

  // une fois qu'on a l'identifiant ou ici le parfum du macarons, il faudrait faire un call api vers le back pour recperer les infos supplémentaires à afficher
  // ici comme on a deja recupéré tous les macarons dans APP, app nosu envoie la lsite via une prop et on va chercher dedans le macaron à afficher.
  const macaronToDisplay = macaronList.find(
    (mac) => mac.flavour === flavourFromURL,
  );

  if (!macaronToDisplay) {
    // si le find n'a renvoyé aucun macaron ça veut dire que l'utilisateur a tapé dans l'url un nom de parfum qui n'existe pas genre http://localhost:5174/macaron/toto
    return <div>Ce macaron {flavourFromURL} n'existe pas </div>;
    // on va lui affioche run message d'erreur ou meme on peut le rediriger vers la page 404
    // return <Navigate to="404" />;
  }

  return (
    <div>
      <h1>Macaron {macaronToDisplay.flavour}</h1>

      <p>Couleur: {macaronToDisplay.color}</p>
    </div>
  );
}
