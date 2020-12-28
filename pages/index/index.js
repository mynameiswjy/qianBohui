import {index, advertising} from '../../api/index'

var app = getApp()

Page({

  data: {
    array: ['美国', '中国', '巴西', '日本'],
    valHot: '推荐',
    indexHot: '',
    hotList: [],
    dataSet: {},
    parentType: 'hotItem',
    valHotToList: [],
    seedtType: '',
    valHotTo: '',
    MemorialMoney: [],
    pageIndex: 1,
    pageNum: '',
    isSend: true,
    isLoading: true,
    selectType: 'first',
    adList: null,
    IsOpenAd: true
  },
  onLoad: function (options) {
    advertising().then(res => {
      console.log(res);
      if (res.data.returnCode === '0000') {
        this.setData({
          adList: res.data.returnData
        })
      }
    })
    this.initList()
  },

  onShow: function () {
  
  },
  initList() {
    let data = {
      pageIndex: this.data.pageIndex,
      pageSize: 10,
      parentType: this.data.parentType,
      seedtType: this.data.seedtType,
      selectType: 'first'
    }
    if (!this.data.isSend) {
      return
    }
    index(data).then(res => {
      if (res.data.returnCode === '0000') {
        let data = res.data.returnData
        let hotList = data.selectItem.map(item => {
          return item.name
        })
        if (!data.MemorialMoney.length) {
          this.setData({
            MemorialMoney: this.data.MemorialMoney,
            isLoading: false
          })
          return
        }
        if (data.pageNum == 1) {
          this.setData({
            isLoading: false
          })
        } else if (data.pageNum > data.pageIndex) {
          this.setData({
            isLoading: true
          })
        }
        let MemorialMoney = data.pageNum > 1 ? this.data.MemorialMoney.concat(data.MemorialMoney) : data.MemorialMoney
        this.data.pageNum = data.pageNum
        this.setData({
          dataSet: data,
          MemorialMoney: MemorialMoney,
          hotList: hotList,
          isSend:true,
          subject: data.subject,
          pageIndex: this.data.pageIndex
        })
      } else {
        console.error('服务器错误')
      }
    })
  },
  goToDetailsPage(e) {
    let moneyCode = e.currentTarget.dataset.moneyCode
    wx.navigateTo({
      url: "/pages/detail/detail?moneyCode=" + moneyCode
    })
  },
  closeAd() {
    this.setData({
      IsOpenAd: false
    })
  },
  bannerNavBtn(e) {
    const {url} = e.currentTarget.dataset
    if (url) {
      wx.navigateTo({
        url: '/' + url
      })
    }
  },
  hotSelect(e) {
    var index = e.detail.value
    let data = this.data.dataSet.selectItem
    let valHotToList = data[index].submenu.map(item => {
      return item.name
    })
    if (this.data.parentType != data[index].code) {
      this.data.MemorialMoney = []
      this.data.parentType = data[index].code
      this.data.seedtType = ''
      this.data.pageIndex = 1
      this.initList()
    }
    this.setData({
      valHot: data[index].name,
      valHotToList: valHotToList,
      indexHot: index,
      valHotTo: ''
    })
  },

  navBtn() {
    const that = this;
    const url = that.data.adList[0].jumpAddress;
    if (that.data.adList[0].jumpType === "WX") {
      wx.navigateTo({
        url: `/pages/continue/continue?url=${url}`
      })
    }
    if (!url) return
    wx.navigateTo({
      url: '/' + url
    })
  },

  stop() {return},

  hotSelectTo(e) {
    var index = e.detail.value
    let idx = this.data.indexHot
    let data = this.data.dataSet.selectItem[idx].submenu
    if (this.data.seedtType != data[index].code) {
      this.data.MemorialMoney = []
      this.data.seedtType = data[index].code
      this.data.pageIndex = 1
      this.initList()
    }
    this.setData({
      valHotTo: this.data.valHotToList[index],
    })
  },
  goSearch() {
    wx.navigateTo({
      url: "/pages/search/search"
    })
  },
  goToDetail(e) {
    const {id} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/mainTheme/mainTheme?id=${id}`
    })
  },
  // 广告跳转
  Advertising(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url: `/pages/mainTheme/adAccepPage/adAccepPage?url=${url}`
      })
    }
  },
  newAdNacBtn(e) {
    const url = e.currentTarget.dataset.url
    if (url) {
      wx.navigateTo({
        url: '/' + url
      })
    }
  },
  onPullDownRefresh: function () {

  },
  // 加载更多
  loadMore() {
    this.data.pageIndex++
    let MemorialMoney = this.data.MemorialMoney
    if (this.data.pageNum < this.data.pageIndex || MemorialMoney.length < 9) {
      this.setData({
        isLoading: false
      })
      return
    }
    this.initList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})