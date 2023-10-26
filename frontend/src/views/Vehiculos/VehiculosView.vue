<script>
import { IonPage } from "@ionic/vue";
import { userStore } from "../../stores/userStore";
import { storeToRefs } from "pinia";

export default {
  components: { IonPage },
  setup() {
    const store = userStore();
    const { esAdmin } = storeToRefs(store);

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
