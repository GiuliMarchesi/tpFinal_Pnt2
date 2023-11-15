<template>
  <ion-page>
    <ion-header>
      <ion-toolbar class="ion-no-border">
        <ion-title class="ion-text-center">Remis App</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding ion-text-center">
      <h2>Bienvenidos a Remis App</h2>

      <p>
        Remis App es una aplicación diseñada para la gestión de remises. 
        Permite que los administradores puedan agregar y modificar a los choferes y vehiculos de la empresa, 
        como asi tambien administrar los viajes que se realizaron y los que se realizarán. 
        A su vez, permite a los choferes ver los viajes que tienen asignados.
      </p>

      <h3>Integrantes del Proyecto</h3>
      <ion-list class="ion-no-padding">
        <ion-item>Gatica Ezequiel</ion-item>
        <ion-item>Calvo Bautista</ion-item>
        <ion-item>Lozano Facundo</ion-item>
        <ion-item>Costa Facundo</ion-item>
        <ion-item>Marchesi Giuliano</ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from '@ionic/vue'
export default {
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem }
}
</script>

<style scoped>
ion-content, ion-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
 p {
      text-align: justify;
      margin: 20px;
    }

</style>
