import {doLogin} from '../../api/index'

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../../images/pageImg/default_avatar.png',
    userInfo: {},
    isLoginMask: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSetting({
      success: function(res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              let userInfo = res.userInfo
              that.setData({
                avatarUrl: userInfo.avatarUrl,
                userInfo: userInfo
              })
            }
          })
        }
      }
    })
  },

  onShow: function () {
  
  },
  goToLogin() {
    this.setData({
      isLoginMask: true
    })
  },
  close() {
    this.setData({
      isLoginMask: false
    })
  },
  getUserInfo(e) {
    console.log('userInfo', e);
    let info = e.detail.userInfo
    let userName = info.nickName
    let province = info.province
    let city = info.city
    let avatarUrl = info.avatarUrl
    if (e.detail.errMsg === 'getUserInfo:ok') {
      wx.login({
        success(even) {
          console.log(even.code);
          let data = {
            code: even.code,
            userName: userName,
            passWord: '',
            loginType: 'wx',
            province: province,
            city: city
          }
          doLogin().then(res => {
            console.log(res);
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})