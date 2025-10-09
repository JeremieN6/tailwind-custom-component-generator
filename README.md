# Tailwind Component Builder

Un outil de prototypage visuel pour composer et exporter des sections UI construites avec Tailwind CSS.

## Résumé

Cette application permet de créer des sections (Hero, CTA, Pricing, Features, FAQ, Testimonials, etc.) via un éditeur visuel. Elle génère du HTML Tailwind prêt à l'emploi et propose des wrappers exportables pour plusieurs frameworks (Vue, React, Svelte, Angular) ainsi que du HTML brut.

## Pourquoi cet outil a été développé

Le but est de réduire le temps nécessaire pour prototyper des sections UI réutilisables :
- Permettre aux designers/développeurs de composer visuellement des composants Tailwind.
- Garantir l'isolation du rendu (mode sombre/clair et polices) pour reproduire fidèlement l'apparence lors d'une exportation.
- Produire du code prêt à intégrer dans différents frameworks sans écrire manuellement la structure complète.
- Garantir des composants de style différents tout en utilisant toujours tailwind. (Via modification de font, de taille, de couleurs etc.)

## Principales fonctionnalités

- Éditeur visuel en temps réel avec panneau de paramètres.
- Composants paramétrables : Hero, CTA, Pricing, Features, FAQ, Testimonials, Blog cards, Navbar, Footer, Media+Text, etc.
- Choix de la police, couleurs, arrondis, images de fond et autres tokens visuels.
- Preview isolée dans un iframe pour éviter les fuites de thème (dark/light) et de styles.
- Export multi-framework (Vue, React, Svelte, Angular, HTML) et copie en un clic.
- Génération de HTML via un registry centralisé (`src/stores/componentRegistry.ts`).

## Stack technique

- Framework : Vue 3 (script setup, composition API)
- Bundler / Dev server : Vite
- Styling : Tailwind CSS
- State : Pinia
- Tests : Vitest
- Langage : TypeScript

## Récupérer le projet

Ouvre un terminal PowerShell et exécute :

```powershell
# cloner le repo
git clone <REPO_URL>
cd tailwind-component-generator

# installer les dépendances
npm install
```

Remplace `<REPO_URL>` par l'URL du dépôt GitHub.

## Lancer en développement

```powershell
npm run dev
```

Puis ouvrir `http://localhost:5173` (ou l'URL indiquée par Vite).

## Scripts utiles

- `npm run dev`       - Démarrer le serveur de développement
- `npm run build`     - Compiler pour la production (minification)
- `npm run preview`   - Lancer un serveur local pour tester le build de production
- `npm run test:unit` - Exécuter les tests unitaires (Vitest)
- `npm run lint`      - Exécuter ESLint

## Structure importante

- `src/views/FocusedBuilderView.vue` : l'interface principale (toolbar, panneau de paramètres, preview, zone code)
- `src/components/PreviewIframe.vue` : encapsule la preview dans un iframe et charge les polices/styles nécessaires
- `src/components/DynamicEditor.vue` : formulaire dynamique généré depuis la registry
- `src/stores/componentRegistry.ts` : registry centralisant tokens, métadonnées des champs et fonctions `build(tokens)` pour chaque composant
- `src/stores/componentCustomizer.ts` : état Pinia pour les tokens et le HTML généré

## Comment ajouter un nouveau composant

1. Ajouter une interface `XxxTokens` et des valeurs par défaut dans `componentRegistry.ts`.
2. Implémenter `buildXxxHtml(tokens: XxxTokens)` qui retourne le HTML Tailwind de la section.
3. Enregistrer le composant dans la registry avec son formulaire de tokens (labels, types, options).
4. (Optionnel) Ajouter des tests dans `src/components/__tests__`.

## Bonnes pratiques et notes

- Les polices utilisées dans la preview sont chargées explicitement dans l'iframe (voir `PreviewIframe.vue`) pour éviter les problèmes de fallback lors de l'export.
- Les classes Tailwind sont rendues via le CSS principal copié/cloné dans l'iframe pour conserver la même apparence qu'en production.
- Les tokens (couleurs, polices, arrondis) sont pensés pour produire du HTML autonome, facile à copier/coller dans un projet existant.

## Dépannage rapide

- Si la preview affiche des styles bizarres après modification : relancer Vite ou vider le cache du navigateur.
- Si une police ne s'applique pas en production : vérifier que la famille est chargée dans le HTML exporté ou que la règle @import Google Fonts est incluse.
- Problèmes TypeScript : installer correctement les dépendances et utiliser `vue-tsc` pour la vérification.

## Contribuer

PRs bienvenus : ajouter des composants, corriger des bugs, améliorer l'UX mobile.

## Licence

MIT © [Nom: jeremien6 - Email: contact@jeremiecode.fr]


Développé avec ❤️ par Jeremiecode Corp. - Site: jeremiecode.fr