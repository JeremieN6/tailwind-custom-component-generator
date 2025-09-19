import { defineStore } from 'pinia';
import { componentRegistry, generateFrameworks } from './componentRegistry';
import type { ComponentDefinition } from './componentRegistry';
import { ref, computed } from 'vue';

export const useComponentCustomizerStore = defineStore('componentCustomizer', () => {
  const registry = ref(componentRegistry);
  const componentId = ref(registry.value[0].id);
  const tokens = ref<any>({ ...registry.value[0].defaults });

  const currentDef = computed<ComponentDefinition>(() => registry.value.find(c=>c.id===componentId.value)!);

  const html = computed(()=> currentDef.value.build(tokens.value));
  const frameworks = computed(()=> generateFrameworks(html.value));

  function select(id: string) {
    const def = registry.value.find(c=>c.id===id);
    if(!def) return;
    componentId.value = id;
    tokens.value = { ...def.defaults };
  }

  function update(partial: Record<string, any>) {
    tokens.value = { ...tokens.value, ...partial };
  }

  function updateField(key: string, value: any) {
    tokens.value = { ...tokens.value, [key]: value };
  }

  return { registry, componentId, tokens, currentDef, html, frameworks, select, update, updateField };
});
