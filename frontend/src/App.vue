<script>
// import { RouterLink, RouterView } from 'vue-router'
import {IonApp, IonRouterOutlet, IonHeader} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { useShoppingStore } from "../src/stores/shoppingcart";
import { loginStore } from "./stores/userStore";

export default {
  components: { IonApp, IonRouterOutlet, IonHeader},
  setup() {
    const store = useShoppingStore();
    const { addToCar, getProducts, getLenghtProducts } = storeToRefs(store);
    const storeLogin = loginStore();
    const { usuario, estaLogeado } = storeToRefs(storeLogin);
    
    return { addToCar , getProducts, getLenghtProducts,estaLogeado,usuario};
  },

}
</script>

<template>
  <ion-app>
    <ion-header>
      <RouterLink to="/">Home  |</RouterLink>
      <RouterLink v-if="!estaLogeado" to="/login">Login |</RouterLink>
      <RouterLink to="/about">About  |</RouterLink>
      <RouterLink v-if="estaLogeado" to="/system">System  |</RouterLink>
      <RouterLink to="/shopping">Shopping Cart (Cantidad: {{ getLenghtProducts }})</RouterLink> 
      Usuario: {{ this.usuario.email }}
    </ion-header>
    <ion-router-outlet />
  </ion-app>
</template>

<style scoped>
</style>
