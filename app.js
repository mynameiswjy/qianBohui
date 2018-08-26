App({
  globalData: {
    appid: 'wx5060b4dcb8908abc'
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
  onShow() {
  },
  onHide() {
  }
})