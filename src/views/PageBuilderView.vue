<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { componentRegistry } from '../stores/componentRegistry';
import { usePageBuilderStore } from '../stores/pageBuilder';
import { useThemeStore, themeVariablesStyle } from '../stores/theme';
import DynamicEditor from '../components/DynamicEditor.vue';
import PreviewIframe from '../components/PreviewIframe.vue';
import ThemeCustomizer from '../components/ThemeCustomizer.vue';
import PageExportModal from '../components/PageExportModal.vue';
import { aggregatePageFrameworks, type AggregatedFrameworks } from '../stores/exportAggregator';
import { generateAngularStandalone } from '../stores/angularStandalone';

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

// Export modal state and handler
import { ref } from 'vue';
const showExport = ref(false);
const exportOutputs = ref<AggregatedFrameworks|null>(null);
const exportAngularStandalone = ref<string|undefined>(undefined);
const exportAngularBaseHtml = ref<string|undefined>(undefined);
function openExport(){
  const blocksHtml = page.blocks.map(b=>{
    const def = registryMap[b.id];
    return def ? def.build(b.tokens) : '';
  });
  const body = blocksHtml.join('\n');
  exportOutputs.value = aggregatePageFrameworks(blocksHtml);
  exportAngularStandalone.value = generateAngularStandalone(body, { selector: 'app-exported-page', componentName: 'ExportedPageComponent' });
  exportAngularBaseHtml.value = body;
  showExport.value = true;
}
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
        <div class="ml-auto flex items-center gap-2">
          <button class="text-xs px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white" @click="openExport">Export page</button>
          <div class="text-xs text-gray-500">MVP Page Builder</div>
        </div>
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
          <ThemeCustomizer />
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
    <PageExportModal :is-open="showExport" :outputs="exportOutputs" :angular-standalone="exportAngularStandalone" :angular-base-html="exportAngularBaseHtml" @close="showExport=false" />
  </div>
</template>

<style scoped>
</style>
