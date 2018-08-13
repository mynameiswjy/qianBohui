/*import ajaxSend from './ajax'

// 首页接口
export function indexDo(data = {}) {
  return ajaxSend('/index.do', data)
}
*/
import axios from 'axios'

const service = axios.create({
  // api的base_url
  baseURL: "https://www.chqbh.com/qbh",
  // 请求超时时间
  timeout: 20000,
  headers: {
  }
})
export function indexDo(data = {}) {
  return service({
    url: '/woa/index.do',
    method: 'get',
    data: data
  })
}

// 首页历届展会接口
export function successiveExhibitors(data = {}) {
  return service({
    url: '/news/successiveExhibitors.do',
    method: 'post',
    data: data
  })
}

export default {
  indexDo,
  successiveExhibitors
}
