import axios from 'axios'
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/reportes',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export { apiClient as reportesService }

export default {
    async loadData() {
        try {
            const response = await apiClient.get('/');
            return response.data
        } catch (error) {
            throw "Error de conexion"
        }
    }

}
