<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { componentRegistry } from '../stores/componentRegistry';
import { usePageBuilderStore } from '../stores/pageBuilder';
import { useThemeStore, themeVariablesStyle } from '../stores/theme';
import DynamicEditor from '../components/DynamicEditor.vue';
import PreviewIframe from '../components/PreviewIframe.vue';

const page = usePageBuilderStore();
onMounted(()=> page.load());
const theme = useThemeStore();
onMounted(()=> theme.load());

const registryMap = Object.fromEntries(componentRegistry.map(c=>[c.id, c]));

function addBlock(componentId: string){ page.addBlock(componentId); }
function removeBlock(i:number){ page.removeBlock(i); }
function moveUp(i:number){ page.moveUp(i); }
function moveDown(i:number){ page.moveDown(i); }
function duplicate(i:number){ page.duplicate(i); }

const pageHtml = computed(()=> page.blocks.map(b=>{
  const def = registryMap[b.id];
  return def ? def.build(b.tokens) : '';
}).join('\n'));

const headVars = computed(()=> themeVariablesStyle(theme.tokens));
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-800 dark:bg-gray-950 dark:text-gray-100">
    <div class="border-b border-gray-200 dark:border-gray-800 bg-gray-100/60 dark:bg-gray-900/70 backdrop-blur">
      <div class="max-w-7xl mx-auto px-4 h-12 flex items-center gap-3">
        <div class="flex items-center gap-2">
          <label class="text-xs text-gray-400">Add block</label>
          <select class="text-sm px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" @change="(e:any)=>addBlock(e.target.value)">
            <option value="" selected disabled>Choose…</option>
            <option v-for="c in componentRegistry" :key="c.id" :value="c.id">{{ c.label }}</option>
          </select>
        </div>
        <div class="ml-auto text-xs text-gray-500">MVP Page Builder</div>
      </div>
    </div>

    <div class="flex flex-1 overflow-hidden">
      <!-- Blocks list and editor -->
      <aside class="w-80 border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 p-4 space-y-4 overflow-auto">
        <h2 class="text-xs font-semibold tracking-wide text-gray-400">Blocks</h2>
        <ul class="space-y-2">
          <li v-for="(b,i) in page.blocks" :key="b.key" class="border rounded p-2 dark:border-gray-700 flex items-center justify-between" :class="{ 'ring-2 ring-indigo-500': page.selectedIdx===i }">
            <span class="text-sm">{{ registryMap[b.id]?.label || b.id }}</span>
            <div class="flex items-center gap-1">
              <button class="text-xs px-2 py-1 border rounded" @click="moveUp(i)">↑</button>
              <button class="text-xs px-2 py-1 border rounded" @click="moveDown(i)">↓</button>
              <button class="text-xs px-2 py-1 border rounded" @click="duplicate(i)">⎘</button>
              <button class="text-xs px-2 py-1 border rounded" @click="removeBlock(i)">✕</button>
              <button class="text-xs px-2 py-1 border rounded" @click="page.select(i)">Edit</button>
            </div>
          </li>
        </ul>

        <div v-if="page.selectedIdx>-1" class="mt-4">
          <h3 class="text-xs font-semibold tracking-wide text-gray-400 mb-2">Editor</h3>
          <DynamicEditor :def="registryMap[page.blocks[page.selectedIdx].id]" :modelValue="page.blocks[page.selectedIdx].tokens" @update:modelValue="(v:any)=>page.setTokens(page.selectedIdx, v)" />
        </div>

        <div class="mt-6 border-t pt-4">
          <h3 class="text-xs font-semibold tracking-wide text-gray-400 mb-2">Theme</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">Primary</label>
              <input type="color" class="w-8 h-8 rounded border border-gray-300" :value="theme.tokens.colors.primary" @input="(e:any)=>theme.setColor('primary', e.target.value)" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Secondary</label>
              <input type="color" class="w-8 h-8 rounded border border-gray-300" :value="theme.tokens.colors.secondary" @input="(e:any)=>theme.setColor('secondary', e.target.value)" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Accent</label>
              <input type="color" class="w-8 h-8 rounded border border-gray-300" :value="theme.tokens.colors.accent" @input="(e:any)=>theme.setColor('accent', e.target.value)" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">Radius</label>
              <select class="w-full text-sm px-2 py-1 border rounded" :value="theme.tokens.radii.md" @change="(e:any)=>theme.setRadius('md', e.target.value)">
                <option value="0rem">None</option>
                <option value="0.25rem">sm</option>
                <option value="0.375rem">md</option>
                <option value="0.5rem">lg</option>
                <option value="0.75rem">xl</option>
                <option value="9999px">full</option>
              </select>
            </div>
          </div>
        </div>
      </aside>

      <!-- Preview and aggregate code -->
      <div class="flex-1 overflow-auto">
        <div class="max-w-[1400px] mx-auto p-8">
          <div class="border rounded-xl overflow-hidden" :class="['transition-colors', 'border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800']">
            <PreviewIframe :html="pageHtml" :dark="true" :head-styles="headVars" padding-class="p-10" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
