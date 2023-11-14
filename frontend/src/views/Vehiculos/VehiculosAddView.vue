<script>
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  
} from "@ionic/vue";
import axios from "axios";
import { vehiculoStore } from "../../stores/vehiculoStore";
import vehiculosService from "../../service/vehiculosService";
import Swal from 'sweetalert2/dist/sweetalert2';

export default {
  components: {
    IonPage,
    IonContent,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonButton,
    IonItem,
    IonLabel,
    IonList,
    IonThumbnail,
    
  },
  setup() {
    const store2 = vehiculoStore();
    const { addVehiculo } = store2;
    return { addVehiculo };
  },
  methods: {
    async search() {
      if (!this.busqueda) {
        Swal.fire({
      toast: true,
      position: 'front',
      showConfirmButton: true,
      timer: 5000,
      timerProgressBar: true,

      icon: 'error',
      title: 'Campo vacío',
      text: 'Ingrese algo antes de buscar',
     
      
    });
       ;
      }
      const autos = await vehiculosService.searchData(this.busqueda);

      if (autos.length > 0) {
        this.autos = autos;
      } else {
        Swal.fire({
      toast: true,
      position: 'front',
      showConfirmButton: true,
      timer: 5000,
      timerProgressBar: true,

      icon: 'error',
      title: 'Búsqueda fallida',
      text: 'No se encontaron autos en la busqueda',
     
      
    });
     
        this.autos = [];
      }
    },
    async crearVehiculo() {
      if (!this.autoSeleccionado) {
        return;
      }
      await this.addVehiculo({
        id: this.autoSeleccionado.gid,
        nombre: this.autoSeleccionado.full_name,
        foto: this.getAutoFoto(this.autoSeleccionado.cover_photo_image_id),
      });
      this.resetearBusqueda();
      this.$router.push("/vehiculos");
    },
    resetearBusqueda() {
      this.busqueda = "";
      this.autos = [];
      this.autoSeleccionado = {};
    },
    elegirVehiculo(auto) {
      this.autoSeleccionado = auto;
    },
    getAutoFoto(foto) {
      const url = "https://s.car.info/image_files/90/" + foto + ".jpg";

      return url;
    },
  },
  data() {
    return {
      busqueda: "",
      autos: [],
      autoSeleccionado: {},
    };
  },
};
</script>

<template>
  <ion-page class="page-content">
    <ion-content>
      <h2>Añadir autos</h2>
      <form @submit.prevent="crearVehiculo" @reset.prevent="resetearBusqueda">
        <ion-card>
          <ion-card-header>
            <ion-card-title>Buscador de autos</ion-card-title>
            <ion-card-subtitle
              >Elija un auto para crear su vehiculo.</ion-card-subtitle
            >
            <div>
              <input type="text" v-model="busqueda" />
              <input type="button" value="Buscar" @click="search" />
              <input type="reset" value="Reset" />
            </div>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item
                v-for="(auto, index) in autos"
                :key="auto.gid"
                :lines="index + 1 === autos.length ? 'none' : ''"
              >
                <ion-thumbnail slot="start">
                  <img
                    alt="Silhouette of mountains"
                    :src="getAutoFoto(auto.cover_photo_image_id)"
                  />
                </ion-thumbnail>
                <ion-label>{{ auto.full_name }}</ion-label>
                <ion-button fill="solid" @click="elegirVehiculo(auto)"
                  >Seleccionar</ion-button
                >
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
        <div v-if="autoSeleccionado?.full_name">
          <h3>Vehiculo seleccionado</h3>
          <ion-card>
            <img
              :alt="'Foto de un ' + autoSeleccionado.full_name"
              :src="getAutoFoto(autoSeleccionado.cover_photo_image_id)"
            />
            <ion-card-header>
              <ion-card-title>{{ autoSeleccionado.full_name }}</ion-card-title>
            </ion-card-header>
            <ion-button fill="solid" type="submit"
              >Agregar este vehiculo</ion-button
            >
          </ion-card>
        </div>
      </form>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.page-content {
  margin-top: 80px;
}
</style>
