import {getSubjects} from '../../api/index'

const app = getApp();

Page({
  data: {
    list: null,
    currentIdx: 0,
    isOpenClose: false,
    videoUrl: null
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

  playBtn(e) {
    const {idx} = e.currentTarget.dataset;
    const videoUrl = this.data.list[idx].videoUrl;
    if (!videoUrl) {
      wx.showModal({
        title: '温馨提示',
        content: '这个视频是空的',
        showCancel: false
      })
      return
    }
    this.setData({
      videoUrl: videoUrl,
      isOpenClose: true
    })
  },

  swiperChange(e) {
    const index = e.detail.current;
    this.setData({
      currentIdx: index
    })
  },

  closeVideo() {
    this.setData({
      isOpenClose: false
    })
  },

  onShareAppMessage: function () {

  }
})