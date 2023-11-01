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
      <ion-card>
    <ion-card-header>
      <ion-card-title>Card Title</ion-card-title>
      <ion-card-subtitle>Card Subtitle</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <ion-list>
        <ion-item v-for="auto in getVehiculos" :key="auto.gid">
          <ion-thumbnail slot="start">
            <img alt="Autito" :src=auto.foto />
          </ion-thumbnail>
          <ion-label>{{ auto.nombre }}</ion-label>
        </ion-item> 
      </ion-list>
    </ion-card-content>
  </ion-card>
    </ion-content>
  </ion-page>
</template>

<style></style>
