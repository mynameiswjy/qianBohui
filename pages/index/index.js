import {index} from '../../api/index'

var app = getApp()

Page({

  data: {
    array: ['美国', '中国', '巴西', '日本'],
    valHot: '热门',
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
    isLoading: true
  },
  onLoad: function (options) {
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
        let MemorialMoney = this.data.MemorialMoney.concat(data.MemorialMoney)
        this.data.pageNum = data.pageNum
        this.setData({
          dataSet: data,
          MemorialMoney: MemorialMoney,
          hotList: hotList,
          isSend:true,
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
  hotSelect(e) {
    var index = e.detail.value
    let data = this.data.dataSet.selectItem
    let valHotToList = data[index].submenu.map(item => {
      return item.name
    })
    if (this.data.parentType != data[index].code) {
      this.data.parentType = data[index].code
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
  hotSelectTo(e) {
    var index = e.detail.value
    let idx = this.data.indexHot
    let data = this.data.dataSet.selectItem[idx].submenu
    if (this.data.seedtType != data[index].code) {
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
    this.data.pageIndex++
    if (this.data.pageNum < this.data.pageIndex) {
      this.setData({
        isLoading: false
      })
      return
    }
    this.initList()
  },
})