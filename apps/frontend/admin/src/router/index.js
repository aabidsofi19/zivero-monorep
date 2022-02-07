import { createWebHashHistory, createRouter } from 'vue-router'
import { navigationGaurd } from 'utils'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/dashboard.vue'),
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/Products.vue'),

    children: [
      {
        path: '',
        name: 'products-all',
        component: () => import('../views/ProductsAll.vue'),
      },
      {
        path: 'create',
        name: 'products-create',
        component: () => import('../views/ProductsCreate.vue'),
      },
      {
        path: ':id',
        name: 'product-edit',
        component: () => import('../views/ProductEdit.vue'),
      },
    ],
  },

  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/Orders.vue'),

    children: [{ path: '', name: 'orders-all', component: () => import('../views/OrdersAll.vue') }],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(navigationGaurd)

export default router
