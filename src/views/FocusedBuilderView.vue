<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useComponentCustomizerStore } from '../stores/componentCustomizer';
import DynamicEditor from '../components/DynamicEditor.vue';

const store = useComponentCustomizerStore();
const { registry, componentId, currentDef, html, frameworks } = storeToRefs(store);

const codeTab = ref<'vue'|'react'|'svelte'|'angular'|'html'>('vue');
const showEditor = ref(true);
const copied = ref(false);
const darkMode = ref(true);
const previewDark = ref(true); // thème isolé pour la zone preview
function togglePreviewTheme(){ previewDark.value = !previewDark.value; }

onMounted(()=>{
  const stored = localStorage.getItem('tbuilder:dark');
  if(stored!==null) darkMode.value = stored === '1';
});

watchEffect(()=>{
  const root = document.documentElement;
  if(darkMode.value) root.classList.add('dark'); else root.classList.remove('dark');
  localStorage.setItem('tbuilder:dark', darkMode.value ? '1':'0');
});

function copyCode(){
  navigator.clipboard.writeText(frameworks.value[codeTab.value]);
  copied.value = true; setTimeout(()=>copied.value=false,1500);
}
function toggleDark(){ darkMode.value = !darkMode.value; }
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-800 dark:bg-gray-950 dark:text-gray-100 transition-colors">
  <!-- Top Toolbar -->
  <div class="border-b border-gray-200 dark:border-gray-800 bg-gray-100/70 dark:bg-gray-900/90 backdrop-blur supports-[backdrop-filter]:bg-gray-100/50 dark:supports-[backdrop-filter]:bg-gray-900/70 transition-colors">
      <div class="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        <div class="flex items-center gap-2">
          <label class="text-xs text-gray-400">Component</label>
          <select v-model="componentId" @change="store.select(componentId)" class="bg-gray-800 text-sm px-3 py-1.5 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option v-for="c in registry" :key="c.id" :value="c.id">{{ c.label }}</option>
          </select>
        </div>
        <button @click="showEditor = !showEditor" class="text-xs px-3 py-1.5 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition">{{ showEditor ? 'Hide' : 'Show' }} Settings</button>
        <div class="ml-auto flex items-center gap-2">
          <select v-model="codeTab" class="bg-white dark:bg-gray-800 text-sm px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700">
            <option value="vue">Vue</option>
            <option value="react">React</option>
            <option value="svelte">Svelte</option>
            <option value="angular">Angular</option>
            <option value="html">HTML</option>
          </select>
          <button @click="copyCode" class="text-xs px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 font-medium text-white">{{ copied ? 'Copied!' : 'Copy Code' }}</button>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Editor Sidebar -->
  <aside v-if="showEditor" class="w-72 border-r border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/50 overflow-y-auto p-5 space-y-6 backdrop-blur-sm transition-colors">
        <div>
          <h2 class="text-xs font-semibold tracking-wide text-gray-400 mb-3">Settings</h2>
          <div class="space-y-2 mb-4">
            <button @click="toggleDark" class="w-full text-xs px-3 py-2 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition flex items-center justify-between">
              <span class="flex items-center gap-1">
                <span v-if="darkMode">🌙</span>
                <span v-else>☀️</span>
                <span>{{ darkMode ? 'Dark UI' : 'Light UI' }}</span>
              </span>
              <span class="text-[10px] uppercase tracking-wide opacity-60">Global</span>
            </button>
            <button @click="togglePreviewTheme" class="w-full text-xs px-3 py-2 rounded border border-indigo-300 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-800/40 transition flex items-center justify-between">
              <span class="flex items-center gap-1">
                <span v-if="previewDark">🌓</span>
                <span v-else>🌗</span>
                <span>Preview {{ previewDark ? 'Dark' : 'Light' }}</span>
              </span>
              <span class="text-[10px] uppercase tracking-wide opacity-60">Isolé</span>
            </button>
          </div>
          <DynamicEditor />
        </div>
      </aside>

      <!-- Preview + Code -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <div class="flex-1 overflow-auto">
          <div class="max-w-[1400px] mx-auto p-8">
            <div :class="['border rounded-xl relative transition-colors group/preview', previewDark ? 'dark border-gray-800 bg-gray-950' : 'border-gray-200 bg-white preview-light']">
              <div class="absolute top-3 left-3 text-[11px] px-2 py-0.5 bg-gray-200/70 dark:bg-gray-800/70 rounded text-gray-500 dark:text-gray-400">Preview</div>
              <div class="p-10 preview-content" v-html="html"></div>
            </div>
          </div>
        </div>
  <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80 transition-colors">
          <div class="max-w-[1400px] mx-auto px-6 py-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xs font-semibold tracking-wide text-gray-400">Code ({{ codeTab.toUpperCase() }})</h3>
              <div class="flex items-center gap-2">
                <button @click="copyCode" class="text-[11px] px-2 py-1 border border-gray-700 rounded hover:bg-gray-800">{{ copied? 'Copied!' : 'Copy' }}</button>
              </div>
            </div>
            <pre class="text-[12px] leading-relaxed overflow-auto max-h-72 bg-gray-100 dark:bg-gray-950 border border-gray-300 dark:border-gray-800 rounded-lg p-4 text-gray-800 dark:text-gray-100 shadow-inner transition-colors"><code>{{ frameworks[codeTab] }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* (temp) Pas de overrides forcés; on conserve le markup tailwind pour la lisibilité. */
</style>
