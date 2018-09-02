export function userNameReg(userName) {
  let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(userName)) {
    wx.showModal({
      title: '温馨提示',
      content: '请输入正确的手机号',
      showCancel: false
    })
    return false
  } else {
    return true
  }
}
export function passwordReg(password) {
  let passWordReg = /\w{6,17}$/
  if (!passWordReg.test(password)) {
    wx.showModal({
      title: '温馨提示',
      content: '密码必须6位及以上',
      showCancel: false
    })
    return false
  } else {
    return true
  }
}