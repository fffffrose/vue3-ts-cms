import { Module } from 'vuex'
import router from '@/router'

import type { IAccount } from '@/service/login/type'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'

import localCache from '@/utils/cache'

//Module需要两个泛型 一个为模块内state的类型 一个为根模块类型
import { ILoginState } from './types'
import { IRootState } from '../types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenu: []
    }
  },
  mutations: {
    changeToken(state, payload: string) {
      state.token = payload
    },
    changeUserInfo(state, payload: any) {
      state.userInfo = payload
    },
    changeUserMenu(state, payload: any) {
      state.userMenu = payload
    }
  },
  actions: {
    //实现登录
    async accountLoginAction(context, payload: IAccount) {
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data

      context.commit('changeToken', token)
      localCache.setCache('token', token)
      //请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      context.commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)
      //请求用户菜单
      const userMenuResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenuResult.data
      context.commit('changeUserMenu', userMenus)
      localCache.setCache('userMenus', userMenus)
      //跳转到首页
      router.push('/main')
    },
    loadLocalLogin(context) {
      const token = localCache.getCache('token')
      if (token) {
        context.commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        context.commit('changeUserInfo', userInfo)
      }
      const userMenu = localCache.getCache('userMenu')
      if (userMenu) {
        context.commit('changeUserMenu', userMenu)
      }
    }
  }
}
export default loginModule
