import axios from 'axios'
import * as qs from 'qs'

import { message } from 'antd'

import UserStore from 'User/store'

interface ReqConfig {
  url: string,
  method?: string,
  data?: any,
  [propName: string]: any
}
const Fetch = ({
  url,
  method = 'GET', 
  data, 
  contentType = 'application/json', 
  headers,
  ns = 'pool.loda',
  type = 'json'
}: ReqConfig) => {

  // axios post application/x-www-form-urlencoded 序列化参数
  if (data instanceof Object && 
    method.toUpperCase() === 'POST' && 
    contentType === 'application/x-www-form-urlencoded'
  ) {
    data = qs.stringify(data)
  }

  return new Promise((resolve, reject) => {
    axios.request({
      url: url,
      method,
      data: data,
      headers: Object.assign(
        {}, 
        {
          AuthToken: localStorage.token || '', 
          NS: ns, 
          'Content-Type': contentType,
          'X-Requested-With': 'XMLHttpRequest'
        }, 
        ...headers),
      responseType: type,
      validateStatus: function (status: number) {
        return true
      },
    }).then((result: any) => {
      // console.log(result)
      let { status } = result
      if (status === 200) {  // 请求成功
        resolve(result.data.data)
      } else if (status === 401) { // 请重新登录
        message.error('请重新登录', 5)
        window.location.href = '/login'
        reject(result)
      } else { // 直接返回msg（登录时失败返回500）
        reject(result)
        message.error(result.data.msg, 5)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

export default Fetch
