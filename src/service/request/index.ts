/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { OriginAxiosConfig, OriginAxiosInterceptors } from './type'

class OriginAxios {
  instance: AxiosInstance
  interceptors?: OriginAxiosInterceptors

  constructor(config: OriginAxiosConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    //配置请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    /*
      配置响应拦截器
    */
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  request(config: AxiosRequestConfig): void {
    this.instance.request(config).then((res) => {
      console.log(res)
    })
  }
}

export default OriginAxios
