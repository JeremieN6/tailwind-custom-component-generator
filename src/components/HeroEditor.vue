<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useHeroCustomizerStore } from '../stores/heroCustomizer';

const store = useHeroCustomizerStore();
const { tokens, html, frameworks } = storeToRefs(store);

function update<K extends keyof typeof tokens.value>(key: K, value: any) {
  store.update({ [key]: value } as any);
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-semibold text-gray-900">Hero Editor</h2>
      <button @click="store.reset" class="text-xs px-2 py-1 border rounded hover:bg-gray-50">Reset</button>
    </div>

    <!-- Content Inputs -->
    <div class="space-y-4 mb-6">
      <div>
        <label class="block text-xs font-medium text-gray-600 mb-1">Title</label>
        <input v-model="tokens.title" type="text" class="w-full px-3 py-2 text-sm border rounded" />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-600 mb-1">Subtitle</label>
        <textarea v-model="tokens.subtitle" rows="2" class="w-full px-3 py-2 text-sm border rounded"></textarea>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Primary Button Label</label>
            <input v-model="tokens.primaryButtonLabel" type="text" class="w-full px-3 py-2 text-sm border rounded" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Secondary Button Label</label>
            <input v-model="tokens.secondaryButtonLabel" :disabled="!tokens.showSecondary" type="text" class="w-full px-3 py-2 text-sm border rounded disabled:opacity-50" />
        </div>
      </div>
      <label class="inline-flex items-center space-x-2 text-xs">
        <input type="checkbox" v-model="tokens.showSecondary" />
        <span>Show Secondary Button</span>
      </label>
    </div>

    <!-- Layout & Style -->
    <div class="space-y-4 mb-6">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Alignment</label>
          <select v-model="tokens.align" class="w-full px-3 py-2 text-sm border rounded">
            <option value="center">Center</option>
            <option value="left">Left</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Max Width</label>
          <select v-model="tokens.maxWidth" class="w-full px-3 py-2 text-sm border rounded">
            <option value="max-w-2xl">Medium</option>
            <option value="max-w-3xl">Large</option>
            <option value="max-w-4xl">XL</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Primary Color</label>
          <input v-model="tokens.primaryColor" type="color" class="w-full h-9 border rounded" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Secondary Color</label>
          <input v-model="tokens.secondaryColor" type="color" class="w-full h-9 border rounded" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Font Family</label>
          <select v-model="tokens.fontFamily" class="w-full px-2 py-2 text-sm border rounded">
            <option>Inter</option>
            <option>Poppins</option>
            <option>Roboto</option>
            <option>Open Sans</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Gradient From</label>
          <input v-model="tokens.gradientFrom" type="color" class="w-full h-9 border rounded" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Gradient To</label>
          <input v-model="tokens.gradientTo" type="color" class="w-full h-9 border rounded" />
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 mb-1">Rounded</label>
          <select v-model="tokens.rounded" class="w-full px-2 py-2 text-sm border rounded">
            <option value="rounded-none">None</option>
            <option value="rounded">Default</option>
            <option value="rounded-md">md</option>
            <option value="rounded-lg">lg</option>
            <option value="rounded-xl">xl</option>
            <option value="rounded-full">Full</option>
          </select>
        </div>
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-600 mb-1">Background Style</label>
        <div class="flex gap-3">
          <label class="text-xs inline-flex items-center space-x-1"><input type="radio" value="gradient" v-model="tokens.backgroundStyle" /> <span>Gradient</span></label>
          <label class="text-xs inline-flex items-center space-x-1"><input type="radio" value="solid" v-model="tokens.backgroundStyle" /> <span>Solid</span></label>
          <label class="text-xs inline-flex items-center space-x-1"><input type="radio" value="image" v-model="tokens.backgroundStyle" /> <span>Image</span></label>
        </div>
      </div>
    </div>

    <details class="mb-4">
      <summary class="text-xs font-semibold cursor-pointer">Show Raw HTML</summary>
      <pre class="mt-2 bg-gray-900 text-gray-100 p-3 rounded text-[10px] overflow-auto"><code>{{ html }}</code></pre>
    </details>
  </div>
</template>
