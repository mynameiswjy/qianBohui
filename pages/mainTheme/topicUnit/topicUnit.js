import {getSubjects} from '../../../api/index'
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.themeName
    })
    getSubjects({type: "secondSubject", id: options.id}).then(res => {
      console.log(res.data);
      if (res.data.returnCode === '0000') {
        this.setData({
          list: res.data.returnData
        })
      } else {
        console.error('服务器错误')
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  navDetails(e) {
    let target = e.currentTarget.dataset
    let id = target.id
    let themeName = target.themeName
    wx.navigateTo({
      url: "/pages/specialExhibition/specialExhibition?id=" + id + '&themeName=' + themeName
    })

  },
  onShareAppMessage: function () {

  }
})