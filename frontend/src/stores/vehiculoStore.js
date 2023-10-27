import { defineStore } from "pinia";
export const vehiculoStore = defineStore("vehiculo", {
  state: () => {
    return { autos: [] };
  },
  actions: {
    async fetchVehiculos() {
      const { data: autos } = await axios.get(
        `http://localhost:3000/autos`
      );
      this.autos = autos;
    },
    async addVehiculo(vehiculo) {
      await axios.post(`http://localhost:3000/autos`, {
        auto: vehiculo,
      });
      await this.fetchVehiculos();
    },
  },
  getters: {
    getVehiculos: (state) => state.autos,
  },
});
