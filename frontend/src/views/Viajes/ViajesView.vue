<script>
import { IonPage,IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/vue'
import { userStore } from "../../stores/userStore";
import { storeToRefs } from "pinia";
import { viajeStore } from "../../stores/viajeStore";


export default {
  components: { IonPage,IonContent, IonList, IonItem, IonLabel, IonButton },
  setup() {
    const store2 = viajeStore();
    const { getViajes } = storeToRefs(store2);
    const { fetchViajes } = store2;
    const { deleteViaje } = store2;
    const store = userStore();
    const { esAdmin, estaLogeado } = storeToRefs(store);
    return { esAdmin, estaLogeado, fetchViajes, getViajes, deleteViaje };
  }, async mounted() {
    await this.fetchViajes();
  },
  methods: {
    puedeVerAdd() {
      return this.esAdmin.valueOf() && this.estaLogeado.valueOf();
    },
  }
}
</script>

<template>
  <ion-page class="page-content">
    <ion-content>
      <RouterLink v-if="puedeVerAdd()" to="/viajes/add">Añadir viaje</RouterLink>
      <h2>Agrege un viaje</h2>
      <ion-list>
        <ion-item class="header-choferes">
          <ion-label>Id</ion-label>
          <ion-label>Origen</ion-label>
          <ion-label>Destino</ion-label>
          <ion-label>Precio</ion-label>
          <ion-label>Chofer</ion-label>
          <ion-label>Auto</ion-label>
        </ion-item>
        <ion-item v-for="viaje in getViajes" :key="viaje.id">
          <ion-label>{{ viaje.id }}</ion-label>
          <ion-label>{{ viaje.origen }}</ion-label>
          <ion-label>{{ viaje.destino }}</ion-label>
          <ion-label>${{ viaje.precio }}</ion-label>
          <ion-label>{{ viaje.chofer.nombre }} {{ viaje.chofer.apellido }}</ion-label>
          <ion-label>{{ viaje.auto.nombre }}</ion-label>
          <ion-button color="danger" @click="deleteViaje(viaje.id)">Eliminar</ion-button>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<style scoped>
.page-content {
  margin-top: 80px;
}
</style>

