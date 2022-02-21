import OriginAxios from './request'
import localCache from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './request/config'

const originAxios = new OriginAxios({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //此处配置的是封装后的拦截器
  interceptors: {
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})
export default originAxios
