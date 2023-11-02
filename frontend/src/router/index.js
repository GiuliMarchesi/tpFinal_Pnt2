import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomeView from '../views/HomeView.vue'
import ReportesView from '../views/ReportesView.vue'
import ViajesView from '../views/ViajesView.vue'
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
      path: '/reportes',
      name: 'reportesview',
      component: ReportesView,
      meta: { RequireAuth: true, RequireAdmin: true }
    },
    {
      path: '/login',
      name: 'loginview',
      component: LoginView
    },
    {
      path: '/viajes',
      name: 'Viajes',
      component: ViajesView,
      meta: { RequireAuth: true}
    },
    {
      path: '/vehiculos',
      name: 'Vehiculos',
      component: VehiculosView,
      meta: { RequireAuth: true }
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
      component: ChoferesView,
      meta: {  RequireAdmin: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const usuarioLog = localStorage.getItem('usuario')
  if (to.matched.some(r => r.meta.RequireAuth) && !usuarioLog) {
    next('/')
  }
  const userRol = JSON.parse(usuarioLog || "{}")?.rol
  if (to.matched.some(r => r.meta.RequireAdmin) && userRol != "admin") {
    next('/')
  }
  next()
})

export default router
