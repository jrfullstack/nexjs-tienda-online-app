import axios from 'axios';

const tiendaOnlineApi = axios.create ({
  baseURL: '/api'
})

export default tiendaOnlineApi;
