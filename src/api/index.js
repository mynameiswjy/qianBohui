import axios from 'axios'
import qs from 'qs'

// const baseUrl = 'https://www.chbice.com'
const baseUrl = 'https://www.chqbh.com'

const service = axios.create({
  // api的base_url
  baseURL: baseUrl,
  // 请求超时时间
  timeout: 20000,
  headers: null,
  /*transformRequest: [function(data) {
    //依自己的需求对请求数据进行处理
    return data;
  }],*/

})
const serviceShare = axios.create({
  // api的base_url
  baseURL: baseUrl,
  // 请求超时时间
  timeout: 20000,
  headers: null,
  /*transformRequest: [function(data) {
    //依自己的需求对请求数据进行处理
    return data;
  }],*/

})

function reqServer (head = {}) {
  const service = axios.create({
    // api的base_url
    baseURL: baseUrl,
    // 请求超时时间
    timeout: 20000,
    headers: head,
    /*transformRequest: [function(data) {
      //依自己的需求对请求数据进行处理
      return data;
    }],*/
  })
  return service
}

export function indexDo() {
  return service({
    url: '/qbh/woa/index.do',
    method: 'get'
  })
}

// 首页历届展会接口
export function successiveExhibitors(data = {}) {
  return service({
    url: '/qbh/news/successiveExhibitors.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 搜索关键词
export function getAntistop(data = {}) {
  return service({
    url: '/qbh/search/getAntistop.do',
    method: 'get',
    params: data
  })
}

// 搜索
export function searchName(data = {}) {
  return service({
    url: '/qbh/search/searchName.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 介绍类统一接口
export function etArticlesContent(data = {}) {
  return service({
    url: '/qbh/articles/getArticlesContent.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 新闻资讯类统一接口
export function getNewsCategory(data = {}) {
  return service({
    url: '/qbh/news/getNewsCategory.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 详情落地页
export function getNewsContent(data = {}) {
  return service({
    url: '/qbh/news/getNewsContent.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 报名信息
export function getRegisterTypeInfo(data = {}) {
  return service({
    url: '/qbh/register/getRegisterTypeInfo.do',
    method: 'get',
    params: data
  })
}

// 删除图片接口
export function deleteImage(data = {}) {
  return service({
    url: '/qbh/uploadDownload/deleteImageId.do',
    method: 'get',
    params: data
  })
}

// 图片上传接口
export function uploadImage(data = {}) {
  let headers = {'Content-Type': 'multipart/form-data'}
  return reqServer(headers)({
    url: '/qbh/uploadDownload/uploadImage.do',
    method: 'post',
    data: data
  })
}

// 报名接口
export function putRegisterInfo(data = {}) {
  return service({
    url: '/qbh/register/putRegisterInfo.do',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 图表接口
export function boothExplain(data = {}) {
  return service({
    url: '/qbh/register/boothExplain.do',
    method: 'get',
    params: data
  })
}

// 分享接口 https://www.chqbh.com/qbh/share/getShareToken.do
export function getShareToken(path, code) {
  let url
  if (code) {
    url = baseUrl + '/web/index.html#' + path + '?code=' + code
  } else {
    url = baseUrl + '/web/index.html#' + path
  }
  let data = {
    url: url
  }
  return serviceShare({
    url: '/qbh/share/getShareToken.do',
    method: 'get',
    params: data
  })
}

export default {
  indexDo,
  successiveExhibitors,
  getAntistop,
  searchName,
  etArticlesContent,
  getNewsCategory,
  getNewsContent,
  getRegisterTypeInfo,
  deleteImage,
  putRegisterInfo
}
