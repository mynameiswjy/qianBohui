// 后台进件业务
import request from '@/utils/request'
import qs from 'qs'

//  借款信息请求城市
export function getProvince() {
  return request({
    url: 'address/findTreeAddressAll',
    method: 'get'
  })
}

// 获取下拉框的内容
export function dropDown() {
  return request({
    url: 'Fields/findFieldsInfoORDictItem',
    method: 'get'
  })
}

//  查楼栋
export function EnquiryBuilding(val) {
  return request({
    url: 'shiLian/getBuild',
    method: 'post',
    data: qs.stringify({
      leXiangParam: 'leXiangParam',
      id: val.ID
    })
  })
}

// 查房号
export function EnquiryRoomNum(id, val) {
  return request({
    url: 'shiLian/getHouse',
    method: 'post',
    data: qs.stringify({
      leXiangParam: 'leXiangParam',
      id: id
    })
  })
}

// 楼盘模糊查询
export function FuzzyQuery(e) {
  return request({
    url: 'shiLian/getConstruction',
    method: 'post',
    data: qs.stringify({
      cityId: e.CitysValID,
      name: e.house.constructionName
    })
  })
}

// 验证省份证信息
export function authentication(params) {
  return request({
    url: 'userOrder/loanApplyCheckByidNumber/' + params,
    method: 'get'
  })
}

// 业务查看列表  分页
export function Enquiry(params) {
  return request({
    url: 'userOrder/finAuditList',
    method: 'post',
    data: params
  })
}

// 提交
export function Submit(params) {
  return request({
    url: 'userOrder/loanApply',
    method: 'post',
    data: params
  })
}

//  业务查看 > 业务详情
export function IdQuery(params) {
  return request({
    url: 'userOrder/' + params,
    method: 'get'
  })
}

// 转小贷
export function goXiaoDai(params) {
  return request({
    url: 'leXiangXiaoDai/toXiaoDai/' + params,
    method: 'get'
  })
}

// 客户上传资料状态判斷
export function HandleStatus(params) {
  return request({
    url: 'thirdParty/thirdPartyHandleStatus/' + params,
    method: 'get'
  })
}

// 市联房价查询
export function getShiLianFj(params) {
  return request({
    url: 'userOrder/findHistory/191/' + params,
    method: 'get'
  })
}

// 风险报告页面  各种模板信息
export function getAuditList(num, id) {
  return request({
    url: 'userOrder/findHistory/' + num + '/' + id,
    method: 'get'
  })
}

// 风控评估
export function windAssessment(params) {
  return request({
    url: 'test/risk/' + params,
    method: 'get'
  })
}

// 房产信息
export function getHouse(params) {
  return request({
    url: 'userOrder/getUserOrderInfo/' + params + '?showHouseReport=true',
    method: 'get'
  })
}
export function printAuditList(id) {
  return request({
    url: 'userOrder/findHistory/121/' + id,
    method: 'get'
  })
}
export function printReport(id) {
  return request({
    url: 'userOrder/userOrderReport/' + id + '/?isGZIP=true',
    method: 'get'
  })
}
export default {
  getProvince,
  dropDown,
  authentication,
  Enquiry,
  EnquiryBuilding,
  EnquiryRoomNum,
  FuzzyQuery,
  Submit,
  IdQuery,
  HandleStatus,
  getShiLianFj,
  getAuditList,
  windAssessment,
  goXiaoDai,
  getHouse,
  printAuditList,
  printReport
}
