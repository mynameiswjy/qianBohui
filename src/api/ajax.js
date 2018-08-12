import axios from "axios"

export default function ajaxSend(path = '', data = {}, type = 'GET') {
  /*return new Promise(function (resolve, reject) {
  })*/
  let url = 'https://www.chqbh.com/qbh/woa' + path
  if (type === 'GET') {
    // 准备URL query参数数据
    let dataStr = ""
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
    // 发送get请求
    return axios.get(url)
  } else {
    // 发送post请求
    return axios.post(url, data)
  }
}
