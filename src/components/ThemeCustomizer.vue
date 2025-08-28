<script setup lang="ts">
import { ref, watch } from 'vue'

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
  theme: Theme
}

interface Emits {
  (e: 'theme-change', theme: Partial<Theme>): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const localTheme = ref({ ...props.theme })

watch(localTheme, (newTheme) => {
  emit('theme-change', newTheme)
}, { deep: true })

const fontOptions = [
  { label: 'Inter', value: 'Inter' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Open Sans', value: 'Open Sans' },
  { label: 'Poppins', value: 'Poppins' },
]

const spacingOptions = [
  { label: 'Compact', value: 'compact' },
  { label: 'Normal', value: 'normal' },
  { label: 'Spacious', value: 'spacious' },
]
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-6">Theme Customizer</h2>
    
    <!-- Colors -->
    <div class="space-y-4 mb-6">
      <h3 class="text-sm font-medium text-gray-700">Colors</h3>
      
      <div class="space-y-3">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Primary Color</label>
          <div class="flex items-center space-x-2">
            <input 
              v-model="localTheme.colors.primary"
              type="color" 
              class="w-8 h-8 rounded border border-gray-300"
            />
            <input 
              v-model="localTheme.colors.primary"
              type="text" 
              class="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Secondary Color</label>
          <div class="flex items-center space-x-2">
            <input 
              v-model="localTheme.colors.secondary"
              type="color" 
              class="w-8 h-8 rounded border border-gray-300"
            />
            <input 
              v-model="localTheme.colors.secondary"
              type="text" 
              class="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Accent Color</label>
          <div class="flex items-center space-x-2">
            <input 
              v-model="localTheme.colors.accent"
              type="color" 
              class="w-8 h-8 rounded border border-gray-300"
            />
            <input 
              v-model="localTheme.colors.accent"
              type="text" 
              class="flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Border Radius -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Border Radius</label>
      <input 
        v-model="localTheme.borderRadius"
        type="range" 
        min="0" 
        max="2" 
        step="0.125"
        class="w-full"
      />
      <div class="flex justify-between text-xs text-gray-500 mt-1">
        <span>0rem</span>
        <span>{{ localTheme.borderRadius }}rem</span>
        <span>2rem</span>
      </div>
    </div>

    <!-- Font Family -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
      <select 
        v-model="localTheme.fontFamily"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option v-for="font in fontOptions" :key="font.value" :value="font.value">
          {{ font.label }}
        </option>
      </select>
    </div>

    <!-- Spacing -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">Spacing</label>
      <div class="space-y-2">
        <label v-for="spacing in spacingOptions" :key="spacing.value" class="flex items-center">
          <input 
            v-model="localTheme.spacing"
            :value="spacing.value"
            type="radio" 
            class="mr-2 text-blue-600"
          />
          <span class="text-sm text-gray-700">{{ spacing.label }}</span>
        </label>
      </div>
    </div>

    <!-- Preview Colors -->
    <div class="border-t pt-4">
      <h4 class="text-sm font-medium text-gray-700 mb-3">Color Preview</h4>
      <div class="flex space-x-2">
        <div 
          class="w-8 h-8 rounded"
          :style="{ backgroundColor: localTheme.colors.primary }"
          :title="`Primary: ${localTheme.colors.primary}`"
        ></div>
        <div 
          class="w-8 h-8 rounded"
          :style="{ backgroundColor: localTheme.colors.secondary }"
          :title="`Secondary: ${localTheme.colors.secondary}`"
        ></div>
        <div 
          class="w-8 h-8 rounded"
          :style="{ backgroundColor: localTheme.colors.accent }"
          :title="`Accent: ${localTheme.colors.accent}`"
        ></div>
      </div>
    </div>
  </div>
</template>
