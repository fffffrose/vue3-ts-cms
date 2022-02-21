/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { OriginAxiosConfig, OriginAxiosInterceptors } from './type'
import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

class OriginAxios {
  instance: AxiosInstance
  interceptors?: OriginAxiosInterceptors
  loading?: ILoadingInstance
  showLoading: boolean

  constructor(config: OriginAxiosConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true
    //从config配置中取出的对应实例的拦截器
    //相当于new一个对象中可以添加相对的配置
    //拦截器发挥顺序从下到上
    //三处拦截 全局拦截 封装后拦截 创建实例赋值拦截(较少)
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    //添加所有的实例都有的拦截器
    //全局配置
    this.instance.interceptors.request.use(
      (config) => {
        if (!this.showLoading) {
          //添加loading
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据。。。。',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //移除loading
        this.loading?.close()
        //保存返回的res.data
        const data = res.data
        if (data.returnCode === '-1001') {
          console.error('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        this.loading?.close()
        if (err.response.status === 404) {
          console.log(404)
        }
        return err
      }
    )
  }
  //
  request<T>(config: OriginAxiosConfig): Promise<T> {
    //单个请求对config的处理
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      //判断是否显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          //单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            // res = config.interceptors.responseInterceptor(res)
          }
          //不会影响下一个请求
          this.showLoading = true
          //resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = true
          reject(err)
          return err
        })
    })
  }
  get<T>(config: OriginAxiosConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: OriginAxiosConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: OriginAxiosConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: OriginAxiosConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default OriginAxios
