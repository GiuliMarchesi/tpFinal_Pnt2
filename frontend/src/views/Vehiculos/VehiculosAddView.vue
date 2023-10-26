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
} from "@ionic/vue";
import axios from "axios";

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
  },
  methods: {
    async search() {
      if (!this.busqueda) {
        alert("Ingrese algo antes de buscar");
      }
      const { data: autos } = await axios.get(
        `http://localhost:3000/autos/search`,
        {
          params: {
            q: this.busqueda,
          },
        }
      );

      if (autos.length > 0) {
        this.autos = autos;
      } else {
        alert("No se encontaron autos en la busqueda");
        this.autos = [];
      }
    },
    async crearVehiculo() {
      if (!this.autoSeleccionado) {
        return;
      }
      await axios.post(`http://localhost:3000/autos`, {
        auto: {
          id: this.autoSeleccionado.gid,
          nombre: this.autoSeleccionado.full_name,
          foto: this.getAutoFoto(this.autoSeleccionado.cover_photo_image_id),
        },
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
  <ion-page>
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

<style></style>
