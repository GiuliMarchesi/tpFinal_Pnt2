<script>
import { IonPage, IonContent, IonList, IonItem, IonCard, IonLabel, IonCardHeader, IonCardTitle, IonCardContent, IonThumbnail } from "@ionic/vue";
import reportesService from "../service/reportesService";
export default {
  components: { IonPage, IonContent, IonList, IonCard, IonItem, IonLabel, IonCardHeader, IonCardTitle, IonCardContent, IonThumbnail },
  data() {
    return {
      reportes: {},
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    async loadData() {
      this.reportes = await reportesService.loadData();
    },
  },
};
</script>

<template>
  <ion-page>
    <ion-content>
      <h2>Reportes</h2>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Vehiculos</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Cantidad de Vehiculos en el Garage: {{ reportes.cantidadVehiculos }}
          <br>
          Viajes por vehiculos
          <ion-list v-for="autos in reportes.vehiculosConViajes">
            <ion-item>
            <ion-thumbnail slot="start">
              <img alt="Foto Vehiculo" :src="autos.foto" />
            </ion-thumbnail>
            <ion-label>{{ autos.nombre }} realizo {{ autos.viajes }} recaudando {{ autos.recaudacion }}</ion-label>
            </ion-item>
          </ion-list> 
        </ion-card-content>
      </ion-card>
      
      <ion-card>
        <ion-card-header>
          <ion-card-title>Choferes</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Cantidad de Choferes: {{ reportes.cantidadChoferes }}
          <br>
          Choferes con viajes
          <ion-list>
            <ion-item>
              <ion-label>Nombre</ion-label>
              <ion-label>Apellido</ion-label>
              <ion-label>Cantidad de Viajes</ion-label>
              <ion-label>Recaudación</ion-label>
            </ion-item>
            <ion-item v-for="chofer in reportes.choferesConViajes">
              <ion-label>{{ chofer.nombre }}</ion-label>
              <ion-label>{{ chofer.apellido }}</ion-label>
              <ion-label>{{ chofer.viajes }}</ion-label>
              <ion-label>{{ chofer.recaudacion }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
      
      <ion-card>
        <ion-card-header>
          <ion-card-title>Viajes</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          Cantidad de Viajes: {{ reportes.cantidadViajes }}
          <br>
          Promedio de Recaudación: {{ reportes.promedioRecaudacionViajes }}
          <br>
          Recaudación total: {{ reportes.recaudacionViajes }}
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style></style>
