# Spécification Technique – Projet TP RL : Agent dans un labyrinthe (Q-learning)

## 🎯 Objectifs pédagogiques

- Comprendre le fonctionnement du Q-learning
- Visualiser l’apprentissage d’un agent dans un labyrinthe
- Offrir une interface interactive et pédagogique
- Permettre l’exploration pas à pas ou automatique

---

## 🧱 Stack Technique

- **Framework** : React
- **Langage** : TypeScript
- **CSS** : TailwindCSS
- **Gestionnaire de paquets** : pnpm
- **Architecture d’état** : Zustand (store global)
- **Visualisation du labyrinthe** : SVG
- **Affichage réactif** : Totalement responsive jusqu’à 320px de largeur

---

## ⚙️ Fonctionnalités principales

- Labyrinthe généré aléatoirement via un algorithme de génération de labyrinthe
  parfait (ex : DFS)
- Taille du labyrinthe paramétrable
- Interface d’apprentissage déclenchable :
  - par bouton “Démarrer l’apprentissage”
  - ou en mode pas à pas
- Récompenses personnalisables avec valeurs par défaut :
  - +100 pour la sortie
  - -1 par pas
  - -10 contre un mur
- Affichage de la Q-table :
  - flèches directionnelles dans chaque case
  - clic pour voir toutes les Q-values
- Stratégie d’exploration configurable :
  - ε (epsilon) modifiable
  - décroissance possible
- Déplacement animé de l’agent avec tracé du chemin parcouru
- Interface de réglages avancés masquée par défaut (α, γ, ε, etc.)

---

## 📐 Structure du projet

- `App.tsx` – composant principal
- `components/` :
  - `Maze.tsx` – grille SVG interactive
  - `Agent.tsx` – affichage de l’agent
  - `Controls.tsx` – boutons et sliders
  - `QValuePopup.tsx` – Q-values au clic
- `store/` :
  - `useMazeStore.ts` – état global (position, grille, Q-table)
- `utils/` :
  - `mazeGenerator.ts` – génération de labyrinthe
  - `qLearning.ts` – logique de mise à jour de Q
  - `helpers.ts` – fonctions auxiliaires

---

## 🧪 Déploiement et gestion de projet

- Déploiement sur **GitHub Pages**
- Script automatisé via **GitHub Actions**
- Projet hébergé dans un **repository GitHub**
- Gestion des commits en respectant les **Conventional Commits**
- Pas de persistance : chaque session redémarre à zéro

---

## 🧾 Extensions possibles

- Mode édition du labyrinthe à la main
- Export / import de la Q-table en JSON
- Replay de trajectoire optimisée
- Mode multijoueur ou multi-agents

---

## 📏 Contraintes techniques

- L’ensemble de l’interface doit être utilisable sur un écran de **320px de
  largeur minimum**
- Le code sera **modulaire, typé**, et documenté
