import type { ILoginState } from './login/types'
export interface IRootState {
  name: string
  age: number
}

export interface IRooWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRooWithModule
