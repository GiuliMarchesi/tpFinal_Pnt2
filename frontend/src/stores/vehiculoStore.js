import { defineStore } from "pinia";
import vehiculosService from "../service/vehiculosService";

export const vehiculoStore = defineStore("vehiculo", {
  state: () => {
    return {
      autos: []
    };
  },
  actions: {
    async fetchVehiculos() {
      const autos = await vehiculosService.loadData();
      this.autos = autos;
    },
    async addVehiculo(vehiculo) {
      await vehiculosService.saveData(vehiculo);
      await this.fetchVehiculos();
    },
  },
  getters: {
    getVehiculos: (state) => state.autos,
  },
});
