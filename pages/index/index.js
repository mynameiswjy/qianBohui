var app = getApp()

Page({

  data: {
    array: ['美国', '中国', '巴西', '日本'],
    valHot: '热门',
    indexHot: ''
  },

  onLoad: function (options) {
  
  },

  onShow: function () {
  
  },
  hotSelect(e) {
    var index = e.detail.value
    console.log(typeof index);
    this.setData({
      valHot: this.data.array[index],
      indexHot: index
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