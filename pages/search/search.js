import { getAntistop, searchName } from '../../api/index'

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    keywords: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initHotList()
  },

  onShow: function () {
  
  },
  initHotList() {
    getAntistop().then(res => {
      if (res.data.returnCode === '0000') {
        this.setData({
          keywords: res.data.returnData
        })
      }
    }).catch(err => {
      console.log(err);
    })
  },
  search() {
    searchName({searchName: this.data.value}).then(res => {
      console.log(res);
    })
  },
  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  keywordsChange(e) {
    let val = e.currentTarget.dataset.val
    this.data.value = val
    this.search()
    this.setData({
      value: val
    })
  },
  inputTyping(e) {
    this.data.value = e.detail.value
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
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