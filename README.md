# 🧠 Q-Learning Maze – TP React + TypeScript

Ce projet est un **TP pédagogique** sur l’**apprentissage par renforcement**. Un
agent apprend à **sortir d’un labyrinthe** généré aléatoirement, en utilisant
l’algorithme **Q-learning**.

## 🚀 Stack technique

- ⚛️ React + Vite
- 🧠 Zustand pour le store global
- 🎨 TailwindCSS (responsive, min. 320px)
- 🧩 SVG pour la visualisation du labyrinthe
- 🔧 TypeScript pour la robustesse
- 🛠️ Git + Conventional Commits
- ☁️ Déploiement GitHub Pages via GitHub Actions
- 📦 Gestionnaire : `pnpm`

## 📦 Installation

```bash
pnpm install
```

## 🧪 Lancer en local

```bash
pnpm run dev
```

## 🛠️ Scripts utiles

- `pnpm run dev` — démarre le serveur local
- `pnpm run build` — build de production
- `pnpm run preview` — prévisualisation du build

## 🔍 Fonctionnalités principales

- Labyrinthe parfait généré dynamiquement (DFS)
- Taille paramétrable
- Agent avec déplacement haut/bas/gauche/droite
- Apprentissage par Q-learning (ε-greedy)
- Contrôles :
  - Démarrer / Pause
  - Pas à pas
  - Reset labyrinthe
- Affichage dynamique :
  - grille SVG
  - Q-values au clic
  - flèches de politique optimale

## 🚀 Déploiement GitHub Pages

Crée un fichier `.github/workflows/deploy.yml` avec le contenu suivant :

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - run: pnpm install
      - run: pnpm run build
      - uses: actions/configure-pages@v3
      - uses: actions/upload-pages-artifact@v2
        with:
          path: dist
      - uses: actions/deploy-pages@v2
```

Ajoute dans `vite.config.ts` :

```ts
base: "/nom-du-repo/";
```

Et dans `package.json` :

```json
"homepage": "https://ton-utilisateur.github.io/nom-du-repo/"
```

## 🧾 Conventions de commit

Tous les commits doivent respecter la convention :  
**type(scope): message**

Exemples :

- `feat(agent): ajout du Q-learning`
- `fix(ui): résolution d’un bug d’affichage`
- `chore(deploy): ajout du workflow GitHub Pages`

---

## 📜 Licence

Projet open source à vocation pédagogique.
