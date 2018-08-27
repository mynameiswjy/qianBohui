// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    keywords: ['管检测', '关键词', '搜索你', '钱币', '钱包', '啦啦', '钱币搜索', '管检测']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  onShow: function () {
  
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  keywordsChange(e) {
    let val = e.currentTarget.dataset.val

    this.setData({
      value: val
    })
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