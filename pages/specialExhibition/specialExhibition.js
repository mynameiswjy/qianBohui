import {getSubjects} from '../../api/index'

var app = getApp()

Page({
  data: {
    pageIndex: 1,
    list: [],
    pageNum: '',
    isSend: true,
    isLoading: true
  },

  onLoad: function (options) {
    this.initData(options)
  },
  initData(options) {
    let data = {
      pageIndex: this.data.pageIndex,
      pageSize:10,
      parentType: 'decennial',
      seedtType: '',
      selectType: 'first'
    }
    /*index(data).then(res => {
      console.log(res.data);
      if (res.data.returnCode === '0000') {
        let list = this.data.list.concat(res.data.returnData.MemorialMoney)
        this.setData({
          pageNum: res.data.returnData.pageNum,
          list: list,
          isSend:true,
          pageIndex: this.data.pageIndex
        })
      } else {
        console.error('服务器错误')
      }
    })*/
    getSubjects({type: "firstSubject", id: 0}).then(res => {
      console.log(res.data);
      /*if (res.data.returnCode === '0000') {
        let list = this.data.list.concat(res.data.returnData.MemorialMoney)
        this.setData({
          pageNum: res.data.returnData.pageNum,
          list: list,
          isSend:true,
          pageIndex: this.data.pageIndex
        })
      } else {
        console.error('服务器错误')
      }*/
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
    /*this.data.pageIndex++
    if (this.data.pageNum < this.data.pageIndex) {
      this.setData({
        isLoading: false
      })
      return
    }
    this.initData()*/
  },
})