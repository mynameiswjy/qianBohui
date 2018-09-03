import {successiveExhibitors, getStoreRCs, likeMoneyCode} from '../../api/index'
var config = require("../../config.js")
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    obj: {},
    Avatar: 'https://weixin.566.com/BizImage/Avatar/default_photo.png',// app.globalData.userData.Avatar ||
    windowWidth: 0, // 可使用窗口宽度
    windowHeight: 0, // 可使用窗口高度
    ratio: 0, // 根据尺寸动态计算 1px换算成多少rpx
    options: null,
    scaleNum: '',
    drawY: 0,
    tempFilePath: '',
    NickName: app.globalData.userData.NickName,
    IsShare: '',
    optionData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init(options)
    this.setData({
      options: options
    });
    this.getMinappCodeImage()
    console.log(app.globalData.header.Token)
  },

  onShow: function () {
  
  },
  onReady() {
    const data = successiveExhibitors({moneyCode: this.data.options.moneyCode})
    Promise.all([data]).then(path => {
      if (path[0].data.returnData != null) {
        this.initCanvas(path[0].data.returnData)
      }
    })
  },
  // 数据初始化
  init(options) {
    successiveExhibitors({moneyCode: options.moneyCode}).then(res => {
      if (res.data.returnCode === '0000') {
        this.setData({
          obj: res.data.returnData
        })
      }
    })
  },
  scale(num, add = false) {
    let countNum = Number((num * this.data.scaleNum).toFixed(2))
    if (add) {
      this.data.drawY += countNum
    }

    return countNum
  },
  promisify(url) {
    return new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: url,
        success: function (res) {
          resolve(res)
        },
        fail(err) {
          console.log(err);
          reject(err)
        }
      })
    });
  },
  // 初始化canvas
  initCanvas(options) {
    let that = this
    const SystemInfo = wx.getSystemInfoSync()
    this.data.scaleNum = (SystemInfo.windowWidth / 375).toFixed(2)
    that.setData({SystemInfo})
    const fontImg = this.promisify(options.shareUrl)
    const moneyImg = this.promisify(options.url1)
    // const minappCode = this.promisify("http://pic.96u.com/Uploads/Picture/2018-01-28/5a6d370cd64a4.jpg")
    this.data.scaleNum = (SystemInfo.windowWidth / 375).toFixed(2)
    Promise.all([fontImg, moneyImg]).then(res => {
      console.log(res);
      if (res.length > 0) {
        let options = {
          fontImg: res[0].path,
          moneyImg: res[1].path
        }
        /*that.setData({
          options: options
        })*/
        if (that.data.options) {
          that.drawCanvas(options)
        }

      }
    })
  },
  // 效验token
  isGoLogin() {
    if (!app.globalData.header.Token) {
      wx.showModal({
        title: '温馨提示',
        content: '请先登录',
        showCancel: false,
        success(res) {
          wx.reLaunch({
            url: "/pages/mine/mine?openMask=true&isLoginSelectMask=true&openMask=true"
          })
        }
      })
      return false
    } else {
      return true
    }
  },
  /*
  *  点赞
  * 1: 点赞like
  * 2：转发transpond
  * 3：朋友圈moments
  * */
  clickGood() {
    if (!this.isGoLogin()) {
      return
    }
    let data = {
      type: 'like',
      moneyCode: this.data.options.moneyCode,
      token: app.globalData.header.Token
    }
    likeMoneyCode(data).then(res => {
      console.log(res);
      if (res.data.returnCode === '0000') {
        console.log('成功点赞')
      } else if (res.data.returnCode === '30000') {
        wx.reLaunch({
          url: "/pages/mine/mine?openMask=true&isLoginSelectMask=true&openMask=true"
        })
      }
    })
  },
  // 小程序二维码
  getMinappCodeImage() {
    let url = config.BASE_URL + '/qbh/coin/getStoreRCs.do'
    const page = ' '
    const scene = {
      "moneyCode": this.options.moneyCode,
      "IsShare": 1
    }
    let data = {
      page: page,
      scene: ' ' , // this.createUrlParam()
    }
    getStoreRCs(data).then(res => {
      console.log(res);
    })
  },
  createUrlParam: function () {
    let params = ''
    let options = {
      "moneyCode": this.options.moneyCode,
      "IsShare": 1,
      "isCode": 1
    }
    for (var key in options) {
      params += options[key] + ','
    }
    return params
  },
  // 保存图片 qbh/coin/getStoreRCs.do
  btnClick() {
    let that = this
    wx.showLoading({
      mask: true,
      title: '加载中',
    })
    wx.getImageInfo({
      src: that.data.tempFilePath,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.path,
          success(res) {
            wx.hideLoading()
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000
            })
          },
          fail() {
            wx.showToast({
              title: '保存失败',
              icon: 'none',
              duration: 1000
            })
          }
        })
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  drawCanvas(options) {
    const ctx = wx.createCanvasContext('canvasShare', this)
    const that = this
    let width = this.data.SystemInfo.windowWidth
    let height = this.data.SystemInfo.windowHeight
    // 名称背景
    ctx.save()
    ctx.beginPath()
    ctx.rect(0, 0, width, height)
    ctx.setFillStyle('#FFFFFF')
    ctx.fill()
    ctx.restore()
    // 绘制背景
    ctx.save()
    ctx.drawImage('./bg.png', 0, 0, width, this.scale(787/2))
    ctx.restore()

    // 绘制名字
    ctx.beginPath()
    ctx.font = 'normal normal 17px PingFang SC,Microsoft Yahei,Untitled'
    ctx.setTextBaseline('bottom')
    ctx.setFillStyle('#040000')
    ctx.setTextAlign('center')
    this.scale(40/2, true)
    ctx.setFontSize(this.scale(34/2, true))
    ctx.fillText('迈克', this.scale(624/2), this.data.drawY)// this.data.NickName
    ctx.closePath()

    // 短线
    ctx.save()
    ctx.beginPath()
    ctx.setStrokeStyle('#232323')
    this.scale(15/2,true)
    ctx.setLineWidth(this.scale(4/2,true), true)
    ctx.moveTo(this.scale(601/2),  this.data.drawY)
    ctx.lineTo(this.scale(647/2), this.data.drawY)
    ctx.stroke()

    // 字体图
    ctx.save()
    this.scale(50/2, true)
    ctx.drawImage(options.fontImg, this.scale(503/2), this.data.drawY, this.scale(160/2), this.scale(465/2))
    this.scale(481/2, true)
    ctx.stroke()
    ctx.restore()

    // 钱币图
    ctx.save()
    this.scale(38/2, true)//0px 0px 21px rgba(198,160,86,1)
    this.roundRect(ctx, this.scale(137/2), this.data.drawY,  this.scale(475/2), this.scale(245/2), this.scale(20/2))
    ctx.drawImage(options.moneyImg, this.scale(137/2), this.data.drawY, this.scale(475/2), this.scale(245/2))
    this.scale(252/2, true)
    ctx.stroke()
    ctx.restore()

    // title
    ctx.beginPath()
    ctx.setTextBaseline('bottom')
    ctx.setFillStyle('#212024')
    ctx.setTextAlign('center')
    this.scale(50/2, true)
    ctx.setFontSize(this.scale(28/2, true))
    ctx.fillText('中国金币云展室', width/2, this.data.drawY)
    ctx.closePath()

    // title right线
    ctx.save()
    ctx.beginPath()
    ctx.setStrokeStyle('#232323')
    // ctx.setLineWidth(this.scale(10/2,true), true)
    ctx.moveTo(this.scale(478/2),  this.data.drawY)
    ctx.lineTo(this.scale(495/2), this.data.drawY)
    ctx.stroke()

    // title left线
    ctx.save()
    ctx.beginPath()
    ctx.setStrokeStyle('#232323')
    ctx.setLineWidth(this.scale(1/2,true), true)
    ctx.moveTo(this.scale(270/2),  this.data.drawY)
    ctx.lineTo(this.scale(489/2), this.data.drawY)
    ctx.stroke()

    // 二维码
    ctx.save()
    this.scale(50/2, true)
    ctx.drawImage(options.moneyImg, this.scale(286/2), this.data.drawY, this.scale(155/2), this.scale(155/2))
    this.scale(155/2, true)
    ctx.stroke()
    ctx.restore()

    ctx.draw(true, () => {
      that.saveCanvasImg(width, height)
    })
  },
  saveCanvasImg(width, height) {
    let that = this
    setTimeout(() => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: width,
        height: height,
        destWidth: width * 3,
        destHeight: height * 3,
        canvasId: 'canvasShare',
        quality: 1,
        success(res) {
          console.log(res)
          that.setData({
            tempFilePath: res.tempFilePath
          })
        },
        fail(err) {
        },
        complete(res) {
          console.log('res==========>>>>>', res)
        }
      })
    }, 200)
  },
  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function () {
    var that = this;
    var path = "/pages/detail/detail"
    var subjectParam = this.generateShareOptions();
    path += '?' + subjectParam;
    return {
      title: '中国金币云展室',
      path: path
    };
  },
  generateShareOptions: function () {
    var that = this;
    var query = "IsShare=1";
    query += '&moneyCode=' + that.data.options.moneyCode;
    return query;
  },
  /**
    *
    * @param {CanvasContext} ctx canvas上下文
    * @param {number} x 圆角矩形选区的左上角 x坐标
    * @param {number} y 圆角矩形选区的左上角 y坐标
    * @param {number} w 圆角矩形选区的宽度
    * @param {number} h 圆角矩形选区的高度
    * @param {number} r 圆角的半径
    */
  roundRect(ctx, x, y, w, h, r) {
    // 开始绘制
    ctx.beginPath()
    ctx.setStrokeStyle('#fff')
    ctx.setShadow(0, 0, 21, 'rgba(0,0,0, 0.15)')
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    // 这里是使用 fill 还是 stroke都可以，二选一即可
    ctx.setFillStyle('transparent')
    // ctx.setStrokeStyle('transparent')
    // 左上角
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

    // border-top
    ctx.moveTo(x + r, y)
    ctx.lineTo(x + w - r, y)
    ctx.lineTo(x + w, y + r)
    // 右上角
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

    // border-right
    ctx.lineTo(x + w, y + h - r)
    ctx.lineTo(x + w - r, y + h)
    // 右下角
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

    // border-bottom
    ctx.lineTo(x + r, y + h)
    ctx.lineTo(x, y + h - r)
    // 左下角
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

    // border-left
    ctx.lineTo(x, y + r)
    ctx.lineTo(x + r, y)

    // 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
    // ctx.fill()
    ctx.stroke()
    ctx.closePath()
    // 剪切
    ctx.clip()
  },
  goHome() {
    wx.switchTab({
      url: "/pages/index/index"
    })
  }
})