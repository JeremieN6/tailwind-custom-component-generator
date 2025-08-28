<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Component {
  id: string
  name: string
  category: string
  description: string
  preview: string
}

interface Emits {
  (e: 'component-select', component: Component): void
}

const emit = defineEmits<Emits>()

const selectedComponentId = ref<string | null>(null)

const components: Component[] = [
  {
    id: 'hero-1',
    name: 'Hero Section',
    category: 'Hero',
    description: 'Clean hero section with CTA',
    preview: 'hero'
  },
  {
    id: 'cta-1',
    name: 'Call to Action',
    category: 'CTA',
    description: 'Simple CTA button',
    preview: 'cta'
  },
  {
    id: 'pricing-1',
    name: 'Pricing Table',
    category: 'Pricing',
    description: '3-tier pricing table',
    preview: 'pricing'
  },
  {
    id: 'features-1',
    name: 'Feature Grid',
    category: 'Features',
    description: '3-column feature grid',
    preview: 'features'
  },
  {
    id: 'faq-1',
    name: 'FAQ Accordion',
    category: 'FAQ',
    description: 'Expandable FAQ section',
    preview: 'faq'
  },
  {
    id: 'testimonials-1',
    name: 'Testimonials',
    category: 'Testimonials',
    description: 'Customer testimonials grid',
    preview: 'testimonials'
  }
]

const categories = [...new Set(components.map(c => c.category))]

function selectComponent(component: Component) {
  selectedComponentId.value = component.id
  emit('component-select', component)
}

onMounted(() => {
  // Auto-select the first component
  if (components.length > 0) {
    selectComponent(components[0])
  }
})
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border p-6">
    <h2 class="text-lg font-semibold text-gray-900 mb-6">Component Catalog</h2>
    
    <div class="space-y-6">
      <div v-for="category in categories" :key="category">
        <h3 class="text-sm font-medium text-gray-700 mb-3">{{ category }}</h3>
        
        <div class="space-y-2">
          <div 
            v-for="component in components.filter(c => c.category === category)" 
            :key="component.id"
            @click="selectComponent(component)"
            class="p-3 border rounded-lg cursor-pointer transition-all hover:border-blue-300 hover:bg-blue-50"
            :class="{
              'border-blue-500 bg-blue-50': selectedComponentId === component.id,
              'border-gray-200': selectedComponentId !== component.id
            }"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h4 class="text-sm font-medium text-gray-900">{{ component.name }}</h4>
                <p class="text-xs text-gray-500 mt-1">{{ component.description }}</p>
              </div>
              
              <!-- Mini preview icon -->
              <div class="ml-2 flex-shrink-0">
                <div class="w-8 h-6 bg-gray-100 rounded border flex items-center justify-center">
                  <div 
                    v-if="component.preview === 'hero'"
                    class="w-6 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-sm"
                  ></div>
                  <div 
                    v-else-if="component.preview === 'cta'"
                    class="w-4 h-2 bg-blue-500 rounded-sm"
                  ></div>
                  <div 
                    v-else-if="component.preview === 'pricing'"
                    class="flex space-x-0.5"
                  >
                    <div class="w-1 h-3 bg-gray-400 rounded-sm"></div>
                    <div class="w-1 h-4 bg-blue-500 rounded-sm"></div>
                    <div class="w-1 h-3 bg-gray-400 rounded-sm"></div>
                  </div>
                  <div 
                    v-else-if="component.preview === 'features'"
                    class="grid grid-cols-2 gap-0.5"
                  >
                    <div class="w-1 h-1 bg-blue-400 rounded-sm"></div>
                    <div class="w-1 h-1 bg-blue-400 rounded-sm"></div>
                    <div class="w-1 h-1 bg-blue-400 rounded-sm"></div>
                    <div class="w-1 h-1 bg-blue-400 rounded-sm"></div>
                  </div>
                  <div 
                    v-else-if="component.preview === 'faq'"
                    class="space-y-0.5"
                  >
                    <div class="w-5 h-0.5 bg-gray-400 rounded-sm"></div>
                    <div class="w-5 h-0.5 bg-gray-400 rounded-sm"></div>
                    <div class="w-5 h-0.5 bg-gray-400 rounded-sm"></div>
                  </div>
                  <div 
                    v-else-if="component.preview === 'testimonials'"
                    class="flex space-x-0.5"
                  >
                    <div class="w-1 h-3 bg-yellow-400 rounded-sm"></div>
                    <div class="w-1 h-3 bg-yellow-400 rounded-sm"></div>
                    <div class="w-1 h-3 bg-yellow-400 rounded-sm"></div>
                  </div>
                  <div 
                    v-else
                    class="w-4 h-3 bg-gray-300 rounded-sm"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="mt-6 pt-4 border-t">
      <p class="text-xs text-gray-500">
        Select a component to preview and customize
      </p>
    </div>
  </div>
</template>
