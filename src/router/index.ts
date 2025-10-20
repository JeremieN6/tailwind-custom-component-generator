import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FocusedBuilderView from '../views/FocusedBuilderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'focused',
      component: FocusedBuilderView,
    },
    {
      path: '/page',
      name: 'page-builder',
      component: () => import('../views/PageBuilderView.vue'),
    },
    {
      path: '/legacy',
      name: 'legacy',
      component: HomeView,
    },
  ],
})

export default router
