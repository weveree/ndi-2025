import { ALERT_MODELS } from '@/components/main-chalenge/constants';

export default function Credits() {
  return (
    <main id="credits" className="p-6 max-w-4xl mx-auto text-sm space-y-6">
      <h1 className="text-2xl font-bold mb-4">Crédits</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Modèles 3D des alertes</h2>
        <ul className="list-disc ml-6">
          {Object.entries(ALERT_MODELS).map(([key, { author }]) => (
            <li key={key}>
              <span className="font-medium">{key}</span> — modèle par{' '}
              <a href={author.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                {author.name}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Icônes et images</h2>
        <p>
          Les autres icônes et images utilisées dans ce projet proviennent de ressources libres ou fournies par les
          auteurs du projet.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">Projet</h2>
        <p>
          Ce jeu a été réalisé dans le cadre du NDI 2025. Les noms, marques et services mentionnés le sont uniquement à
          des fins pédagogiques.
        </p>
      </section>
    </main>
  );
}
