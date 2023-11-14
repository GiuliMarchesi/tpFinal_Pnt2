import { createRouter, createWebHistory } from '@ionic/vue-router'
import HomeView from '../views/HomeView.vue'
import ReportesView from '../views/ReportesView.vue'
import ViajesView from '../views/Viajes/ViajesView.vue'
import ViajesAddView from '../views/Viajes/ViajesAddView.vue'
import LoginView from '../views/LoginView.vue'
import VehiculosView from '../views/Vehiculos/VehiculosView.vue';
import VehiculosAddView from '../views/Vehiculos/VehiculosAddView.vue';
import ChoferesView from '../views/ChoferesView.vue';
import Swal from 'sweetalert2/dist/sweetalert2';


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
      meta: { RequireAuth: true }
    },
    {
      path: '/viajes/add',
      name: 'Añadir viajes',
      component: ViajesAddView,
      meta: { RequireAuth: true, RequireAdmin: true }
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
      meta: { RequireAuth: true, RequireAdmin: true }
    },
    {
      path: '/choferes',
      name: 'Choferes',
      component: ChoferesView,
      meta: { RequireAuth: true, RequireAdmin: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const usuarioLog = localStorage.getItem('usuario')
  if (to.matched.some(r => r.meta.RequireAuth) && !usuarioLog) {
    Swal.fire({
      toast: true,
      position: 'front',
      showConfirmButton: true,
      timer: 5000,
      timerProgressBar: true,

      icon: 'error',
      title: 'Permiso denegado',
      text: 'Se necesita estar logeado para acceder a esta sección.'
    }).then((result) => {
      if (result.isConfirmed) {
       
        window.location = "login";
       }
  });
    next({
      name: 'login',
      params: { nextUrl: to.fullPath }
    });
  }
  const userRol = JSON.parse(usuarioLog || "{}")?.rol
  if (to.matched.some(r => r.meta.RequireAdmin) && userRol != "admin") {
   
    Swal.fire({
      toast: true,
      position: 'front',
      showConfirmButton: true,
      timer: 5000,
      timerProgressBar: true,

      icon: 'error',
      title: 'Permiso denegado',
      text: 'Se necesita ser administrador para acceder a esta sección.',
     
      
    }).then((result) => {
      if (result.isConfirmed) {
        window.history.back();
       }
  });
    next({
      name: 'login',
      params: { nextUrl: to.fullPath }
    });
  }
  return next()

 
})

export default router
