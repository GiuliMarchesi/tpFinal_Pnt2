<script>
// import { RouterLink, RouterView } from 'vue-router'
import {IonApp, IonRouterOutlet, IonHeader, IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { useShoppingStore } from "../src/stores/shoppingcart";
import { userStore } from './stores/userStore'

export default {
  components: { IonApp, IonRouterOutlet, IonHeader, IonButton},
  setup() {
    const storeShopping = useShoppingStore();
    const { addToCar, getProducts, getLenghtProducts } = storeToRefs(storeShopping);

    const store = userStore();
    const { usuario, estaLogeado, esAdmin } = storeToRefs(store);
    const { logout } = store;

    return { addToCar , getProducts, getLenghtProducts, usuario, estaLogeado, esAdmin, logout};
  },methods: {
    functionLogout(){
      this.logout();
      this.$router.push('/');
    }
  }

}
</script>

<template>
  <ion-app>
    <ion-header>
      <RouterLink to="/">Home  |</RouterLink>
      <RouterLink to="/login" v-if="!estaLogeado">Login  |</RouterLink>
      <RouterLink to="/vehiculos">Vehiculos  |</RouterLink>
      <RouterLink to="/choferes" v-if="estaLogeado && esAdmin">Choferes  |</RouterLink>
      <RouterLink to="/viajes" v-if="estaLogeado" >Viajes  |</RouterLink>
      <RouterLink to="/reportes" v-if="estaLogeado && esAdmin">Reportes  |</RouterLink>
      <!-- <RouterLink to="/shopping">Shopping Cart (Cantidad: {{ getLenghtProducts }})</RouterLink> -->
      Usuario: {{this.usuario.email}}
      <ion-button color="danger" size="small" v-if="estaLogeado" @click="functionLogout()">Logout</ion-button>
    </ion-header>
    <ion-router-outlet />
  </ion-app>
</template>

<style scoped>
</style>
