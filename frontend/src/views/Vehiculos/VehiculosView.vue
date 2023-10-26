<script>

import { IonPage } from "@ionic/vue";
import { userStore } from "../../stores/userStore";

import { storeToRefs } from "pinia";

export default {
  components: { IonPage, IonContent },
  setup() {

    const store = userStore();
    const { esAdmin, estaLogeado } = storeToRefs(store);

    return { esAdmin, estaLogeado };

  },
  methods: {
    puedeVerAdd() {
      return this.esAdmin.valueOf() && this.estaLogeado.valueOf();
    },
  },
};
</script>

<template>
  <ion-page>
    <ion-content>
      <h2>Flota de vehiculos</h2>
      <RouterLink v-if="puedeVerAdd()" to="/vehiculos/add">Añadir vehiculo</RouterLink>
    </ion-content>
  </ion-page>
</template>

<style></style>
