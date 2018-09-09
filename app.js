App({
  globalData: {
    appid: 'wx5060b4dcb8908abc',
    header: {},
    iphoneX: false,
    userData: { HasLogin: false, HasWxLogin: false }
  },
  onLaunch() {
    let that = this
    wx.getSystemInfo({
      success(res) {
        console.log(res);
        if (res.model == "iPhone X") {
          that.globalData.iphoneX = true
        }
      }
    })
    let header = wx.getStorageSync('header')
    let userData = wx.getStorageSync('userData')
    if (header) {
      that.globalData.header = header
    }
    if (userData) {
      that.globalData.userData = userData
    }
    if (!header.Token) {
      that.globalData.userData.HasLogin = false
    }

  },
  initUserData(data) {
    var that = this
    var header = that.globalData.header
    header.Token = data.token
    that.globalData.userData.HasLogin = true
    if (data.headUrl == ' ') {
      that.globalData.userData.Avatar = ''
    } else {
      that.globalData.userData.Avatar = data.headUrl
    }
    that.globalData.userData.NickName = data.userName || data.name
    if (!that.globalData.userData.Avatar) {
      that.globalData.userData.Avatar = '../../images/pageImg/default_avatar.png'
    }
    console.log(that.globalData.userData);
    wx.setStorage({
      key: "header",
      data: header
    })
    wx.setStorage({
      key: "userData",
      data: that.globalData.userData
    })
  },
  onShow() {
  },
  onHide() {
  }
})