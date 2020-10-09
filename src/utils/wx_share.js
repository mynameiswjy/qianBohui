import wx from 'weixin-js-sdk'
import { baseUrl } from '../api/index'
import { getURLParams } from './utils'

function wxShareTemp(sd, data, IsAd = false) {
  let desc = IsAd ? '100%中奖，给你牛年小幸运' : '分享发现，传递价值！欢迎参加北京国际钱币博览会';
  let links = sd.url; //分享出去的链接
  let title = data.title; //分享的标题
  let imgUrl = IsAd ? 'https://www.chbice.com/imgFile/ico/20201009151231.jpg' : sd.img;
  wx.config({
    debug: false,
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

function againUrl(path, code) {
  let from = getURLParams('from')
  let isappinstalled = getURLParams('isappinstalled')
  if (from != null || isappinstalled != null) {
    if (code) {
      window.location.href = baseUrl + '/web/index.html#' + path + '?code=' + code
      // window.location.href = 'http://192.168.1.5:8080/#' + path + '?code=' + code
    } else {
      window.location.href = baseUrl + '/web/index.html#' + path
      // window.location.href = 'http://192.168.1.5:8080/#' + path
    }
    return false
  } else {
  }
}
function againUrlAd(path, code) {
  let from = getURLParams('from')
  let isappinstalled = getURLParams('isappinstalled')
  if (from != null || isappinstalled != null) {
    if (code) {
      window.location.href = baseUrl + '/por/index.html#' + path + '?isShare=' + code
      // window.location.href = 'http://192.168.1.5:8080/#' + path + '?code=' + code
    } else {
      window.location.href = baseUrl + '/por/index.html#' + path
      // window.location.href = 'http://192.168.1.5:8080/#' + path
    }
    return false
  } else {
  }
}

export {
  wxShareTemp,
  againUrl,
  againUrlAd
}
