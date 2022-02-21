import type { AxiosRequestConfig, AxiosResponse } from 'axios'
//设置一个hooks属性对应的配置类型 其中是四种允许的函数类型
export interface OriginAxiosInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: T) => T
  responseInterceptorCatch?: (err: any) => any
}
//继承axios的传参并添加对应的类型
export interface OriginAxiosConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: OriginAxiosInterceptors<T>
  showLoading?: boolean
}
