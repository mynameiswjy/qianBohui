import {index} from '../../api/index'

var app = getApp()

Page({
  data: {
    pageIndex: 1,
    list: []
  },

  onLoad: function (options) {
    this.initData(options)
  },
  initData(options) {
    let data = {
      pageIndex: this.data.pageIndex,
      pageSize:20,
      parentType: options.parentType,
      seedtType: options.seedtType,
      selectType: 'stand'
    }
    index(data).then(res => {
      console.log(res.data);
      if (res.data.returnCode === '0000') {
        this.setData({
          list: this.data.list.concat(res.data.returnData.MemorialMoney),
        })
      } else {
        console.error('服务器错误')
      }
    })
  },
  goToDetailsPage(e) {
    console.log(e.currentTarget.dataset.moneyCode);
    let moneyCode = e.currentTarget.dataset.moneyCode
    wx.navigateTo({
      url: "/pages/detail/detail?moneyCode=" + moneyCode
    })
  },

  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})