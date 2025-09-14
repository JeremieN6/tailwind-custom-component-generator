<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useComponentCustomizerStore } from '../stores/componentCustomizer';

const store = useComponentCustomizerStore();
const { currentDef, tokens } = storeToRefs(store);

function onInput(fieldKey: string, val: any) {
  store.updateField(fieldKey, val);
}
</script>

<template>
  <div class="space-y-6">
    <div v-for="field in currentDef.fields" :key="field.key" v-show="!field.condition || field.condition(tokens)">
      <label class="block text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-1">{{ field.label }}</label>
      <input
        v-if="field.type==='text'"
        :value="tokens[field.key]"
        type="text"
        class="w-full px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 dark:border-gray-600 bg-white dark:bg-surface-softer text-gray-900 dark:text-gray-100 placeholder-gray-400"
        @input="onInput(field.key, ($event.target as HTMLInputElement).value)"
      />
      <textarea
        v-else-if="field.type==='textarea'"
        :value="tokens[field.key]"
        rows="2"
        class="w-full px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300 dark:border-gray-600 bg-white dark:bg-surface-softer text-gray-900 dark:text-gray-100 placeholder-gray-400"
        @input="onInput(field.key, ($event.target as HTMLTextAreaElement).value)"
      />
      <input
        v-else-if="field.type==='color'"
        :value="tokens[field.key]"
        type="color"
        class="w-16 h-10 border rounded cursor-pointer border-gray-300 dark:border-gray-600 bg-white dark:bg-surface-soft"
        @input="onInput(field.key, ($event.target as HTMLInputElement).value)"
      />
      <label v-else-if="field.type==='boolean'" class="inline-flex items-center space-x-2 text-sm">
        <input type="checkbox" :checked="tokens[field.key]" @change="onInput(field.key, ($event.target as HTMLInputElement).checked)" />
        <span>{{ field.label }}</span>
      </label>
  <select v-else-if="field.type==='select'" :value="tokens[field.key]" class="w-full px-3 py-2 text-sm rounded focus:outline-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-surface-softer text-gray-900 dark:text-gray-100" @change="onInput(field.key, ($event.target as HTMLSelectElement).value)">
        <option v-for="opt in field.options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
    </div>
  </div>
</template>
