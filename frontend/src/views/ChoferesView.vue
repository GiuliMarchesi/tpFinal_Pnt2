<script>
import { IonPage, IonContent, IonList, IonInput, IonButton, IonItem, IonLabel } from "@ionic/vue";
import choferService from "../service/choferService";
import Swal from 'sweetalert2/dist/sweetalert2';
export default {
  components: { IonPage, IonContent, IonList, IonInput, IonButton, IonItem, IonLabel  },
  data() {
    return {
      choferes: [],
      person: {},
      errorMessage: "",
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    limpiarCampos() {
      this.person.nombre = "";
      this.person.apellido = "";
      this.person.dni = "";
      this.person.email = "";
    },

    comprobarCampos() {
      if (
        !this.person.nombre ||
        !this.person.apellido ||
        !this.person.dni ||
        !this.person.email
      ) {
        Swal.fire({
      toast: true,
      position: 'front',
      showConfirmButton: true,
      timer: 5000,
      timerProgressBar: true,

      icon: 'error',
      title: 'Campos incorrectos',
      text: 'Debe completar todos los campos correctamente',
     
      
    });
        return false;
      }
      return true;
    },
    
    async loadData() {
      try {
        this.choferes = await choferService.loadData();
      } catch (e) {
        console.log(e);
        this.errorMessage = "Se produjo un error";
      }
    },
    async saveData() {
       if (!this.comprobarCampos()) {
      return; 
    }
      try {
        await choferService.saveData(this.person);
        await this.loadData();
        this.limpiarCampos();
      } catch (e) {
        console.log(e);
        this.errorMessage = e;
      }
    },
    async deleteData(id) {
      try {
        await choferService.deleteData(id);
        await this.loadData();
      } catch (e) {
        console.log(e);
        this.errorMessage = "Se produjo un error";
      }
    },
    async putData(id) {
        if (!this.comprobarCampos()) {
      return; 
    }
      try {
        await choferService.putData(id, this.person);
        await this.loadData();
        this.limpiarCampos();
      } catch (e) {
        console.log(e);
        this.errorMessage = "Se produjo un error";
      }
    },
  },
};
</script>

<template>
  <ion-page>
    <ion-content class="ion-padding">
      <h2 class="ion-text-center">Listado de Choferes</h2>
      <ion-list>
        <ion-item class="header-choferes">
          <ion-label>ID</ion-label>
          <ion-label>Nombre</ion-label>
          <ion-label>Apellido</ion-label>
          <ion-label>DNI</ion-label>
          <ion-label>Email</ion-label>
          <ion-label>Acciones</ion-label>
        </ion-item>
        <ion-item v-for="e in choferes" :key="e.id">
          <ion-label>{{ e.id }}</ion-label>
          <ion-label>{{ e.nombre }}</ion-label>
          <ion-label>{{ e.apellido }}</ion-label>
          <ion-label>{{ e.dni }}</ion-label>
          <ion-label>{{ e.user.email }}</ion-label>
          <ion-button color="danger" @click="deleteData(e.id)"
            >Eliminar</ion-button
          >
          <ion-button @click="putData(e.id)">Modificar</ion-button>
        </ion-item>
      </ion-list>

      <h3>Agregar Choferes</h3>

      <ion-list>
        <ion-item>
          <ion-input
            v-model="person.nombre"
            label="Nombre"
            placeholder="Nombre del chofer"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            v-model="person.apellido"
            label="Apellido"
            placeholder="Apellido del chofer"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            v-model="person.dni"
            label="DNI"
            placeholder="DNI del chofer"
            type="number"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-input
            v-model="person.email"
            label="Email"
            placeholder="usuario del chofer"
          ></ion-input>
        </ion-item>
      </ion-list>
      <ion-button @click="saveData">Agregar</ion-button>
      <!-- <ion-button @click="loadData">Cargar</ion-button> -->
      <br />
      {{ errorMessage }}
    </ion-content>
  </ion-page>
</template>

<style></style>
