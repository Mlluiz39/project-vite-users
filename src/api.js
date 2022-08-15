import axios from 'axios'

const api = axios.create({
  baseURL: 'https://node-users-dev.herokuapp.com',
})

export default api
