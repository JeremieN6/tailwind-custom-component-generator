<script setup lang="ts">
import { ref, computed } from 'vue'

interface Component {
  id: string
  name: string
  category: string
  description: string
  preview: string
}

interface Theme {
  colors: {
    primary: string
    secondary: string
    accent: string
  }
  borderRadius: string
  fontFamily: string
  spacing: string
}

interface Props {
  isOpen: boolean
  component: Component | null
  theme: Theme
}

interface Emits {
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedFormat = ref('html')

const formats = [
  { value: 'html', label: 'HTML + CSS', icon: '🌐' },
  { value: 'react', label: 'React JSX', icon: '⚛️' },
  { value: 'vue', label: 'Vue SFC', icon: '💚' },
  { value: 'svelte', label: 'Svelte', icon: '🧡' }
]

const generatedCode = computed(() => {
  if (!props.component) return 'No component selected'
  
  return `<!-- ${props.component.name} - ${selectedFormat.value.toUpperCase()} -->
<div class="p-8" style="font-family: ${props.theme.fontFamily}">
  <h2 style="color: ${props.theme.colors.primary}" class="text-2xl font-bold mb-4">
    ${props.component.name}
  </h2>
  <p class="text-gray-600">${props.component.description}</p>
</div>`
})

function copyToClipboard() {
  navigator.clipboard.writeText(generatedCode.value)
  alert('Code copied to clipboard!')
}

function close() {
  emit('close')
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
      <div class="px-6 py-4 border-b flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-900">Export Component</h2>
        <button @click="close" class="text-gray-400 hover:text-gray-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">Export Format</label>
          <div class="grid grid-cols-4 gap-3">
            <label 
              v-for="format in formats" 
              :key="format.value"
              class="flex items-center p-3 border rounded-lg cursor-pointer"
              :class="{
                'border-blue-500 bg-blue-50': selectedFormat === format.value,
                'border-gray-200': selectedFormat !== format.value
              }"
            >
              <input 
                v-model="selectedFormat" 
                :value="format.value" 
                type="radio" 
                class="sr-only"
              />
              <span class="text-lg mr-2">{{ format.icon }}</span>
              <span class="text-sm font-medium">{{ format.label }}</span>
            </label>
          </div>
        </div>

        <div class="mb-6">
          <div class="flex items-center justify-between mb-3">
            <label class="block text-sm font-medium text-gray-700">Generated Code</label>
            <button 
              @click="copyToClipboard"
              class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Copy Code
            </button>
          </div>
          <pre class="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"><code>{{ generatedCode }}</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>
