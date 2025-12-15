// useState est une fonction speciale importée de React, c'est un hook c'est à dire qu'elle n'a le droit d'etre utilisée que dans des composants (fonction qui return du JSX) et elle ne doit etre executée que à la racine du composant (pas dans des boucles, des conditions, des sous fonctions)
import Header from "./component/Header"
import Footer from "./component/Footer"
import Dragon from "./component/Dragon"
import { BrowserRouter, Route, Routes } from "react-router"
import Home from "./page/Home"
import Contact from "./page/Contact"
import DragonDetail from "./page/DragonDetail"

// COMPOSANT : un composant est une fonction qui return du JSX
// on met une majuscule au debut du nom de la fonction composant
//Avec React routeur : Mon app n'est plus une page, mais le point d'entrée de mon application
// C'est le layout : le squelette du site qui sera présent sur toutes les pages
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Dragon />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dragons/:name" element={<DragonDetail />} />
            {/* La gestion 404 page not found, toujours à la fin des route */}
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

// on pense à exporter le composant pour qu'il soit utilisable ailleurs
export default App
