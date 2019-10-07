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

// 专题
export function getSubjects(data = {}) {// ?type=firstSubject&id=0
  let url = '/qbh/coin/getSubjects.do'
  return new Promise((resolve, reject) => {
    requestAjaxGet(url, data, function (res) {
      resolve(res)
    }, function (err) {
      reject(err)
    })
  })
}

// 专题列表
export function getMoneyList(data) {
  let url = '/qbh/coin/subjects/getMoneyList.do'
  return new Promise((resolve, reject) => {
    requestAjaxGet(url, data, function (res) {
      resolve(res)
    }, function (err) {
      reject(err)
    })
  })
}

// 钱币详情页
export function successiveExhibitors(data = {}) {
  let url = '/qbh/coin/coinInfo.do';
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, function (res) {
      resolve(res);
    }, function (err) {
      reject(err);
    });
  });
}

// 搜索关键词
export function getAntistop(data = {}) {
  let url = '/qbh/search/getAntistop.do'
  return new Promise((resolve, reject) => {
    requestAjaxGet(url, data, function (res) {
      resolve(res)
    }, function (err) {
      reject(err)
    })
  })
}

// 搜索
export function searchName(data = {}) {
  let url = '/qbh/search/searchName.do'
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, function (res) {
      resolve(res)
    }, function (err) {
      reject(err)
    })
  })
}
// 登陆
export function doLogin(data = {}) {
  let url = '/qbh/app/doLogin.do'
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, function (res) {
      resolve(res)
    }, function (err) {
      reject(err)
    })
  })
}

// 小程序二维码
export function getStoreRCs(data = {}) {
  let url = '/qbh/coin/getStoreRCs.do'
  return new Promise((resolve, reject) => {
    requestAjaxGet(url, data, function (res) {
      resolve(res)
    }, function (err) {
      reject(err)
    })
  })
}

// 点赞/分享/朋友圈 统一接口
export function likeMoneyCode(data = {}) {
  let url = '/qbh/coin/likeMoneyCode.do'
  return new Promise((resolve, reject) => {
    requestAjaxPost(url, data, function (res) {
      resolve(res)
    }, function (err) {
      reject(err)
    })
  })
}