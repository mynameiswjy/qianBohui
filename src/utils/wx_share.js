import wx from 'weixin-js-sdk'

function wxShareTemp(sd, data) {
  console.log(sd);
  // alert(window.location.href)
  let links = sd.url; //分享出去的链接
  let title = '向您推荐：' + data.name + '的活动微站'; //分享的标题
  let desc = '关注' + data.name + '有新活动通知您'; //分享的详情介绍
  let imgUrl = data.img || './share.jpg';
  wx.config({
    debug: true,
    appId: sd.appId,
    timestamp: sd.timestamp,
    nonceStr: sd.noncestr,
    signature: sd.signature,
    jsApiList: [
      'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'
    ]
  });
  wx.ready(function () {
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        this.$message.success("成功分享到朋友圈")
      },
      cancel: function () {
        // alert("分享失败,您取消了分享!")
        this.$message.error("分享失败,您取消了分享!")
      }
    });
    //微信分享菜单测试
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        this.$message.success("成功分享给朋友")
      },
      cancel: function () {
        // alert("分享失败,您取消了分享!")
        this.$message.error("分享失败,您取消了分享!")
      }
    });

    wx.onMenuShareQQ({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        this.$message.success("成功分享到QQ")
      },
      cancel: function () {
        this.$message.error("分享失败,您取消了分享!")
      }
    });
    wx.onMenuShareWeibo({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        this.$message.success("成功分享到腾讯微博")
      },
      cancel: function () {
        this.$message.error("分享失败,您取消了分享!")
      }
    });
    wx.onMenuShareQZone({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: links, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success: function () {
        this.$message.success("成功分享到QQ空间")
      },
      cancel: function () {
        this.$message.error("分享失败,您取消了分享!")
      }
    });
  });
  wx.error(function(err) {
    // alert("error")
    console.log(err)
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  });
}

export {
  wxShareTemp
}
