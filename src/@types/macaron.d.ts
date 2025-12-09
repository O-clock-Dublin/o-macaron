// bonne pratique les interface réutilisables sont definies dans un fichier .d.ts (definition de type) dan sun dossier '@types' et on pourra l'importer partout ou on en a besoin

interface IMacaron {
  id: number;
  flavour: string;
  color: string;
}

export default IMacaron;
