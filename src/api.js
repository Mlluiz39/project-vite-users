import axios from 'axios'

const api = axios.create({
  baseURL: 'http://144.22.247.45:3000',
})

export default api
