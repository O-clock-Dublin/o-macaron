// import du composant Link de la lib react-router (on l'a insatlée avant avec pnpm i react-router)
// ce composant fait le rendu d'un lien <a> mais ce lien ne fait pas de requete au back (preventdefault)
// et il change quand meme l'historique de avigation (pushState)
// on lui donne l'url dans sa prop "to" (equivalent de "href")
// NavLink est identique sauf qu'il ajoute une classe CSS si le lien est actif (si on est sur la page du lien)
import { NavLink } from 'react-router';

export default function NavBar() {
  return (
    <nav className="nav">
      <NavLink
        to="/"
        className={({ isActive }) => {
          // par defaut NavLink ajoute une classe "active" si le lien est actif,
          // nous on veut une classe appelée non pas "active" mais "nav-link--active"
          // donc on le précise en donnant à la prop className une fonction qui reçoit un objet avec une clé isActive
          // et qui return la classe qu'on veut appliquer
          return isActive ? 'nav-link nav-link--active' : 'nav-link';
        }}
      >
        Accueil
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) => {
          return isActive ? 'nav-link nav-link--active' : 'nav-link';
        }}
      >
        Contact
      </NavLink>
    </nav>
  );
}
