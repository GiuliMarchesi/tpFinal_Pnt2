<script>
import { IonPage, IonContent } from "@ionic/vue";
import { loginStore } from "../../stores/userStore";
import { storeToRefs } from "pinia";
import axios from "axios";
import {vehiculoStore} from "../../stores/vehiculoStore"

export default {
  components: { IonPage, IonContent },
  setup() {
    const store1 = loginStore();
    const { esAdmin, estaLogeado } = storeToRefs(store1);
    const store2 = vehiculoStore();
    const {fetchVehiculos,getVehiculos} = storeToRefs(store2)
    return { esAdmin, estaLogeado,fetchVehiculos,getVehiculos};
  },
  methods: {
    vehiculos:()=> this.getVehiculos(),
    puedeVerAdd() {
      return this.esAdmin.valueOf() && this.estaLogeado.valueOf();
    },
  },
  async mounted (){
      await this.fetchVehiculos();
   }
};
</script>

<template>
  <ion-page>
    <ion-content>
      <h2>Flota de vehiculos</h2>
      <RouterLink v-if="puedeVerAdd()" to="/vehiculos/add">Añadir vehiculo</RouterLink>
      <p v-for="auto in vehiculos()" :key="auto.gid">
        {{ auto.nombre }}
      </p>
    </ion-content>
  </ion-page>
</template>

<style></style>
