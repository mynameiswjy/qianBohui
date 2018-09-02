var config = require('../../../config.js')
var app = getApp()

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    themeId: {
      type: String,
      value: null
    },
    circleId: {
      type: String,
      value: null
    },
  },
  data: {
    Avatar: 'https://weixin.566.com/BizImage/Avatar/default_photo.png',// app.globalData.userData.Avatar ||
		windowWidth: 0, // 可使用窗口宽度
		windowHeight: 0, // 可使用窗口高度
		ratio: 0, // 根据尺寸动态计算 1px换算成多少rpx
    NickName: app.globalData.userData.NickName,
    options: null,
		scaleNum: '',
		drawY: 0,
		tempFilePath: ''
	},
  /*
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   * */
  attached() {
    this.setData({
      UserId: app.globalData.header.UserId,
    })
  },

  /*
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   * */

  ready() {
    this.initCanvas()
	},
  methods: {
    initCanvas() {
      let that = this
			const userAvatar = this.promisify(that.data.Avatar)
			const MinappCode = this.promisify(this.getMinappCodeImage())
			const SystemInfo = wx.getSystemInfoSync()
			that.setData({SystemInfo})
			this.data.scaleNum = (SystemInfo.windowWidth / 375).toFixed(2)
			Promise.all([userAvatar, MinappCode]).then(res => {
				console.log('res', res);
				if (res.length > 0) {
				  let options = {
				    userAvatar: res[0].path,
						minappCode: res[1].path
          }
					that.setData({
						options: options
          })
          if (that.data.options) {
						that.draw(options)
          }

        }
			})
    },
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
		scale(num, add = false) {
			let countNum = Number((num * this.data.scaleNum).toFixed(2))
			if (add) {
				this.data.drawY += countNum
			}

			return countNum
		},
    draw(options) {
			const ctx = wx.createCanvasContext('shareCanvas', this)
			const that = this
			let width = this.data.SystemInfo.windowWidth
			let height = this.data.SystemInfo.windowHeight
			// 绘制背景
			ctx.save()
			ctx.drawImage('./bg.png', 0, 0, width, height)
			ctx.restore()

			// 绘制名字
			ctx.beginPath()
			ctx.font = 'normal normal 17px PingFang SC,Microsoft Yahei'
			ctx.setTextBaseline('bottom')
			ctx.setFillStyle('#4e4e4e')
			this.scale(145/2, true)
			ctx.setFontSize(this.scale(17, true))
			ctx.fillText(that.data.NickName, this.scale(198/2), this.data.drawY)
			ctx.closePath()

			// 绘制头像
			ctx.save()
			ctx.beginPath()
			this.scale(12/2,true)
			ctx.arc(this.scale(124/2), this.data.drawY - this.scale(4), this.scale(50/2), 0, Math.PI * 2, false);
			ctx.setStrokeStyle('#ffffff')
			ctx.clip();
			ctx.drawImage(options.userAvatar, this.scale(74/2), this.data.drawY-this.scale(54/2), this.scale(100/2), this.scale(100/2))
			ctx.stroke()
			ctx.closePath()
			ctx.restore()

			// 考试时间
			ctx.save()
			ctx.setFillStyle('#9A9A9A')
			ctx.setTextBaseline('bottom')
			ctx.setFontSize(this.scale(24/2,true))
			this.scale(12/2, true)
			ctx.fillText('考试时间 :  2018-07-21', this.scale(198/2), this.data.drawY)
			ctx.restore()

			// 成绩单title
			ctx.save()
			ctx.setFillStyle('#4a4a4a')
			ctx.setFontSize(this.scale(40/2,true))
			ctx.setTextAlign('center')
			this.scale(94/2, true)
			ctx.fillText('我的成绩单', width/2, this.data.drawY)
			ctx.restore()

			// 名称背景
			ctx.save()
			ctx.beginPath()
			this.scale(52/2, true)
			ctx.rect(this.scale(15), this.data.drawY, this.scale(690/2), this.scale(45))
			ctx.setFillStyle('#FAFAFA')
			ctx.fill()
			ctx.restore()

			// 类目
			ctx.save()
			ctx.setFillStyle('#4a4a4a')
			ctx.setFontSize(this.scale(28/2,true))
			ctx.setTextAlign('center')
			this.scale(31/2, true)
			ctx.fillText('科目', width/4, this.data.drawY)
			ctx.fillText('成绩', width/4*3, this.data.drawY)
			ctx.restore()

			// 动态list
			this.publicList(ctx, width, 68, {name: '建筑工程', num: 98})
			this.publicList(ctx, width, 31, {name: '机电工程', num: 88})
			this.publicList(ctx, width, 31, {name: '市政工程', num: 68})

			// 结语
			ctx.save()
			ctx.setFillStyle('#6FCE29')
			ctx.setFontSize(this.scale(24/2,true))
			ctx.setTextAlign('center')
			this.scale(40/2, true)
			ctx.fillText('二建查分通道限时开启中...', width/2, this.data.drawY)
			ctx.restore()

			// 结语线
			ctx.save()
			ctx.beginPath()
			ctx.setStrokeStyle('#EBEBEB')
			this.scale(48/2,true)
			ctx.setLineDash([1, 3], 5);
			ctx.setLineWidth(this.scale(1/2,true))
			ctx.moveTo(this.scale(30/2),  this.data.drawY)
			ctx.lineTo(this.scale(720/2), this.data.drawY)
			ctx.stroke()

			// 小程序二维码
			ctx.save()
			this.scale(26/2, true)
			ctx.drawImage(options.minappCode, this.scale(535/2), this.data.drawY, this.scale(140/2), this.scale(140/2))
			ctx.stroke()
			ctx.restore()

			// LOGO
			ctx.save()
			this.scale(19/2, true)
			ctx.drawImage('./logo.png', this.scale(75/2), this.data.drawY, this.scale(200/2), this.scale(99/2))
			ctx.stroke()
			ctx.restore()

			ctx.draw(true, () => {
				this.saveCanvasImg(width, height)
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
					canvasId: 'shareCanvas',
					quality: 1,
					success(res) {
						that.setData({
							tempFilePath: res.tempFilePath
						})
					},
					fail(err) {
					},
					complete(err) {
					}
				}, this)
			}, 200)
		},
    publicList(ctx, width, scale, data) {

    	// 展示内容
			ctx.save()
			ctx.setFillStyle('#4e4e4e')
			ctx.setFontSize(this.scale(28/2,true))
			ctx.setTextAlign('center')
			this.scale(scale/2, true)
			ctx.fillText(data.name, width/4, this.data.drawY)
			ctx.fillText(data.num, width/4*3, this.data.drawY)
			ctx.restore()

			// 画线
			ctx.save()
			ctx.beginPath()
			ctx.setStrokeStyle('#EBEBEB')
			this.scale(43/2,true)
			ctx.setLineWidth(this.scale(1.5/2,true))
			ctx.moveTo(this.scale(60/2),  this.data.drawY)
			ctx.lineTo(this.scale(720/2), this.data.drawY)
			ctx.stroke()
		},
		getMinappCodeImage() {
			let url = config.BASE_URL + '/api/checkin/GetMinAppCodeImage'
			const page = 'pages/examInfo/examInfo/examInfo'
			const scene = this.createUrlParam()
			const data = {
				scene: scene,
				packageId: config.DefaultHeader.PackageId
			}
			url = `${url}?scene=${scene}&page=${page}&packageId=${data.packageId}`
			return url
		},
		createUrlParam: function () {
			const circleId = this.data.circleId;
			let params = ''

			let options = {
				"IsShare": 1,
				"SubjectParentId": app.globalData.header.SubjectParentId,
				"SubjectLevel": app.globalData.header.SubjectLevel,
				"SubjectId": app.globalData.header.SubjectId,
				"UserAreaId": app.globalData.userArea.UserAreaId,
				"InstitutionAreaId": app.globalData.userArea.InstitutionAreaId,
				"pageIndex": 3,
				"isCode": 1
			}


			for (var key in options) {
				params += options[key] + ','
			}
			return params
		},

  }

})