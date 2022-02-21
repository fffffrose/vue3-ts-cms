import { Module } from 'vuex'

//Module需要两个泛型 一个为模块内state的类型 一个为根模块类型
import { ILoginState } from './types'
import { IRootState } from '../types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {}
    }
  },
  actions: {
    accountLoginAction(context, payload: any) {
      console.log(`执行登录Action`, payload)
    }
  }
}
export default loginModule
