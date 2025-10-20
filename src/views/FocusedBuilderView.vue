<script setup lang="ts">
import { ref, watchEffect, onMounted, onUnmounted, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useComponentCustomizerStore } from '../stores/componentCustomizer';
import DynamicEditor from '../components/DynamicEditor.vue';
import PreviewIframe from '../components/PreviewIframe.vue';

const store = useComponentCustomizerStore();
const { registry, componentId, currentDef, html, frameworks } = storeToRefs(store);

const codeTab = ref<'vue'|'react'|'svelte'|'angular'|'html'>('vue');
const showEditor = ref(true);
const copied = ref(false);
const darkMode = ref(true);
const previewDark = ref(true); // thème isolé pour la zone preview
function togglePreviewTheme(){ previewDark.value = !previewDark.value; }

// Responsive helper: track small screens to toggle slide-over behaviour
const isMobile = ref(false);
function updateIsMobile(){ isMobile.value = window.innerWidth < 768; }
onMounted(()=>{
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);
});
onUnmounted(()=>{
  window.removeEventListener('resize', updateIsMobile);
});

// Custom dropdown state for component selector
const showComponentMenu = ref(false);
// small screen language menu
const showLangMenu = ref(false);
const langOptions = [
  { value: 'vue', label: 'Vue', short: 'VUE' },
  { value: 'react', label: 'React', short: 'RE' },
  { value: 'svelte', label: 'Svelte', short: 'SV' },
  { value: 'angular', label: 'Angular', short: 'NG' },
  { value: 'html', label: 'HTML', short: 'HTML' }
];
const currentLangLabel = computed(()=>{
  const found = langOptions.find(l=>l.value===codeTab.value);
  return found ? found.label : (codeTab.value as string);
});
function chooseLang(v: string){ codeTab.value = v as 'vue'|'react'|'svelte'|'angular'|'html'; showLangMenu.value = false; }
const currentComponentLabel = computed(()=> registry.value.find(c=>c.id===componentId.value)?.label || 'Select Component');
function chooseComponent(id: string){
  componentId.value = id; store.select(id); showComponentMenu.value = false;
}

onMounted(()=>{
  const stored = localStorage.getItem('tbuilder:dark');
  if(stored!==null) darkMode.value = stored === '1';
  // hide editor by default on small screens
  updateIsMobile();
  if(isMobile.value) showEditor.value = false;
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
  <div class="border-b border-gray-200 dark:border-gray-800 bg-gray-100/70 dark:bg-gray-900/90 backdrop-blur supports-[backdrop-filter]:bg-gray-100/50 dark:supports-[backdrop-filter]:bg-gray-900/70 transition-colors relative z-50">
  <div class="max-w-7xl mx-auto px-4 h-12 sm:h-14 flex items-center gap-4">
        <div class="flex items-center gap-2 relative">
          <label class="text-xs text-gray-400">Component</label>
          <button @click="showComponentMenu=!showComponentMenu" class="text-sm px-3 py-1.5 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 border-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 flex items-center gap-2">
            <span>{{ currentComponentLabel }}</span>
            <span class="opacity-60">▾</span>
          </button>
          <div v-if="showComponentMenu" class="absolute top-full mt-1 left-14 z-[100] w-56 max-h-64 overflow-auto rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
            <ul>
              <li v-for="c in registry" :key="c.id">
                <button @click="chooseComponent(c.id)" class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100">{{ c.label }}</button>
              </li>
            </ul>
          </div>
        </div>
        <button @click="showEditor = !showEditor" class="text-xs px-3 py-1.5 rounded border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition">{{ showEditor ? 'Hide' : 'Show' }} Settings</button>
        <div class="ml-auto flex items-center gap-3">
          <router-link to="/page" class="hidden sm:inline-flex text-xs px-2 py-1.5 rounded border border-indigo-300 text-indigo-700 dark:border-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30">Open Page Builder →</router-link>
          <!-- full select for md+ screens -->
          <select v-model="codeTab" class="hidden sm:inline-flex bg-white dark:bg-gray-800 text-sm px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700">
            <option value="vue">Vue</option>
            <option value="react">React</option>
            <option value="svelte">Svelte</option>
            <option value="angular">Angular</option>
            <option value="html">HTML</option>
          </select>
          <!-- compact mobile picker -->
          <div class="relative inline-block sm:hidden">
            <button @click="showLangMenu = !showLangMenu" class="inline-flex items-center px-2 py-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm">
              <span class="font-medium">{{ currentLangLabel }}</span>
              <svg class="ml-2 h-3 w-3 opacity-60" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 3 4-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            </button>
            <div v-if="showLangMenu" class="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
              <ul>
                <li v-for="opt in langOptions" :key="opt.value">
                  <button @click="chooseLang(opt.value)" class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">{{ opt.label }}</button>
                </li>
              </ul>
            </div>
          </div>
          <button @click="copyCode" class="hidden sm:inline-flex text-xs px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 font-medium text-white">{{ copied ? 'Copied!' : 'Copy Code' }}</button>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
  <div class="flex flex-1 overflow-hidden relative z-0">
      <!-- Mobile overlay when sidebar open -->
      <div v-if="isMobile && showEditor" @click="showEditor=false" class="fixed inset-0 bg-black/40 z-30 md:hidden"></div>
      <!-- Editor Sidebar: slide-over on mobile, static on md+ -->
  <aside v-show="showEditor" :class="[
      'border-r border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/50 overflow-y-auto p-5 space-y-6 backdrop-blur-sm transition-transform duration-200 ease-out z-40',
      isMobile ? 'fixed top-0 left-0 h-full w-4/5 max-w-xs shadow-lg' : 'w-72 relative'
    ]">
        <div>
          <div class="flex items-center justify-between mb-4 md:hidden">
            <h2 class="text-sm font-semibold">Settings</h2>
            <button @click="showEditor=false" class="text-sm px-2 py-1 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">Close</button>
          </div>
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
            <div :class="['border rounded-xl overflow-hidden relative transition-colors', previewDark ? 'border-gray-800 bg-gray-950' : 'border-gray-200 bg-white']" style="z-index:1">
              <div class="absolute top-3 left-3 z-10 text-[11px] px-2 py-0.5 bg-gray-200/70 dark:bg-gray-800/70 rounded text-gray-500 dark:text-gray-400">Preview</div>
              <PreviewIframe :html="html" :dark="previewDark" padding-class="p-10" />
            </div>
          </div>
        </div>
  <div class="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/80 transition-colors relative z-50 md:z-auto">
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
