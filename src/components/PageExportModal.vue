<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { AggregatedFrameworks } from '../stores/exportAggregator'
import { generateAngularStandalone } from '../stores/angularStandalone'

interface Props {
  isOpen: boolean
  outputs: AggregatedFrameworks | null
  angularStandalone?: string | null
  angularBaseHtml?: string | null
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

type Tabs = 'vue'|'react'|'svelte'|'angular'|'html'|'angular-standalone'
const tab = ref<Tabs>('vue')
const ngSelector = ref('app-exported-page')
const ngComponentName = ref('ExportedPageComponent')

watch(() => props.isOpen, (open)=>{
  if(open){ tab.value = 'vue' }
})

const code = computed(()=>{
  if(tab.value === 'angular-standalone'){
    if(props.angularBaseHtml){
      return generateAngularStandalone(props.angularBaseHtml, { selector: ngSelector.value, componentName: ngComponentName.value })
    }
    return props.angularStandalone || '// Generate the page first to get Angular Standalone output'
  }
  if(!props.outputs) return '// Nothing to export'
  return props.outputs[tab.value]
})

function copy(){
  navigator.clipboard.writeText(code.value)
}

function close(){ emit('close') }

function download(){
  const blob = new Blob([code.value], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const name = tab.value==='angular-standalone' ? `${ngComponentName.value}.ts` : `export-${tab.value}.txt`
  a.download = name
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[1000] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/50" @click="close" />
    <div class="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-gray-200 dark:border-gray-800">
      <div class="px-5 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <h2 class="text-base font-semibold">Export Page</h2>
        <button @click="close" class="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800" aria-label="Close">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="px-5 pt-4">
        <div class="flex items-center gap-2">
          <button @click="tab='vue'" :class="['px-3 py-1.5 text-xs rounded border', tab==='vue' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 dark:border-gray-700']">Vue</button>
          <button @click="tab='react'" :class="['px-3 py-1.5 text-xs rounded border', tab==='react' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 dark:border-gray-700']">React</button>
          <button @click="tab='svelte'" :class="['px-3 py-1.5 text-xs rounded border', tab==='svelte' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 dark:border-gray-700']">Svelte</button>
          <button @click="tab='angular'" :class="['px-3 py-1.5 text-xs rounded border', tab==='angular' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 dark:border-gray-700']">Angular</button>
          <button @click="tab='html'" :class="['px-3 py-1.5 text-xs rounded border', tab==='html' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 dark:border-gray-700']">HTML</button>
          <button @click="tab='angular-standalone'" :class="['px-3 py-1.5 text-xs rounded border', tab==='angular-standalone' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 dark:border-gray-700']">Angular Standalone</button>
          <div class="ml-auto">
            <button @click="copy" class="px-3 py-1.5 text-xs rounded bg-blue-600 hover:bg-blue-500 text-white">Copy</button>
            <button v-if="tab==='angular-standalone'" @click="download" class="ml-2 px-3 py-1.5 text-xs rounded bg-emerald-600 hover:bg-emerald-500 text-white">Download .ts</button>
          </div>
        </div>
      </div>

      <div class="p-5 pt-3 space-y-3">
        <div v-if="tab==='angular-standalone'" class="flex items-center gap-3">
          <label class="text-xs text-gray-500">Selector</label>
          <input v-model="ngSelector" type="text" class="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
          <label class="text-xs text-gray-500">Component</label>
          <input v-model="ngComponentName" type="text" class="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800" />
        </div>
        <pre class="bg-gray-950 text-gray-100 text-[12px] leading-relaxed p-4 rounded-lg overflow-auto max-h-[60vh] border border-gray-800"><code>{{ code }}</code></pre>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
</style>
