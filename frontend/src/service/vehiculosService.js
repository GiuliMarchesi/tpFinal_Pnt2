import axios from 'axios'
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/autos',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export { apiClient as vehiculoService }

export default {
    async loadData() {
        apiClient.defaults.headers.common['authorization'] =
            `Bearer ${JSON.parse(localStorage.getItem('usuario')).token}`
        try {
            const response = await apiClient.get('/');
            return response.data
        } catch (error) {
            throw "Error de conexion"
        }
    },
    async searchData(q) {
        try {
            const response = await apiClient.get('/search', {
                params: {
                    q: q
                }
            });
            return response.data
        } catch (error) {
            throw "Error de conexion"
        }
    },
    async saveData(elem) {
        try {
            await apiClient.post('/', {
                auto: elem
            });
        } catch (error) {
            throw "Error de conexion"
        }
    },
    async deleteData(id) {
        try {
            await apiClient.delete("/" + id)
        } catch (error) {
            throw "Error de conexion"
        }
    },

}
