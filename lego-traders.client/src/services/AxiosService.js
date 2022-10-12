import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000,
})
// do not know if this is correct
export const legoApi = Axios.create({
  baseURL: 'https://rebrickable.com/api/v3/lego/',
  params: { key: '9a52e1b386df11fd8dbc95a88b391ee3' },
  timeout: 8000
})
