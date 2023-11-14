<script>
import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonCard,
  IonLabel,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonThumbnail,
} from "@ionic/vue";
import reportesService from "../service/reportesService";
export default {
  components: {
    IonPage,
    IonContent,
    IonList,
    IonCard,
    IonItem,
    IonLabel,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonThumbnail,
  },
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
    formatDinero(dinero) {
      // Formatea el dinero como $10.308,50
      return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(dinero);
    },
  },
};
</script>

<template>
  <ion-page class="page-content">
    <ion-content>
      <h2>Reportes</h2>
      <ion-card>
        <ion-card-header>
          <ion-card-title>Vehiculos</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <b> Cantidad de Vehiculos en el Garage:</b>
          {{ reportes.cantidadVehiculos }}
          <br />
          Viajes por vehiculos
          <ion-list
            v-for="autos in reportes.vehiculosConViajes"
            v-bind:key="autos.id"
          >
            <ion-item>
              <ion-thumbnail slot="start">
                <img alt="Foto Vehiculo" :src="autos.foto" />
              </ion-thumbnail>
              <ion-label
                >{{ autos.nombre }} realizo {{ autos.viajes }} viaje/s
                recaudando {{ formatDinero(autos.recaudacion) }}</ion-label
              >
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Choferes</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <b>Cantidad de Choferes:</b> {{ reportes.cantidadChoferes }}
          <br />
          Choferes con viajes
          <ion-list>
            <ion-item>
              <ion-label><b>Nombre</b></ion-label>
              <ion-label><b>Apellido</b></ion-label>
              <ion-label><b>Cantidad de Viajes</b></ion-label>
              <ion-label><b>Recaudación</b></ion-label>
            </ion-item>
            <ion-item
              v-for="chofer in reportes.choferesConViajes"
              :key="chofer.id"
            >
              <ion-label>{{ chofer.nombre }}</ion-label>
              <ion-label>{{ chofer.apellido }}</ion-label>
              <ion-label>{{ chofer.viajes }}</ion-label>
              <ion-label>{{ formatDinero(chofer.recaudacion) }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>Viajes</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <b>Cantidad de Viajes:</b> {{ reportes.cantidadViajes }}
          <br />
          <b>Promedio recaudación por viaje: </b
          >{{ formatDinero(reportes.promedioRecaudacionViajes) }}
          <br />
          <b>Recaudación total:</b>
          {{ formatDinero(reportes.recaudacionViajes) }}
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.page-content {
  margin-top: 80px;
}
</style>
