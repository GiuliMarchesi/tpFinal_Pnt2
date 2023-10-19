<script>
//import {IonPage,IonContent, IonInput, IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { loginStore } from "../stores/userStore";

export default {
  //components: {IonPage, IonContent, IonInput, IonButton},
  setup() {
    const store = loginStore();
    const { estaLogeado } = storeToRefs(store);
    const { login } = store;
    return { login, estaLogeado };
  },
  data(){
    return{
        user: {}
    }
  },
  methods: {
    async loginForm(){
        
        await this.login(this.user)
        if (this.estaLogeado){
            this.$router.push("/system")
        }else{
        } 
    }
  }
}
</script>

<template>
  <h2>Login</h2>
  <input v-model="user.email" label="email" type="email">
  <input v-model="user.password" label="password" type="password">
  <button @click="loginForm">Login</button>
    
</template>

<style>
</style>