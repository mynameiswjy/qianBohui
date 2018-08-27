import {requestAjaxGet, requestAjaxPost} from './ajax'

// 首页
export function index(data = {}) {
  let url = '/qbh/app/index.do'
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, function (res) {
      resolve(res)
    }, function (err) {
      reject(err)
    })
  })
}

// 钱币详情页
export function successiveExhibitors(data = {}) {
  let url = '/news/successiveExhibitors.do'
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, function (res) {
      resolve(res)
    }, function (err) {
      reject(err)
    })
  })
}