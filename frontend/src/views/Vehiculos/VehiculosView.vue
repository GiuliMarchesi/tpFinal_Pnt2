<script>
import { IonPage, IonContent } from "@ionic/vue";
import { userStore } from "../../stores/userStore";

import { storeToRefs } from "pinia";
import { vehiculoStore } from "../../stores/vehiculoStore";

export default {
  components: { IonPage, IonContent },
  setup() {
    const store2 = vehiculoStore();
    const { getVehiculos } = storeToRefs(store2);
    const { fetchVehiculos } = store2;
    const store = userStore();
    const { esAdmin, estaLogeado } = storeToRefs(store);
    return { esAdmin, estaLogeado, fetchVehiculos, getVehiculos };
  },
  methods: {
    puedeVerAdd() {
      return this.esAdmin.valueOf() && this.estaLogeado.valueOf();
    },
  },
  async mounted() {
    await this.fetchVehiculos();
  },
};
</script>

<template>
  <ion-page>
    <ion-content>
      <h2>Flota de vehiculos</h2>
      <RouterLink v-if="puedeVerAdd()" to="/vehiculos/add"
        >Añadir vehiculo</RouterLink
      >
      <p v-for="auto in getVehiculos" :key="auto.gid">
        {{ auto.nombre }}
      </p>
    </ion-content>
  </ion-page>
</template>

<style></style>
