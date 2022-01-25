import { createWebHashHistory, createRouter } from 'vue-router'
import { navigationGaurd } from 'utils'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/dashboard.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(navigationGaurd)

export default router
