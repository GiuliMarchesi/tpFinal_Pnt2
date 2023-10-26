import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomeView from '../views/HomeView.vue'
import SystemView from '../views/SystemView.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import LoginView from '../views/LoginView.vue'
import VehiculosView from '../views/Vehiculos/VehiculosView.vue';
import VehiculosAddView from '../views/Vehiculos/VehiculosAddView.vue';
import ChoferesView from '../views/ChoferesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/system',
      name: 'systemview',
      component: SystemView,
      meta: { RequireAuth: true }
    },
    {
      path: '/login',
      name: 'loginview',
      component: LoginView
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: ShoppingCart
    },
    {
      path: '/vehiculos',
      name: 'Vehiculos',
      component: VehiculosView
    },
    {
      path: '/vehiculos/add',
      name: 'Añadir Vehiculos',
      component: VehiculosAddView,
      meta: { RequireAdmin: true }
    },
    {
      path: '/choferes',
      name: 'Choferes',
      component: ChoferesView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const usuarioLog = localStorage.getItem('usuario')
  if (to.matched.some(r => r.meta.RequireAuth) && !usuarioLog) {
    next('/')
  }
  if(usuarioLog){
    const userRol = JSON.parse(usuarioLog).rol
    if (to.matched.some(r => r.meta.RequireAdmin) && userRol != "admin") {
      next('/')
    }
  }
  next()
})

export default router
