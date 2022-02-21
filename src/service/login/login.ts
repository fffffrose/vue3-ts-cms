/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import originAxios from '../index'
import type { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/' //Method: /role/${id}/menu
}
export function accountLoginRequest(account: IAccount) {
  return originAxios.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestUserInfoById(id: number) {
  return originAxios.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

export function requestUserMenuByRoleId(id: number) {
  return originAxios.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
