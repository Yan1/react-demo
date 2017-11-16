import { observable, action } from 'mobx'

import { User } from './model'
import Fetch from '../../../utils/Fetch'

import API from 'API'
import Routes from 'Utils/Routes'

export default class UserStore {
  @observable users = [
    {id: 0, name: 'Lily'},
    {id: 1, name: 'Tom'},
  ]
  @observable isLoading = false
  @observable token: string
  @observable user: string
  @observable mobile: string
  @observable isLogin = true  // 是否已登录，false：渲染为登录模式，true：跳转到首页

  headers = {
    Resource: 'user'
  }

  tryAndCatch = (fn: Function) => {
    this.isLoading = true
    try {
      fn()
    } catch (err) {
      this.isLoading = false
    }
  }
  @action changeName(preName: string, newName: string): Promise<User[]> {

    return new Promise<User[]>((resolve: Function, reject: Function) => {
      setTimeout(
          () => {
            this.users.map((user, i) => {
              if (user.name === preName) {
                this.users[i].name = newName
              }
            })
            resolve(this.users)
          },
          1000
      )
    })
  }

  @action async loginServer(formData: {username: string, password: string}) {
    this.isLoading = true
    try {
      let data: any = await Fetch({
        url: API.login,
        method: 'POST',
        data: formData,
        contentType: 'application/x-www-form-urlencoded'
      })
      const { user, token } = data
      this.token = token
      this.user = user

      localStorage.user = user || ''
      localStorage.token = token || ''
      
      this.switchIsLogin(true)
      return data
    } catch (err) {
      this.isLoading = false
      throw new Error(err)
    }
  }

  @action async logoutServer(formData: {}) {
    this.isLoading = true

    try {
      let data = await Fetch({
        url: API.logout,
        data: formData,
        contentType: 'application/x-www-form-urlencoded'
      })

      this.isLoading = false
      
      delete localStorage.token
      delete localStorage.user
    
      delete sessionStorage.token
      delete sessionStorage.user

      this.switchIsLogin(false)
      return data
    } catch (err) {
      this.isLoading = false
      throw new Error(err)
    }
  }

  @action switchIsLogin(isLogin: boolean = true) {
    this.isLogin = isLogin
  }

  @action async getUserInfo(formData: {username: string}): Promise<any> {
    this.isLoading = true

    try {
      let data: any = await Fetch({
        url: API.user + '?username=' + formData.username, 
        contentType: 'application/x-www-form-urlencoded',
        headers: this.headers,
        // data: formData
      })
      this.mobile = data.mobile
      return data
    } catch (err) {
      this.isLoading = false
      throw new Error(err)
    }
  }

  @action getUser(): string {
    return this.user || localStorage.user || sessionStorage.user
  }

  @action async getNs(formData: {ns: string}): Promise<any> {
    this.isLoading = true

    try {
      let data = await Fetch({
        url: API.ns, 
        contentType: 'application/x-www-form-urlencoded',
        headers: this.headers,
        data: formData
      })
      this.isLoading = true
      return data
    } catch (err) {
      this.isLoading = false
      throw new Error(err)
    }
  }
}