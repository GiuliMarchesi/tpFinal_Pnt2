<script>
import { IonPage } from "@ionic/vue";
import { loginStore } from "../../stores/userStore";
import { storeToRefs } from "pinia";

export default {
  components: { IonPage },
  setup() {
    const store1 = loginStore();
    const { esAdmin } = storeToRefs(store1);

    return { esAdmin };
  },
};
</script>

<template>
  <ion-page>
    <h2>Flota de vehiculos</h2>
    <a v-if="esAdmin" href="/vehiculos/add">Añadir nuevo vehiculo</a>
  </ion-page>
</template>

<style></style>
