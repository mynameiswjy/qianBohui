import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const hosts = {
  // dev: 'http://app.ledata666.cn/RiskControl/',
  // prod: 'http://app.ledata666.cn/RiskControl/'
  // dev: 'https://app.ledata666.cn/RiskControl/',
  // prod: 'https://app.ledata666.cn/RiskControl/'
  // dev: 'http://192.168.1.100:8082/RiskControl/',
  // prod: 'http://192.168.1.100:8082/RiskControl/'
  dev: 'http://120.77.156.134:8080/RiskControl/',
  prod: 'http://120.77.156.134:8080/RiskControl/'
}
const service = axios.create({
  // api的base_url
  baseURL: process.env.NODE_ENV === 'development' ? hosts.dev : hosts.prod,
  // 请求超时时间
  timeout: 20000,
  headers: {
    'tokenId': getToken()
  }
})
// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['tokenId'] = getToken()// 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(function(response) {
  // token 已过期，重定向到登录页面
  if (getToken() == null) {
    sessionStorage.clear()
    // Message.error('token 已过期，请重新登录')
    router.replace({
      path: '/',
      query: { redirect: router.currentRoute.fullPath }
    })
  }
  return response
}, function(err) {
  if (err && err.response) {
    switch (err.response.status) {
      case 400: err.message = '请求错误(400)'; break
      case 401: err.message = '未授权，请重新登录(401)'
        router.replace({
          path: '/',
          query: { redirect: router.currentRoute.fullPath }
        })
        break
      case 403: err.message = '拒绝访问(403)'; break
      case 404: err.message = '请求出错(404)'; break
      case 408: err.message = '请求超时(408)'; break
      case 500: err.message = '服务器错误(500)'; break
      case 501: err.message = '服务未实现(501)'; break
      case 502: err.message = '网络错误(502)'; break
      case 503: err.message = '服务不可用(503)'; break
      case 504: err.message = '网络超时'; break
      case 505: err.message = 'HTTP版本不受支持(505)'; break
      default: err.message = `连接出错'${' err.response.status '}'!`
    }
  } else {
    err.message = '连接服务器失败!'
  }
  Message.error(err.message)
  return Promise.reject(err)
})

export default service
