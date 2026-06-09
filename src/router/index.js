import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GiftsView from '../views/GiftsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/gifts',
    name: 'gifts',
    component: GiftsView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
