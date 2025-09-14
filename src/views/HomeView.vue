<script setup lang="ts">
// LEGACY VIEW - preserved for reference; new focused experience at '/'
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
  colors: { primary: '#3b82f6', secondary: '#64748b', accent: '#f59e0b' },
  borderRadius: '0.5rem',
  fontFamily: 'Inter',
  spacing: 'normal'
})
function onComponentSelect(component: any) { selectedComponent.value = component }
function onThemeChange(theme: any) { currentTheme.value = { ...currentTheme.value, ...theme } }
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">Legacy Tailwind Builder</h1>
        <router-link to="/" class="text-sm text-blue-600 hover:underline">Go to Focused Builder →</router-link>
      </div>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 xl:grid-cols-4 gap-6">
      <!-- Theme Customizer -->
      <ThemeCustomizer :theme="currentTheme" @theme-change="onThemeChange" />

      <!-- Component Catalog + Preview (legacy components) -->
      <ComponentCatalog class="xl:col-span-1" @component-select="onComponentSelect" />
      <ComponentPreview class="xl:col-span-2" :component="selectedComponent" :theme="currentTheme" />
    </div>
  </div>
</template>
