<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
import axios from 'axios'
import choferService from '../service/choferService'
export default {
  components: {IonPage, IonContent, IonList, IonInput, IonButton},
  data() {
    return {
        lista: [],
        person: {},
        errorMessage: ''
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        this.lista = await choferService.loadData()
      } catch(e) {
        console.log(e);
        this.errorMessage = "Se produjo un error"
      }
    },
    async saveData() {
      try {
        //await axios.post("http://localhost:3000/lista",this.person)
        await choferService.saveData(this.person)
        await this.loadData()
      } catch(e) {
        console.log(e);
        this.errorMessage = e
      }
    },
    async deleteData(id) {
      try {
        // await axios.delete("http://localhost:3000/lista/"+id)
        await choferService.deleteData(id)
        await this.loadData()
      } catch(e) {
        console.log(e);
        this.errorMessage = "Se produjo un error"
      }
    },
    async putData(id) {
      try {
        //await axios.put("http://localhost:3000/lista/"+id,this.person)
        await choferService.putData(id,this.person)
        await this.loadData()
      } catch(e) {
        console.log(e);
        this.errorMessage = "Se produjo un error"
      }
    },

  }
}
</script>

<template>
  <ion-page>
    <ion-content>
        <h2>Lista Chofer</h2>
        <ion-list v-for="e in lista" :key="e.id">
            {{ e.id }} {{ e.nombre }} {{ e.apellido }} {{ e.dni }}
            <ion-button @click="deleteData(e.id)">Eliminar</ion-button>
            <ion-button @click="putData(e.id)">Reemplazar</ion-button>
        </ion-list>
        <h3>Agregar Choferes</h3>
        <!-- <ion-input v-model="person.id" label="id" placeholder="id"></ion-input> -->
        <ion-input v-model="person.nombre" label="Nombre" placeholder="nombre chofer"></ion-input>
        <ion-input v-model="person.apellido" label="Apellido" placeholder="apellido chofer"></ion-input>
        <ion-input v-model="person.dni" label="DNI" placeholder="dni chofer"></ion-input>
        <ion-button @click="saveData">Agregar</ion-button>
        <ion-button @click="loadData">Cargar</ion-button><br/>
        {{ errorMessage }}
    </ion-content>
  </ion-page>
</template>

<style>
</style>