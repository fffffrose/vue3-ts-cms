import type { AxiosRequestConfig, AxiosResponse } from 'axios'
//设置一个hooks属性对应的配置类型 其中是四种允许的函数类型
export interface OriginAxiosInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (err: any) => any
}
//继承axios的传参并添加对应的类型
export interface OriginAxiosConfig extends AxiosRequestConfig {
  interceptors?: OriginAxiosInterceptors
}
