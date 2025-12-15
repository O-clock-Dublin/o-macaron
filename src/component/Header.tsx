import { Link, NavLink } from "react-router"
import "./header.css"

//On crée une fonction composante qui retournera le html de l'element souhaité, ici le Header
const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">O'Macarons</h1>
      <nav>
        <Link to="/contact">Nous contacter</Link>
        <Link to="/">Home</Link>
      </nav>
      <nav>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "menu-link active" : "menu-link"
          }}
          to="/"
        >
          Home
        </NavLink>
      </nav>
    </header>
  )
}

export default Header
