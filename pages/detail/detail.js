import {successiveExhibitors} from '../../api/index'

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.init(options)
  },

  onShow: function () {
  
  },
  init(options) {
    successiveExhibitors({moneyCode: options.moneyCode}).then(res => {
      console.log(res.data.returnData);
      if (res.data.returnCode === '0000') {
        this.setData({
          obj: res.data.returnData
        })
      }
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