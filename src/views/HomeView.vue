<script setup lang="ts">
import { ref } from 'vue'
import ThemeCustomizer from '../components/ThemeCustomizer.vue'
import ComponentCatalog from '../components/ComponentCatalog.vue'
import ComponentPreview from '../components/ComponentPreview.vue'

const selectedComponent = ref({
  id: 'hero-1',
  name: 'Hero Section',
  category: 'Hero',
  description: 'Clean hero section with CTA',
  preview: 'hero'
})
const currentTheme = ref({
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b',
    accent: '#f59e0b',
  },
  borderRadius: '0.5rem',
  fontFamily: 'Inter',
  spacing: 'normal'
})

function onComponentSelect(component: any) {
  selectedComponent.value = component
}

function onThemeChange(theme: any) {
  currentTheme.value = { ...currentTheme.value, ...theme }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Tailwind Builder</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Export Components
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <!-- Theme Customizer -->
        <div class="xl:col-span-1 order-1 xl:order-1">
          <ThemeCustomizer
            :theme="currentTheme"
            @theme-change="onThemeChange"
          />
        </div>

        <!-- Component Catalog -->
        <div class="xl:col-span-1 order-2 xl:order-2">
          <ComponentCatalog
            @component-select="onComponentSelect"
          />
        </div>

        <!-- Component Preview -->
        <div class="xl:col-span-2 order-3 xl:order-3">
          <ComponentPreview
            :component="selectedComponent"
            :theme="currentTheme"
          />
        </div>
      </div>
    </div>
  </div>
</template>
