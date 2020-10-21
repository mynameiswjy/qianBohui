import {successiveExhibitors, getStoreRCs, likeMoneyCode, getUserInfo} from '../../api/index'
var config = require("../../config.js")
var app = getApp()

Page({
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
    optionData: '',
    isLike: false,
    moneyLike: 0,
    iphoneX: app.globalData.iphoneX,
    btuBottom: '',
    isShowImg: false,
    isContinue: false,
    IsBigImg: 0
  },
  onLoad: function (options) {
    let opt = this.parseUrlParam(options)
		this.setData({
      options: options
    });
    if (this.data.iphoneX) {
      this.setData({
        btuBottom:"122rpx",
        iphoneX: app.globalData.iphoneX
      })
    }
    if (!app.globalData.header.Token) {
      wx.showModal({
        title: '温馨提示',
        content: '请先登录',
        showCancel: false,
        success(res) {
          wx.reLaunch({
            url: "/pages/mine/mine?openMask=true&isLoginSelectMask=true&moneyCode=" + options.moneyCode
          })
        }
      })
      return
    }
    if (opt) {
        this.init(opt)
    } else {
      this.init(options)
    }
    this.selectShowImg()
  },

  onShow: function () {
  },
  onReady() {
    // const data = successiveExhibitors({moneyCode: this.data.options.moneyCode,token: app.globalData.header.Token})
    // Promise.all([data]).then(path => {
    //   if (path[0].data.returnData != null) {
    //     this.initCanvas(path[0].data.returnData)
    //   }
    // })
  },
  // 数据初始化
  init(options) {
    let data = {
      moneyCode: options.moneyCode,
      token: app.globalData.header.Token
    }
    successiveExhibitors(data).then(res => {
      if (res.data.returnCode === '0000') {
        this.setData({
          obj: res.data.returnData,
          isLike: res.data.returnData.isLike,
          moneyLike: res.data.returnData.moneyLike,
        })
        this.initCanvas(res.data.returnData)
      } else if (res.data.returnCode === '3000') {
        wx.showModal({
          title: '温馨提示',
          content: '登录过期',
          showCancel: false,
          success(res) {
            wx.reLaunch({
              url: "/pages/mine/mine?openMask=true&isLoginSelectMask=true&openMask=true&isSendTo=like&moneyCode=" + options.moneyCode
            })
          }
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
    let that = this
    return new Promise(function (resolve, reject) {
      wx.getImageInfo({
        src: url,
        success: function (res) {
          that.data.isContinue = true
          resolve(res)
        },
        fail(err) {
          console.log(err);
          that.data.isContinue = false
          /*wx.showToast({
            title: '生成失败',
            icon: 'none',
            duration: 1000
          })*/
          reject(err)
        }
      })
    });
  },

  randomImg() {
    const baseUrl = config.iSDevelop ? config.DEV_BASE_URL : config.BASE_URL;
    const imgUrl = baseUrl + "/imgFile/icon/short_bg"
    let arr
    if (!this.data.IsBigImg) {
      arr = [imgUrl + "1.png",imgUrl + "2.png",imgUrl + "3.png", imgUrl + "4.png", imgUrl + "5.png"];
    } else {
      arr = [imgUrl + "6.png",imgUrl + "7.png",imgUrl + "8.png", imgUrl + "9.png", imgUrl + "10.png"];
    }
    return arr[Math.floor((Math.random() * arr.length))]
  },

  selectShowImg() {
    const arr = [0, 1];
    this.data.IsBigImg =  arr[Math.floor((Math.random() * arr.length))]
  },

  // 初始化canvas
  initCanvas(options) {
    if (this.data.isContinue) return false
    let that = this
    const SystemInfo = wx.getSystemInfoSync()
    this.data.scaleNum = (SystemInfo.windowWidth / 375).toFixed(2)
    that.setData({SystemInfo});
    const fontImg = this.promisify(options.shareUrl)
    const moneyImg = this.promisify(options.url1)
    const rahmen = this.promisify('https://www.chbice.com/imgFile/icon/rahmen_icon.png'); //相框
    const bottomBg = this.promisify('https://www.chbice.com/imgFile/icon/details_bg.png'); //底条
    const minappCode = this.promisify(this.getMinappCodeImage())
    const bg = this.promisify(this.randomImg());
    const avatar = this.promisify(options.headUrl)
    this.data.scaleNum = (SystemInfo.windowWidth / 375).toFixed(2)
    Promise.all([fontImg, moneyImg, minappCode, rahmen, bg, avatar, bottomBg]).then(res => {
      console.log(res);
      if (res.length > 0) {
        let options = {
          fontImg: res[0].path,
          moneyImg: res[1].path,
          minCodeAdd: res[2].path,
          rahmenIcon: res[3].path,
          bg: res[4].path,
          avatar: res[5].path,
          bottomBg: res[6].path
        }
        /*that.setData({
          options: options
        })*/
        if (res.length) {
          if (this.data.IsBigImg) {
            that.drawCanvas(options)
          } else {
            that.drawCanvasBig(options)
          }
        }

      }
    })
  },
  // 小程序二维码
  getMinappCodeImage() {
    let url = config.BASE_URL + '/qbh/coin/getStoreRCs.do'
    const page = 'pages/detail/detail'
    const scene = this.createUrlParam()
    url = `${url}?scene=${scene}&page=${page}`
    return url
  },
  parseUrlParam: function (options) {
    if (options.scene) {
        const scene = decodeURIComponent(options.scene).split(',')
        let params = {}
        let key = [
            "moneyCode",
            "IsShare",
            "isCode"
        ]

        for (let i = 0; i < scene.length; i++) {
            params[key[i]] = scene[i]
        }

        return params
    }
      return null
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
  // 效验token
  isGoLogin(isSendTo) {
    let that = this
    if (!app.globalData.header.Token) {
      wx.showModal({
        title: '温馨提示',
        content: '请先登录',
        showCancel: false,
        success(res) {
          wx.reLaunch({
            url: "/pages/mine/mine?openMask=true&isLoginSelectMask=true&isSendTo=" + isSendTo + "&moneyCode=" + that.data.options.moneyCode
          })
        }
      })
      return false
    } else {
      return true
    }
  },
  /*
  * 记录用户操作
  * 1: 点赞like
  * 2：转发transpond
  * 3：朋友圈moments
  * */
  recordUserClick(type) {
    let data = {
      type: type,
      moneyCode: this.data.options.moneyCode,
      token: app.globalData.header.Token
    }
    likeMoneyCode(data).then(res => {
      console.log(res);
      if (res.data.returnCode === '0000') {
        console.log('成功点赞')
      } else if (res.data.returnCode === '30000') {
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
      }
    })
  },
  /*
  *  点赞
  * */
  clickGood() {
    /*if (!this.isGoLogin('like')) {
      return
    }*/
    if (this.data.isLike) {
      wx.showModal({
        title: '温馨提示',
        content: '亲，你已经点过赞了',
        showCancel: false
      })
      return
    }
    this.recordUserClick('like')
    this.setData({
      isLike: true,
      moneyLike: this.data.moneyLike + 1
    })

  },
  // 关闭生成的图片
  closeImg() {
    this.setData({
      isShowImg: false
    })
  },
  // 保存图片 qbh/coin/getStoreRCs.do
  btnClick() {
    let that = this
    wx.showLoading({
      mask: true,
      title: '图片保存中...',
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
            that.recordUserClick('moments')
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
  drawCanvasBig(options) {
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

    // 绘制背景图
    ctx.save()
    ctx.drawImage('./short_bg6.png', 0, 0, this.scale(750/2), this.scale(1165/2))
    ctx.restore()

    // 相框的白底
    ctx.save();
    ctx.beginPath();
    this.scale(124/2, true);
    ctx.rect(this.scale(95/2), this.data.drawY, this.scale(560/2), this.scale(333/2));
    ctx.setFillStyle('#FFFFFF');
    ctx.fill();
    ctx.restore();

    // 钱币图
    ctx.save()
    this.scale(27/2, true);
    // ctx.setShadow(0, 0, 15, 'rgba(0,0,0, 0.5)')
    ctx.drawImage(options.moneyImg, this.scale(115/2), this.data.drawY, this.scale(520/2), this.scale(280/2));
    ctx.restore()

    // 相框
    ctx.save()
    ctx.drawImage(options.rahmenIcon, this.scale(115/2), this.data.drawY, this.scale(520/2), this.scale(280/2));
    this.scale(305/2, true);
    ctx.restore();

    // 字体图
    ctx.save()
    this.scale(34/2, true); //options.fontImg
    ctx.drawImage('./font.png', this.scale(305/2), this.data.drawY, this.scale(141/2), this.scale(452/2));
    this.scale(446/2, true);
    ctx.restore();

    // 二维码底部背景
    ctx.save()
    ctx.drawImage(options.bottomBg, this.scale(61/2), this.data.drawY + this.scale(49/2), this.scale(618/2), this.scale(71/2));
    ctx.restore();

    // 二维码
    ctx.save()
    this.scale(26/2, true);
    ctx.drawImage(options.minCodeAdd, this.scale(313/2), this.data.drawY, this.scale(115/2), this.scale(115/2));
    ctx.restore();

    // 用户头像
    this.userAvatar(ctx, this.scale(105/2), this.scale(35/2) + this.data.drawY, this.scale(46/2), this.scale(46/2), this.scale(30/2), options.avatar)
    // 绘制名字
    ctx.font = 'normal normal 13px PingFang SC,Microsoft Yahei,Untitled';
    ctx.setTextBaseline('bottom')
    ctx.setFillStyle('#333333')
    ctx.fillText(app.globalData.userData.NickName, this.scale(160/2), this.scale(72/2) + this.data.drawY, this.scale(138/2));

    // code text
    ctx.font = 'normal normal 14px PingFang SC,Microsoft Yahei,Untitled'
    ctx.setTextBaseline('bottom');
    ctx.setFillStyle('#333333');
    ctx.setFontSize(this.scale(22/2));
    ctx.fillText('扫码查看钱币详情', this.scale(456/2), this.scale(70/2) + this.data.drawY);
    ctx.closePath();

    setTimeout(() => {
      ctx.draw(true, () => {
        that.saveCanvasImg(width, height)
      })
    }, 200)
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

    // 绘制背景图
    ctx.save()
    ctx.drawImage(options.bg, 0, 0, this.scale(750/2), this.scale(750/2))
    ctx.restore()

    // 用户头像
    this.userAvatar(ctx, this.scale(470/2), this.scale(50/2), this.scale(60/2), this.scale(60/2), this.scale(30/2), options.avatar)
    // 绘制名字
    ctx.font = 'normal normal 13px PingFang SC,Microsoft Yahei,Untitled';
    ctx.setTextBaseline('bottom')
    ctx.setFillStyle('#BFA267')
    ctx.fillText(app.globalData.userData.NickName, this.scale(540/2), this.scale(95/2), this.scale(144/2));

    // 字体图
    ctx.save()
    this.scale(41/2, true); //options.fontImg
    ctx.drawImage('./font.png', this.scale(44/2), this.data.drawY, this.scale(129/2), this.scale(446/2));
    this.scale(446/2, true);
    ctx.restore();

    // 相框的白底
    ctx.save();
    ctx.beginPath();
    this.scale(40/2, true);
    ctx.rect(this.scale(90/2), this.data.drawY, this.scale(561/2), this.scale(333/2));
    ctx.setFillStyle('#FFFFFF');
    ctx.fill();
    ctx.restore();

    // 钱币图
    ctx.save()
    this.scale(29/2, true);
    // ctx.setShadow(0, 0, 15, 'rgba(0,0,0, 0.5)')
    ctx.drawImage(options.moneyImg, this.scale(111/2), this.data.drawY, this.scale(521/2), this.scale(280/2));
    ctx.restore()

    // 相框
    ctx.save()
    ctx.drawImage(options.rahmenIcon, this.scale(111/2), this.data.drawY, this.scale(521/2), this.scale(280/2));
    this.scale(304/2, true);
    ctx.restore();

    // 二维码
    ctx.save()
    this.scale(60/2, true);
    ctx.drawImage(options.minCodeAdd, this.scale(313/2), this.data.drawY, this.scale(114/2), this.scale(114/2));
    this.scale(100/2, true);
    ctx.restore();

    // code text
    ctx.font = 'normal normal 14px PingFang SC,Microsoft Yahei,Untitled'
    ctx.setTextBaseline('bottom');
    ctx.setFillStyle('#BFA267');
    ctx.setTextAlign('center');
    this.scale(30/2, true);
    ctx.setFontSize(this.scale(22/2, true));
    ctx.fillText('扫码查看钱币详情', width/2, this.data.drawY);
    ctx.closePath();

    setTimeout(() => {
      ctx.draw(true, () => {
        that.saveCanvasImg(width, height)
      })
    }, 200)
  },

  dispose(ctx, text) {
    let chr = text.split("");//这个方法是将一个字符串分割成字符串数组
    let temp = "";
    let row = [];
    for (let a = 0; a < chr.length; a++) {
      if (ctx.measureText(temp).width < 250) {
        temp += chr[a];
      }
      else {
        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
        row.push(temp);
        temp = "";
      }
    }
  },

  userAvatar(ctx, x, y, w, h, r, avatar) {
    ctx.save()
    ctx.beginPath()
    ctx.setLineWidth(10)
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI*1.5)
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
    ctx.setFillStyle('#bfa')
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(avatar, x, y, w, h)
    ctx.restore()
  },

  // 预览图片
  lookImg() {
    wx.previewImage({
      urls: [this.data.tempFilePath],
      success(res) {
        console.log(res);
      }
    })
  },
  // 点击生成图片
  shareFriend() {
    wx.showLoading({
      mask: true,
      title: '海报正在生成中',
    })
    if (this.data.tempFilePath) {
      wx.hideLoading()
      this.setData({
        tempFilePath: this.data.tempFilePath
      })
    } else {
      this.initCanvas(this.data.obj)
    }
    this.setData({
      isShowImg: true
    })
  },
  saveCanvasImg(width, height) {
    let that = this
    setTimeout(() => {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        canvasId: 'canvasShare',
        quality: 1,
        success(res) {
          wx.hideLoading()
          that.setData({
            tempFilePath: res.tempFilePath
          })
        },
        fail(err) {
          wx.hideLoading()
          wx.showToast({
            title: '生成图片失败',
            icon: 'none',
            duration: 1000
          })
          console.log('err', err)
          console.log('生成图片失败')
        },
        complete(res) {
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
      path: path,
      success() {
        that.recordUserClick("transpond")
      }
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
    ctx.setShadow(0, 0, 15, 'rgba(0,0,0, 0.2)')
    // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
    // 这里是使用 fill 还是 stroke都可以，二选一即可
    // ctx.setFillStyle('transparent')
    ctx.setStrokeStyle('transparent')
    ctx.setGlobalAlpha(0)
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
  test() {
  },
  goHome() {
    wx.switchTab({
      url: "/pages/index/index"
    })
  }
})