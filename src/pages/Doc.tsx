export default function Doc() {
  return (
    <div className="prose max-w-screen-md mx-auto p-6 bg-white rounded shadow">
      <h1>Documentation du TP</h1>
      <p>
        Ce TP permet d’explorer l’apprentissage par renforcement via le
        Q-learning dans un labyrinthe généré dynamiquement.
      </p>

      <h2>Fonctionnalités</h2>
      <ul>
        <li>Labyrinthe aléatoire généré selon l’algorithme DFS</li>
        <li>Agent se déplaçant dans 4 directions (haut/bas/gauche/droite)</li>
        <li>Récompenses configurables (départ, murs, sortie)</li>
        <li>Affichage visuel avec flèches et Q-values au clic</li>
        <li>Pas à pas ou apprentissage automatique</li>
      </ul>

      <h2>Utilisation</h2>
      <ol>
        <li>Cliquer sur “Nouveau labyrinthe” pour en générer un nouveau</li>
        <li>Utiliser “Démarrer” ou “Pas à pas” pour lancer l’apprentissage</li>
        <li>Cliquer sur une case pour voir ses Q-values</li>
      </ol>

      <h2>Concepts pédagogiques</h2>
      <p>
        Ce TP illustre l'algorithme de Q-learning, l’exploration/exploitation,
        la convergence des politiques, et la manipulation de récompenses.
      </p>
    </div>
  );
}
