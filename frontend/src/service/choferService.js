import axios from 'axios'
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/lista',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    async loadData() {
        apiClient.defaults.headers.common['authorization'] =
        `Bearer ${ JSON.parse(localStorage.getItem('usuario')).token}`
        try {
            const response = await apiClient.get('/');
            return response.data
        } catch (error) {
            throw "Error de conexion"
        }
    },
    async saveData(elem) {
        try {
            await apiClient.post('/', elem);
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
    async putData(id, elem) {
        try {
            await apiClient.put("/" + id, elem)
        } catch (error) {
            throw "Error de conexion"
        }
    },
}
