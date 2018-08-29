App({
  globalData: {
    appid: 'wx5060b4dcb8908abc',
    header: null,
    userData: { HasLogin: false, HasWxLogin: false },
  },
  onLaunch() {
    /*wx.login({
      success(e) {
        console.log('app', e.code);
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + this.globalData.appid + '&secret=SECRET&js_code='+ e.code +'&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            openid = res.data.openid //返回openid
          }
        })
      }
    })*/

  },
  initUserData(data) {
    var that = this
    var header = that.globalData.header
    header.Token = data.Token;
    that.globalData.userData.HasLogin = true
    that.globalData.userData.Avatar = data.Avatar
    that.globalData.userData.NickName = data.NickName
    if (!that.globalData.userData.Avatar) {
      that.globalData.userData.Avatar = 'images/pageImg/default_avatar.png'
    }
    wx.setStorage({
      data: header
    })
    wx.setStorage({
      data: that.globalData.userData
    })
  },
  onShow() {
  },
  onHide() {
  }
})