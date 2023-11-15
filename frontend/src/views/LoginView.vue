<script>
import {IonPage,IonContent,IonInput,IonButton} from '@ionic/vue'
import { storeToRefs } from "pinia";
import { userStore } from "../stores/userStore"
import Swal from 'sweetalert2/dist/sweetalert2';

export default {
  components: {IonPage,IonContent,IonInput,IonButton},
  setup() {
    const store = userStore();
    const { estaLogeado } = storeToRefs(store);
    const { login } = store;
    return { login, estaLogeado };
  },
  data() {
    return {
      user: {}
    }
  },
  methods: {
    async loginForm() {
      // si mock api -> hardcodear
      const user = await this.login(this.user);
      console.log(this.estaLogeado);
      if(this.estaLogeado) {
        this.$router.push("/");
        Swal.fire({
      toast: true,
      position: 'front',
      showConfirmButton: true,
      timer: 5000,
      timerProgressBar: true,

      icon: 'success',
      title: 'Login exitoso',
      text: 'Te has loggeado exitosamente'
    })
      } else {

        Swal.fire({
      toast: true,
      position: 'front',
      showConfirmButton: true,
      timer: 5000,
      timerProgressBar: true,

      icon: 'error',
      title: 'Permiso denegado',
      text: 'El usuario o contraseñas son incorrectos',
     
      
    }).then((result) => {
      if (result.isConfirmed) {
     
        window.location = "login";
       }
  });
        // redirigir a otra pagina
      }
    }
  }
}
</script>

<template>
  <ion-page>
    <ion-content>
      <h2>Login</h2>
      <ion-input v-model="user.email" label="Email" type="email"></ion-input>
      <ion-input v-model="user.password" label="Password" type="password"></ion-input>
      <ion-button @click="loginForm">Login</ion-button>
    </ion-content>
  </ion-page>
</template>

<style>
</style>