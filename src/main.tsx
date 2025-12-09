import ReactDOM from 'react-dom/client';

// notre composant principal APp est defini dan sun autre fichier on l'importe pour le filer à "render" (pas besoin d'ajouter les extension car notre super bundler n'en a pas besoin)
import App from './App';

// on ajoute le fichier SCSS à notre projet avec un import que notre bundler peut comprendre
import './styles.scss';

// la variable rootNode ets de type HTMLElement OU null
const rootNode = document.getElementById('root');

// createRoot attend un element qui ne soit pas null donc on utilise la non null assertion (!) pour dire à TS t'inquiete c'est pas null
const rootReactReceptacle = ReactDOM.createRoot(rootNode!);

// on fait le render du JSX renvoyé par le composant App
// rootReactReceptacle.render(App());
rootReactReceptacle.render(<App />);
