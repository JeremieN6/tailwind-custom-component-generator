import { defineStore } from 'pinia';
import { defaultHeroTokens, buildHeroHtml, generateFrameworkWrappers } from './heroTemplate';
import type { HeroTokens, MultiFrameworkCode } from './heroTemplate';
import { ref, computed } from 'vue';

export const useHeroCustomizerStore = defineStore('heroCustomizer', () => {
  const tokens = ref<HeroTokens>({ ...defaultHeroTokens });
  const html = computed(() => buildHeroHtml(tokens.value));
  const frameworks = computed<MultiFrameworkCode>(() => generateFrameworkWrappers(html.value, tokens.value));

  function update(partial: Partial<HeroTokens>) {
    tokens.value = { ...tokens.value, ...partial };
  }

  function reset() {
    tokens.value = { ...defaultHeroTokens };
  }

  return { tokens, html, frameworks, update, reset };
});
