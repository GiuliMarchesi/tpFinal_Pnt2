<script>
import {IonPage,IonContent,IonList,IonInput,IonButton} from '@ionic/vue'
export default {
  components: {IonPage, IonContent, IonList, IonInput, IonButton},
  data() {
    return {
      
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        this.lista = await listaService.loadData()
      } catch(e) {
        console.log(e);
        this.errorMessage = "Se produjo un error"
      }
    },
    async saveData() {
      try {
        //await axios.post("http://localhost:3000/lista",this.person)
        await listaService.saveData(this.person)
        await this.loadData()
      } catch(e) {
        console.log(e);
        this.errorMessage = e
      }
    },
    async deleteData(id) {
      try {
        // await axios.delete("http://localhost:3000/lista/"+id)
        await listaService.deleteData(id)
        await this.loadData()
      } catch(e) {
        console.log(e);
        this.errorMessage = "Se produjo un error"
      }
    },
    async putData(id) {
      try {
        //await axios.put("http://localhost:3000/lista/"+id,this.person)
        await listaService.putData(id,this.person)
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
        <h2>Reportes</h2>


        {{ errorMessage }}
    </ion-content>
  </ion-page>
</template>

<style>
</style>
