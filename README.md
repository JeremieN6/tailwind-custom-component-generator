# .

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# Tailwind Builder

## Hero Live Customizer (Nouveau)

Un éditeur visuel pour construire une section Hero unique :

Fonctionnalités clés :
- Édition en direct du texte (titre, sous-titre, labels boutons)
- Choix alignement (centre / gauche) et largeur max
- Bouton secondaire optionnel
- Couleurs primaires / secondaires + dégradé personnalisable
- Style de fond: gradient / solid / image
- Choix arrondis et famille de police
- Export instantané multi-framework (Vue, React, Svelte, Angular, HTML brut)
- Copie en un clic du code actuellement sélectionné

### Génération de code
La génération se fait via `src/stores/heroTemplate.ts` qui fournit:
- `buildHeroHtml(tokens)` pour interpoler les tokens
- `generateFrameworkWrappers(html, tokens)` pour produire les variations framework

### Ajouter un nouveau framework
1. Ouvrir `heroTemplate.ts`
2. Étendre l'interface `MultiFrameworkCode`
3. Ajouter la transformation dans `generateFrameworkWrappers`
4. Ajouter l'option dans le sélecteur `exportTab` (HomeView)

### Tests
Des tests basiques valident l'interpolation et les wrappers: `heroTemplate.spec.ts`.

### Prochaines idées
- Tokens typographiques additionnels (taille titre responsive personnalisable)
- Slots / toggles pour image produit ou capture d'écran
- Palette intelligente générée depuis une couleur de base
- Export natif Angular (Component decorator complet) & Svelte props

## Mode Focalisé (Focused Builder)
La route `/` charge désormais `FocusedBuilderView.vue` : une interface unifiée avec barre supérieure, panneau de paramètres (optionnel) et large prévisualisation.

Caractéristiques:
- Sélecteur de composant (Hero, CTA, Pricing, Features, FAQ, Testimonials)
- Formulaire dynamique généré depuis `componentRegistry.ts`
- Mise à jour live HTML + export multi-framework
- Panneau code en bas avec onglets

## Registry
`componentRegistry.ts` centralise:
- defaults (tokens)
- metadata des champs (type, label, options, conditions)
- fonction `build(tokens)` qui retourne le HTML Tailwind

Pour ajouter un composant:
1. Ajouter defaults + interface des tokens
2. Ajouter buildXHtml
3. Pousser l'objet dans `componentRegistry`
4. (Optionnel) tests dans `registry.spec.ts`
