import { getAntistop, searchName } from '../../api/index'

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    keywords: [],
    list: [],
    isHide: false
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
    getAntistop({ searchType: 'WX_APP_HOME'}).then(res => {
      if (res.data.returnCode === '0000') {
        let  data = res.data.returnData
        if (data.length) {
          this.setData({
            keywords: data,
            isHide: true
          })
        }
      }
    }).catch(err => {
      console.log(err);
    })
  },
  search() {
    searchName({searchName: this.data.value, searchType: 'WX_APP_HOME'}).then(res => {
      console.log(res);
      if (res.data.returnCode === '0000' && res.data.returnData) {
        this.setData({
          list: res.data.returnData,
          isHide: false
        })
      } else {
        wx.showToast({
          title: '搜索内容不存在',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  goToDetailsPage(e) {
    let moneyCode = e.currentTarget.dataset.moneyCode
    wx.navigateTo({
      url: "/pages/detail/detail?moneyCode=" + moneyCode
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