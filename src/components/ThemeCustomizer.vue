<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '../stores/theme'

const theme = useThemeStore()

const fontOptions = [
  { label: 'Inter', value: 'Inter' },
  { label: 'Roboto', value: 'Roboto' },
  { label: 'Open Sans', value: 'Open Sans' },
  { label: 'Poppins', value: 'Poppins' },
]

const radiusOptions = [
  { label: 'sm', value: '0.125rem', key: 'sm' },
  { label: 'md', value: '0.375rem', key: 'md' },
  { label: 'lg', value: '0.5rem', key: 'lg' },
  { label: 'xl', value: '0.75rem', key: 'xl' },
  { label: 'full', value: '9999px', key: 'full' },
]

const colorEntries = computed(() => ([
  ['primary','Primary'],
  ['secondary','Secondary'],
  ['accent','Accent'],
  ['success','Success'],
  ['warning','Warning'],
  ['error','Error'],
  ['info','Info'],
  ['bg','Background'],
  ['surface','Surface'],
  ['surfaceSoft','Surface Soft'],
  ['surfaceSofter','Surface Softer'],
  ['text','Text'],
  ['muted','Muted'],
] as const))

function onColorChange(key: typeof colorEntries.value[number][0], value: string){
  theme.setColor(key as any, value)
}

function onFontChange(which: 'title'|'body', value: string){
  theme.setFont(which, `${value}, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`)
}

function onRadiusChange(which: 'sm'|'md'|'lg'|'xl'|'full', value: string){
  theme.setRadius(which, value)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-6">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Theme Customizer</h2>

    <!-- Colors -->
    <div>
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Colors</h3>
      <div class="grid grid-cols-1 gap-3">
        <div v-for="[key,label] in colorEntries" :key="key">
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{{ label }}</label>
          <div class="flex items-center gap-2">
            <input :value="theme.tokens.colors[key]" @input="(e:any)=>onColorChange(key, e.target.value)" type="color" class="w-8 h-8 rounded border border-gray-300 dark:border-gray-700" />
            <input :value="theme.tokens.colors[key]" @input="(e:any)=>onColorChange(key, e.target.value)" type="text" class="flex-1 px-3 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
          </div>
        </div>
      </div>
    </div>

    <!-- Radii -->
    <div>
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Radii</h3>
      <div class="grid grid-cols-2 gap-3">
        <div v-for="r in radiusOptions" :key="r.key">
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{{ r.label }}</label>
          <select :value="theme.tokens.radii[r.key as keyof typeof theme.tokens.radii]" @change="(e:any)=>onRadiusChange(r.key as any, e.target.value)" class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800">
            <option v-for="opt in radiusOptions" :key="opt.value" :value="opt.value">{{ opt.label }} ({{ opt.value }})</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Fonts -->
    <div>
      <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Fonts</h3>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Title</label>
          <select @change="(e:any)=>onFontChange('title', e.target.value)" class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800">
            <option v-for="f in fontOptions" :key="f.value" :value="f.value" :selected="theme.tokens.fonts.title.includes(f.value)">{{ f.label }}</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Body</label>
          <select @change="(e:any)=>onFontChange('body', e.target.value)" class="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800">
            <option v-for="f in fontOptions" :key="f.value" :value="f.value" :selected="theme.tokens.fonts.body.includes(f.value)">{{ f.label }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Preview Colors -->
    <div class="border-t border-gray-200 dark:border-gray-800 pt-4">
      <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Color Preview</h4>
      <div class="flex flex-wrap gap-2">
        <div v-for="[key,label] in colorEntries" :key="key" class="flex items-center gap-2">
          <div class="w-6 h-6 rounded border border-gray-200 dark:border-gray-700" :style="{ backgroundColor: theme.tokens.colors[key] }"></div>
          <span class="text-xs text-gray-600 dark:text-gray-400">{{ label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
