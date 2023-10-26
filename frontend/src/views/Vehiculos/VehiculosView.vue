<script>
import { IonPage, IonContent } from "@ionic/vue";
import { loginStore } from "../../stores/userStore";
import { storeToRefs } from "pinia";

export default {
  components: { IonPage, IonContent },
  setup() {
    const store1 = loginStore();
    const { esAdmin, estaLogeado } = storeToRefs(store1);
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
