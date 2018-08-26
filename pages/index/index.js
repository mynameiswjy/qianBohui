import {index} from '../../api/index'

var app = getApp()

Page({

  data: {
    array: ['美国', '中国', '巴西', '日本'],
    valHot: '热门',
    indexHot: ''
  },

  onLoad: function (options) {
    this.initList()
    /*wx.request({
      url: "https://www.chqbh.com/qbh/app/index.do",
      data: {
        pageIndex: 1,
        pageSize:20,
        parentType: 'hotItem',
        seedtType: '',
        selectType: 'first'
      },
      method: "post",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
        // "content-type":"application/x-www-form-urlencoded"
      },
      success(res) {
        console.log('res', res)
      },
      fail(err) {
        err(err)
      }
    })*/
  },

  onShow: function () {
  
  },
  initList() {
    let data = {
      pageIndex: 1,
      pageSize:20,
      parentType: 'hotItem',
      seedtType: '',
      selectType: 'first'
    }
    index(data).then(res => {
      console.log(res);
    })
  },
  hotSelect(e) {
    var index = e.detail.value
    console.log(typeof index);
    this.setData({
      valHot: this.data.array[index],
      indexHot: index
    })
  },
  goSearch() {
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },
  goToDetail() {
    wx.navigateTo({
      url: "/pages/specialExhibition/specialExhibition"
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