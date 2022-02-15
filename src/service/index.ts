import OriginAxios from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const originAxios = new OriginAxios({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})
export default originAxios
