<script setup lang="ts">
import { computed, ref } from 'vue'
import SimpleExport from './SimpleExport.vue'

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
  component: Component | null
  theme: Theme
}

const props = defineProps<Props>()

const isExportModalOpen = ref(false)

const themeStyles = computed(() => {
  const spacing = props.theme.spacing === 'compact' ? '0.75' : 
                  props.theme.spacing === 'spacious' ? '1.5' : '1'
  
  return {
    '--primary-color': props.theme.colors.primary,
    '--secondary-color': props.theme.colors.secondary,
    '--accent-color': props.theme.colors.accent,
    '--border-radius': props.theme.borderRadius,
    '--font-family': props.theme.fontFamily,
    '--spacing-multiplier': spacing
  }
})

function openExportModal() {
  isExportModalOpen.value = true
}

function closeExportModal() {
  isExportModalOpen.value = false
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border">
    <!-- Header -->
    <div class="px-6 py-4 border-b">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">
            {{ component?.name || 'Component Preview' }}
          </h2>
          <p v-if="component" class="text-sm text-gray-500">
            {{ component.description }}
          </p>
        </div>
        
        <div v-if="component" class="flex items-center space-x-2">
          <select class="px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500">
            <option value="desktop">Desktop</option>
            <option value="tablet">Tablet</option>
            <option value="mobile">Mobile</option>
          </select>
          
          <button
            @click="openExportModal"
            class="px-4 py-2 text-sm bg-blue-600 text-white border border-blue-600 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Export Code
          </button>
        </div>
      </div>
    </div>

    <!-- Preview Area -->
    <div class="p-6">
      <div v-if="!component" class="text-center py-12">
        <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Select a Component</h3>
        <p class="text-gray-500">Choose a component from the catalog to see the preview</p>
      </div>

      <!-- Component Preview -->
      <div v-else class="border rounded-lg overflow-hidden" :style="themeStyles">
        <!-- Hero Component -->
        <div v-if="component.preview === 'hero'" class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-8 text-center">
          <h1 class="text-4xl font-bold mb-4" :style="{ fontFamily: theme.fontFamily }">
            Build Amazing Products
          </h1>
          <p class="text-xl mb-8 opacity-90">
            Create beautiful, responsive components with our visual editor
          </p>
          <button 
            class="px-8 py-3 text-lg font-semibold rounded-lg transition-colors"
            :style="{ 
              backgroundColor: theme.colors.accent, 
              borderRadius: theme.borderRadius,
              fontFamily: theme.fontFamily
            }"
          >
            Get Started
          </button>
        </div>

        <!-- CTA Component -->
        <div v-else-if="component.preview === 'cta'" class="py-16 px-8 text-center bg-gray-50">
          <h2 class="text-3xl font-bold text-gray-900 mb-4" :style="{ fontFamily: theme.fontFamily }">
            Ready to get started?
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            Join thousands of developers building better products
          </p>
          <button 
            class="px-8 py-3 text-white font-semibold rounded-lg transition-colors hover:opacity-90"
            :style="{ 
              backgroundColor: theme.colors.primary, 
              borderRadius: theme.borderRadius,
              fontFamily: theme.fontFamily
            }"
          >
            Start Building
          </button>
        </div>

        <!-- Pricing Component -->
        <div v-else-if="component.preview === 'pricing'" class="py-16 px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4" :style="{ fontFamily: theme.fontFamily }">
              Simple Pricing
            </h2>
            <p class="text-lg text-gray-600">Choose the plan that's right for you</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div class="border rounded-lg p-6 text-center" :style="{ borderRadius: theme.borderRadius }">
              <h3 class="text-xl font-semibold mb-4" :style="{ fontFamily: theme.fontFamily }">Starter</h3>
              <div class="text-3xl font-bold mb-4" :style="{ color: theme.colors.secondary }">$39</div>
              <button 
                class="w-full py-2 border rounded-lg transition-colors"
                :style="{ 
                  borderColor: theme.colors.primary,
                  color: theme.colors.primary,
                  borderRadius: theme.borderRadius,
                  fontFamily: theme.fontFamily
                }"
              >
                Choose Plan
              </button>
            </div>
            
            <div 
              class="border-2 rounded-lg p-6 text-center relative"
              :style="{ 
                borderColor: theme.colors.primary,
                borderRadius: theme.borderRadius
              }"
            >
              <div 
                class="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 text-sm font-medium text-white rounded-full"
                :style="{ backgroundColor: theme.colors.primary }"
              >
                Popular
              </div>
              <h3 class="text-xl font-semibold mb-4" :style="{ fontFamily: theme.fontFamily }">Pro</h3>
              <div class="text-3xl font-bold mb-4" :style="{ color: theme.colors.primary }">$99</div>
              <button 
                class="w-full py-2 text-white rounded-lg transition-colors"
                :style="{ 
                  backgroundColor: theme.colors.primary,
                  borderRadius: theme.borderRadius,
                  fontFamily: theme.fontFamily
                }"
              >
                Choose Plan
              </button>
            </div>
            
            <div class="border rounded-lg p-6 text-center" :style="{ borderRadius: theme.borderRadius }">
              <h3 class="text-xl font-semibold mb-4" :style="{ fontFamily: theme.fontFamily }">Enterprise</h3>
              <div class="text-3xl font-bold mb-4" :style="{ color: theme.colors.secondary }">$199</div>
              <button 
                class="w-full py-2 border rounded-lg transition-colors"
                :style="{ 
                  borderColor: theme.colors.primary,
                  color: theme.colors.primary,
                  borderRadius: theme.borderRadius,
                  fontFamily: theme.fontFamily
                }"
              >
                Choose Plan
              </button>
            </div>
          </div>
        </div>

        <!-- Features Component -->
        <div v-else-if="component.preview === 'features'" class="py-16 px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4" :style="{ fontFamily: theme.fontFamily }">
              Powerful Features
            </h2>
            <p class="text-lg text-gray-600">Everything you need to build amazing products</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div class="text-center">
              <div 
                class="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center"
                :style="{ backgroundColor: theme.colors.primary + '20' }"
              >
                <div 
                  class="w-6 h-6 rounded"
                  :style="{ backgroundColor: theme.colors.primary }"
                ></div>
              </div>
              <h3 class="text-xl font-semibold mb-2" :style="{ fontFamily: theme.fontFamily }">Fast</h3>
              <p class="text-gray-600">Lightning fast performance</p>
            </div>
            
            <div class="text-center">
              <div 
                class="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center"
                :style="{ backgroundColor: theme.colors.accent + '20' }"
              >
                <div 
                  class="w-6 h-6 rounded"
                  :style="{ backgroundColor: theme.colors.accent }"
                ></div>
              </div>
              <h3 class="text-xl font-semibold mb-2" :style="{ fontFamily: theme.fontFamily }">Secure</h3>
              <p class="text-gray-600">Enterprise-grade security</p>
            </div>
            
            <div class="text-center">
              <div 
                class="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center"
                :style="{ backgroundColor: theme.colors.secondary + '20' }"
              >
                <div 
                  class="w-6 h-6 rounded"
                  :style="{ backgroundColor: theme.colors.secondary }"
                ></div>
              </div>
              <h3 class="text-xl font-semibold mb-2" :style="{ fontFamily: theme.fontFamily }">Scalable</h3>
              <p class="text-gray-600">Grows with your business</p>
            </div>
          </div>
        </div>

        <!-- FAQ Component -->
        <div v-else-if="component.preview === 'faq'" class="py-16 px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4" :style="{ fontFamily: theme.fontFamily }">
              Frequently Asked Questions
            </h2>
            <p class="text-lg text-gray-600">Get answers to common questions</p>
          </div>
          
          <div class="max-w-3xl mx-auto space-y-4">
            <div 
              class="border rounded-lg p-4"
              :style="{ borderRadius: theme.borderRadius }"
            >
              <div class="flex justify-between items-center">
                <h3 class="font-semibold" :style="{ fontFamily: theme.fontFamily }">
                  How does it work?
                </h3>
                <div 
                  class="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                  :style="{ backgroundColor: theme.colors.primary }"
                >
                  +
                </div>
              </div>
            </div>
            
            <div 
              class="border rounded-lg p-4"
              :style="{ borderRadius: theme.borderRadius }"
            >
              <div class="flex justify-between items-center">
                <h3 class="font-semibold" :style="{ fontFamily: theme.fontFamily }">
                  Is it customizable?
                </h3>
                <div 
                  class="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                  :style="{ backgroundColor: theme.colors.primary }"
                >
                  +
                </div>
              </div>
            </div>
            
            <div 
              class="border rounded-lg p-4"
              :style="{ borderRadius: theme.borderRadius }"
            >
              <div class="flex justify-between items-center">
                <h3 class="font-semibold" :style="{ fontFamily: theme.fontFamily }">
                  What frameworks are supported?
                </h3>
                <div 
                  class="w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                  :style="{ backgroundColor: theme.colors.primary }"
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Testimonials Component -->
        <div v-else-if="component.preview === 'testimonials'" class="py-16 px-8 bg-gray-50">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-4" :style="{ fontFamily: theme.fontFamily }">
              What Our Customers Say
            </h2>
            <p class="text-lg text-gray-600">Trusted by developers worldwide</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div 
              class="bg-white p-6 rounded-lg shadow-sm"
              :style="{ borderRadius: theme.borderRadius }"
            >
              <div class="flex mb-4">
                <div 
                  v-for="i in 5" 
                  :key="i"
                  class="w-4 h-4 rounded-sm mr-1"
                  :style="{ backgroundColor: theme.colors.accent }"
                ></div>
              </div>
              <p class="text-gray-600 mb-4">"Amazing tool for rapid prototyping!"</p>
              <div class="flex items-center">
                <div 
                  class="w-10 h-10 rounded-full mr-3"
                  :style="{ backgroundColor: theme.colors.primary }"
                ></div>
                <div>
                  <div class="font-semibold" :style="{ fontFamily: theme.fontFamily }">John Doe</div>
                  <div class="text-sm text-gray-500">Developer</div>
                </div>
              </div>
            </div>
            
            <div 
              class="bg-white p-6 rounded-lg shadow-sm"
              :style="{ borderRadius: theme.borderRadius }"
            >
              <div class="flex mb-4">
                <div 
                  v-for="i in 5" 
                  :key="i"
                  class="w-4 h-4 rounded-sm mr-1"
                  :style="{ backgroundColor: theme.colors.accent }"
                ></div>
              </div>
              <p class="text-gray-600 mb-4">"Saves me hours of development time."</p>
              <div class="flex items-center">
                <div 
                  class="w-10 h-10 rounded-full mr-3"
                  :style="{ backgroundColor: theme.colors.secondary }"
                ></div>
                <div>
                  <div class="font-semibold" :style="{ fontFamily: theme.fontFamily }">Jane Smith</div>
                  <div class="text-sm text-gray-500">Designer</div>
                </div>
              </div>
            </div>
            
            <div 
              class="bg-white p-6 rounded-lg shadow-sm"
              :style="{ borderRadius: theme.borderRadius }"
            >
              <div class="flex mb-4">
                <div 
                  v-for="i in 5" 
                  :key="i"
                  class="w-4 h-4 rounded-sm mr-1"
                  :style="{ backgroundColor: theme.colors.accent }"
                ></div>
              </div>
              <p class="text-gray-600 mb-4">"Perfect for our design system."</p>
              <div class="flex items-center">
                <div 
                  class="w-10 h-10 rounded-full mr-3"
                  :style="{ backgroundColor: theme.colors.accent }"
                ></div>
                <div>
                  <div class="font-semibold" :style="{ fontFamily: theme.fontFamily }">Mike Johnson</div>
                  <div class="text-sm text-gray-500">Product Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Export Modal -->
    <SimpleExport
      :is-open="isExportModalOpen"
      :component="props.component"
      :theme="props.theme"
      @close="closeExportModal"
    />
  </div>
</template>
