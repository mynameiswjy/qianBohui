import {getMoneyList} from '../../api/index'

var app = getApp()

Page({
  data: {
    pageIndex: 1,
    list: [],
    pageNum: '',
    isSend: true,
    isLoading: true,
    IsShowTxt: false,
    isOpenClose: false
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
  closeVideo() {
    this.setData({
      isOpenClose: false
    })
  },
  openVideo() {
    this.setData({
      isOpenClose: true
    })
  },
  goToDetailsPage(e) {
    console.log(e.currentTarget.dataset.moneyCode);
    let moneyCode = e.currentTarget.dataset.moneyCode
    wx.navigateTo({
      url: "/pages/detail/detail?moneyCode=" + moneyCode
    })
  },

  playMusic: function() {
    let audio = null;
    let manager = wx.getBackgroundAudioManager();
    manager.title = "音频标题";
    manager.epname = "专辑名称";
    manager.singer = "歌手名";
    // manager.coverImgUrl = audio.poster;
    // 设置了 src 之后会自动播放
    manager.src = 'https://www.chbice.com/imgFile/202011031355331111.mp3';
    manager.currentTime = 0;
    let that = this;
    manager.onPlay(function() {
      console.log("======onPlay======");
      that.setData({
        playStatus: true
      })
      // that.countTimeDown(that, manager);
    });
    manager.onPause(function() {
      that.setData({
        playStatus: false
      })
      console.log("======onPause======");
    });
    manager.onEnded(function() {
      console.log("======onEnded======");
      that.setData({
        playStatus: false
      })
      setTimeout(function() {
        // that.nextMusic();
      }, 1500);
    });
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
});