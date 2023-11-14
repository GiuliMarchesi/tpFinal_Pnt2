<script>
import { IonPage, IonContent, IonList, IonInput, IonButton, IonItem, IonSelect, IonSelectOption } from '@ionic/vue'
import { storeToRefs } from "pinia";
import { viajeStore } from "../../stores/viajeStore";
import Swal from 'sweetalert2/dist/sweetalert2';
export default {
    components: { IonPage, IonContent, IonList, IonInput, IonButton, IonItem, IonSelect, IonSelectOption },
    data() {
        return {
            viaje: {
                origen: "",
                destino: "",
                choferId: 0,
                autoId: 0,
                precio: 0
            },
            errorMessage: "",
        }
    },
    setup() {
        const storeViajes = viajeStore();
        const { getChoferes } = storeToRefs(storeViajes);
        const { fetchChoferes } = storeViajes;
        const { getAutos } = storeToRefs(storeViajes);
        const { fetchAutos } = storeViajes;
        const { addViaje } = storeViajes;
        return { fetchChoferes, getChoferes, fetchAutos, getAutos, addViaje };
    }, async mounted() {
        await this.fetchChoferes();
        await this.fetchAutos();

    },
    methods: {
        limpiarCampos() {
            this.viaje.origen = "";
            this.viaje.destino = "";
            this.viaje.choferId = 0;
            this.viaje.autoId = 0;
            this.viaje.precio = 0;
        },
        comprobarCampos() {
            if (
                !this.viaje.origen ||
                !this.viaje.destino ||
                !this.viaje.choferId ||
                !this.viaje.autoId ||
                !this.viaje.precio

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
        async saveData() {
            console.log(this.viaje);
            if (!this.comprobarCampos()) {
                return;
            }
            try {
                await this.addViaje(this.viaje);
                this.limpiarCampos();
                this.$router.push('/viajes');
            }
            catch (e) {
                console.log(e);
                this.errorMessage = "se produjo un error"
            }
        }
    }
}
</script>
<template>
    <ion-page class="page-content">
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-input v-model="viaje.origen" label="Origen" placeholder="Ingrese un Origen"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-input v-model="viaje.destino" label="Destino" placeholder="Ingrese un Destino"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-select v-model="viaje.autoId" aria-label="auto" placeholder="Seleccionar auto">
                        <ion-select-option v-for="auto in getAutos" :value="auto.id">{{ auto.nombre }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-select v-model="viaje.choferId" aria-label="chofer" placeholder="Seleccionar Chofer">
                        <ion-select-option v-for="chofer in getChoferes" :value="chofer.id">{{ chofer.nombre }}
                            {{ chofer.apellido }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-input v-model="viaje.precio" label="Precio" placeholder="Precio del viaje"
                        type="number"></ion-input>
                </ion-item>
            </ion-list>
            <ion-button @click="saveData()">Agregar</ion-button>
        </ion-content>
    </ion-page>
</template>
<style scoped>
.page-content {
  margin-top: 80px;
}
</style>
