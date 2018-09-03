import {doLogin} from '../../api/index'
import {passwordReg, userNameReg} from "../../utils/inspection"

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: app.globalData.userData.Avatar || '../../images/pageImg/default_avatar.png',
    userInfo: {},
    isLoginSelectMask: false,
    NickName: app.globalData.userData.NickName,
    openMask: false,
    openRegister: false,
    openMobile: false,
    mobileNum: '',
    passWordUser: '',
    passWordUserTo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    if (options.openMask) {
      this.setData({
        openMask: options.openMask,
        isLoginSelectMask: options.isLoginSelectMask
      })
    }
    /*wx.getSetting({
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
    })*/
  },

  onShow: function () {
  
  },
  // 我的页面时未登录打开登陆窗口
  goToLogin() {
    this.setData({
      openMask: true,
      isLoginSelectMask: true
    })
  },
  // 关闭所有
  close() {
    this.setData({
      isLoginSelectMask: false, // 选择登录方式
      openMask: false,// 蒙层
      openMobile: false, // 手机
      openRegister: false // 注册
    })
  },
  // 手机号
  mobileNumber(e) {
    this.data.mobileNum = e.detail.value
  },
  // 密码
  password(e) {
    this.data.passWordUser = e.detail.value
  },
  // 确认密码
  passwordTo(e) {
    this.data.passWordUserTo = e.detail.value
  },
  // 登录窗口打开注册窗口
  registerUser() {
    this.setData({
      openMobile: false,
      openRegister: true
    })
  },
  // 注册窗口打开登录窗口
  loginUser() {
    this.setData({
      openMobile: true,
      openRegister: false
    })
  },

  // 选择登录方式时 打开手机登录
  openMobilemask(){
    this.setData({
      openMobile: true,
      isLoginSelectMask: false,
      openRegister: false
    })

  },
  // 用户注册
  MobileRegister() {
    let that = this
    if (!userNameReg(that.data.mobileNum)) return
    if (!passwordReg(that.data.passWordUser)) return
    if (this.data.passWordUserTo != that.data.passWordUser) {
      wx.showModal({
        title: '温馨提示',
        content: '两次密码输入不一致',
        showCancel: false
      })
      return
    }
    wx.showLoading({
      title: '登陆中...',
    })
    wx.login({
      success(even) {
        console.log(even);
        let data = {
          code: even.code,
          userName: that.data.mobileNum,
          passWord: that.data.passWordUser,
          loginType: 'phone',
          province: ' ',
          city: ' ',
          name: ' ',
          headUrl: ' '
        }
        doLogin(data).then(res => {
          console.log(res)
          if (res.data.returnCode === '0000') {
            app.initUserData(res.data.returnData)
            wx.hideLoading()
            wx.showToast({
              title: '登陆成功',
              icon: 'success',
              duration: 1000
            })
            that.setData({
              avatarUrl: app.globalData.userData.Avatar,
              NickName: app.globalData.userData.NickName,
              isLoginSelectMask: false, // 选择登录方式
              openMask: false,// 蒙层
              openMobile: false, // 手机
              openRegister: false // 注册
            })
          }
        })
      }
    })
  },
  // 手机登录
  MobileLogin() {
    let that = this
    // passwordReg, userNameReg
    if (!userNameReg(that.data.mobileNum)) return
    if (!passwordReg(that.data.passWordUser)) return
    wx.showLoading({
      title: '登陆中...',
    })
    wx.login({
      success(even) {
        console.log(even.code);
        let data = {
          code: even.code,
          userName: that.data.mobileNum,
          passWord: that.data.passWordUser,
          loginType: 'phone',
          province: ' ',
          city: ' ',
          name: ' ',
          headUrl: ' '
        }
        doLogin(data).then(res => {
          wx.hideLoading()
          console.log(res);
          /*app.initUserData(data)
          wx.showToast({
            title: '登陆成功',
            icon: 'success',
            duration: 1000
          })*/
        })
      }
    })
  },
  // 微信登录
  getUserInfoWx(e) {
    if (e.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showToast({
        title: '你拒绝了授权',
        icon: 'none',
        duration: 2000
      })
      return
    }
    wx.showLoading({
      title: '登陆中...',
    })
    let info = e.detail.userInfo
    let userName = info.nickName
    let province = info.province
    let city = info.city
    let avatarUrl = info.avatarUrl
    let that = this
    if (e.detail.errMsg === 'getUserInfo:ok') {
      wx.login({
        success(even) {
          console.log(even.code);
          return
          let data = {
            code: even.code,
            userName: userName,
            passWord: '',
            loginType: 'wx',
            province: province,
            city: city,
            headUrl: avatarUrl,
            name: userName,
          }
          doLogin(data).then(res => {
            let data = res.data.returnData
            if (res.data.returnCode === '0000') {
              wx.hideLoading()
              app.initUserData(data)
              wx.showToast({
                title: '登陆成功',
                icon: 'success',
                duration: 1000
              })
              that.setData({
                avatarUrl: app.globalData.userData.Avatar,
                NickName: app.globalData.userData.NickName,
                isLoginSelectMask: false,
                openMask: false
              })
            }
          })
        }
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var path = "/pages/index/index"
    var subjectParam = this.generateShareOptions();
    return {
      title: '中国金币云展室',
      path: path
    };
  },
  generateShareOptions: function () {
    var that = this;
    var query = "IsShare=1";
    query += '&moneyCode=' + that.data.options.moneyCode;
    return query;
  },
})