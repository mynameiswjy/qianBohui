import {getSubjects} from '../../api/index'

const app = getApp();

Page({
  data: {
    list: null
  },

  onLoad: function (options) {
    getSubjects({type: "firstSubject", id: 0}).then(res => {
      if (res.data.returnCode === '0000') {
        this.setData({
          list: res.data.returnData
        })
      } else {
        console.error('服务器错误')
      }
    });
  },

  onShow: function () {

  },
  navDetails(e) {
    let target = e.currentTarget.dataset
    let isSon = target.isSon
    let id = target.id
    let themeName = target.themeName
    if (isSon) {
      wx.navigateTo({
        url: `./topicUnit/topicUnit?id=${id}&themeName=${themeName}`
      })
    } else {
      wx.navigateTo({
        url: "/pages/specialExhibition/specialExhibition?id=" + id + '&themeName=' + themeName
      })
    }

  },
  onShareAppMessage: function () {

  }
})