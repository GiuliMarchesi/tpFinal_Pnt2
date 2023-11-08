<script>
import { IonPage, IonContent, IonList, IonInput, IonButton } from "@ionic/vue";
import reportesService from "../service/reportesService";
export default {
  components: { IonPage, IonContent, IonList, IonInput, IonButton },
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
    </ion-content>
  </ion-page>
</template>

<style></style>
