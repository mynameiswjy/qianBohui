import {getMoneyList} from '../../api/index'

var app = getApp()

Page({
  data: {
    pageIndex: 1,
    list: [],
    pageNum: '',
    isSend: true,
    isLoading: true,
    IsShowTxt: false
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.themeName
    })
    this.initData(options)
  },
  initData(options) {
    getMoneyList({id: options.id}).then(res => {
      console.log(res);
      if (res.data.returnCode === '0000') {
        let list = this.data.list.concat(res.data.returnData)//.dataList
        this.setData({
          // pageNum: res.data.returnData.pageNum,
          list: list,
          isSend:true,
          pageIndex: this.data.pageIndex,
          topVideo: this.data.list.content
        })
      } else {
        console.error('服务器错误')
      }
    })
  },
  showTxt() {
    this.setData({
      IsShowTxt: !this.data.IsShowTxt
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
  // 加载更多
  loadMore() {
    this.data.pageIndex++
    if (this.data.pageNum < this.data.pageIndex) {
      this.setData({
        isLoading: false
      })
      return
    }
    this.initData()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  },
});