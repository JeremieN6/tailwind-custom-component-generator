<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { AggregatedFrameworks } from '../stores/exportAggregator'

interface Props {
  isOpen: boolean
  outputs: AggregatedFrameworks | null
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const tab = ref<'vue'|'react'|'svelte'|'angular'|'html'>('vue')

watch(() => props.isOpen, (open)=>{
  if(open){ tab.value = 'vue' }
})

const code = computed(()=>{
  if(!props.outputs) return '// Nothing to export'
  return props.outputs[tab.value]
})

function copy(){
  if(!props.outputs) return
  navigator.clipboard.writeText(code.value)
}

function close(){ emit('close') }
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
          <div class="ml-auto">
            <button @click="copy" class="px-3 py-1.5 text-xs rounded bg-blue-600 hover:bg-blue-500 text-white">Copy</button>
          </div>
        </div>
      </div>

      <div class="p-5 pt-3">
        <pre class="bg-gray-950 text-gray-100 text-[12px] leading-relaxed p-4 rounded-lg overflow-auto max-h-[60vh] border border-gray-800"><code>{{ code }}</code></pre>
      </div>
    </div>
  </div>
  
</template>

<style scoped>
</style>
