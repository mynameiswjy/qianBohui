import axios from 'axios'
import qs from 'qs'

const service = axios.create({
  // api的base_url
  baseURL: "https://www.chqbh.com/qbh",
  // 请求超时时间
  timeout: 20000,
  headers: null,
  /*transformRequest: [function(data) {
    //依自己的需求对请求数据进行处理
    return data;
  }],*/

})
export function indexDo() {
  return service({
    url: '/woa/index.do',
    method: 'get'
  })
}

// 首页历届展会接口
export function successiveExhibitors(data = {}) {
  return service({
    url: '/news/successiveExhibitors.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 搜索关键词
export function getAntistop(data = {}) {
  return service({
    url: '/search/getAntistop.do',
    method: 'get'
  })
}

export default {
  indexDo,
  successiveExhibitors
}
