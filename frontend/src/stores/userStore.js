import { defineStore } from 'pinia'
import axios from 'axios'
export const userStore = defineStore('user', {
    state: () => {
        return {
            usuario: {},
            estaLogeado: false,
            esAdmin: false
        }
    },
    actions: {
        async login(usuario) {
            try {
                const datos = await axios.post("http://localhost:3000/login", usuario);
                console.log(datos);
                if (datos.status == 200) {
                    const user = datos.data.usuario;
                    this.estaLogeado = true;
                    this.esAdmin = user.rol === "admin" ? true : false;
                    this.usuario = user;
                    localStorage.setItem('usuario', JSON.stringify(
                        { email: usuario.email, token: datos.data.token, rol: user.rol }))
                    return user
                } else {
                    this.estaLogeado = false;
                }
            } catch (e) {
                console.log(e);
            }
        },
        logout(){
            this.usuario = {};
            this.estaLogeado = false;
            this.esAdmin = false;
            localStorage.removeItem("usuario");
        }
    }
})
