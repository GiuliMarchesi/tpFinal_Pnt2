import { defineStore } from "pinia";
import axios from "axios"

export const viajeStore = defineStore("viaje", {
  state: () => {
    return {
      viajes: [],
      choferes: [],
      autos:[]
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
        viaje: viaje,
      });
      await this.fetchViajes();
    },    
    async deleteViaje(id) {
      await axios.delete(`http://localhost:3000/viajes/${id}`);
      await this.fetchViajes();
    },
    async fetchChoferes() {
      const { data: choferes } = await axios.get(
        `http://localhost:3000/choferes`
      );
      this.choferes = choferes;
    },
    async fetchAutos() {
      const { data: autos } = await axios.get(
        `http://localhost:3000/autos`
      );
      this.autos = autos;
    }
  },
  getters: {
    getViajes: (state) => state.viajes,
    getChoferes: (state) => state.choferes,
    getAutos: (state) => state.autos,

  },
});
