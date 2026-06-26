# DigitalPro Systems IT — Site Web Officiel

Site web institutionnel de **DigitalPro Systems IT**, intégrateur de solutions IT et de sécurité électronique basé à Casablanca, Maroc.

## Stack technique

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — bundler et serveur de développement
- [Tailwind CSS](https://tailwindcss.com/) — styles utilitaires
- [shadcn/ui](https://ui.shadcn.com/) — composants UI accessibles
- [Framer Motion](https://www.framer.com/motion/) — animations
- [React Router v6](https://reactrouter.com/) — routing
- [Zod](https://zod.dev/) — validation des formulaires
- [Web3Forms](https://web3forms.com/) — envoi des formulaires sans backend

## Installation & lancement

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build
npm run preview
```

## Variables d'environnement

Créer un fichier `.env` à la racine (voir `.env.example`) :

```env
VITE_WEB3FORMS_KEY=votre_cle_web3forms
```

## Structure du projet

```
src/
├── components/       # Composants réutilisables (Navbar, Footer, Hero…)
├── pages/            # Pages (Accueil, Services, À propos, Blog, Contact)
├── hooks/            # Hooks personnalisés
├── lib/              # Utilitaires
└── assets/           # Images et ressources statiques
```

## Pages

| Route | Page |
|---|---|
| `/` | Accueil |
| `/services` | Services |
| `/a-propos` | À propos |
| `/blog` | Blog |
| `/contact` | Contact |

## Contact

**DigitalPro Systems IT**
82, Angle Rue Soumaya et BD Abdelmoumen, Résidence Shéhérazade 1, 3ème étage N°13, Palmier, Casablanca
📞 06 63 46 31 89
✉️ contact@dps-it.ma




