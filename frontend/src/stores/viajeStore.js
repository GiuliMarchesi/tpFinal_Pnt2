import { defineStore } from "pinia";
import axios from "axios"

export const viajeStore = defineStore("viaje", {
  state: () => {
    return {
      viajes: []
    };
  },
  actions: {
    async fetchViajes() {
      const { data: viajes } = await axios.get(
        `http://localhost:3000/viajes`
      );
      this.viajes = viajes;
    },
    async addViaje(viaje) {
      await axios.post(`http://localhost:3000/viajes`, {
        viajes: viaje,
      });
      await this.fetchViajes();
    },    
    async deleteViaje(id) {
      await axios.delete(`http://localhost:3000/viajes/${id}`);
      await this.fetchViajes();
    }
  },
  getters: {
    getViajes: (state) => state.viajes,
  },
});
