<template>
    <div class="download_wrap">
      <ul>
        <li class="download_item" v-for="(item, index) in downloadList" :key="index">
          <div class="left">
            <h2>{{item.name}}</h2>
            <p>{{item.endTime}}</p>
          </div>
          <div class="download_btn" @click="downloadBtn(index)">下载</div>
        </li>
      </ul>
      <div class="download_mask" v-if="IsOpenDownloadMask" @click="closeMask">
        <div class="mask_content" @click.stop="stopClick">
          <h2>文件下载</h2>
          <p class="p" v-if="endTime">文件有效期{{endTime}}</p>
          <div class="mask_bottom">
            <div
              class="mask_bottom_btn"
              :class="{'margin_r': currentData.access.linkUrl}"
              @click="copyQQCode"
              v-if="currentData.access.qqCode"
            >
              <img src="https://www.chbice.com/imgFile/icon/qq_url.png" alt="">
              <p class="p1">获取管理员QQ号</p>
            </div>
            <div
              class="mask_bottom_btn"
              ref="copyLink"
              :data-clipboard-text="currentData.access.link"
              @mouseenter="copyLinkBtn"
              @click="copyLinkBtn"
              v-if="currentData.access.linkUrl"
            >
              <img src="https://www.chbice.com/imgFile/icon/copy_url.png" alt="">
              <p class="p1">复制私密链接</p>
            </div>
          </div>
        </div>
      </div>
      <div class="download_mask" v-if="IsOPenMaskTemp">
        <div class="copy_mask">
          <h2>提示</h2>
          <p>{{IsQQBtn?'QQ：'+currentData.access.qqCode:'链接密码'+currentData.access.link.keywords}}</p>
          <div class="download_mask_btn" v-if="IsQQBtn">
            <div class="cancel" @click="maskCancelBtn">取消</div>
            <div
              class="mask_confirm"
              ref="copyBtn"
              :data-clipboard-text="currentData.access.qqCode"
              @mouseenter="maskConfirmBtn"
              @click="maskConfirmBtn"
            >复制</div>
          </div>
          <div v-else class="download_mask_btn">
            <div
              class="mask_confirm"
              @click="copyUrlBtn"
              ref="likeUrlNode"
              :data-clipboard-text="currentData.access.link.keywords"
              @mouseenter="copyUrlBtn"
            >复制</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {downloadList} from "@/api/index"
import {MessageBox} from "mint-ui"

export default {
  name: "downloadList",
  data() {
    return {
      downloadList: null,
      IsOpenDownloadMask: false,
      currentData: null,
      endTime: null,
      currentQQ: '',
      IsOPenMaskTemp: false,
      IsQQBtn: false
    }
  },
  created() {
  },
  mounted() {
    this.initList()
  },
  methods: {
    maskCancelBtn() { // 弹窗取消按钮
      this.IsOpenDownloadMask = false;
      this.IsOPenMaskTemp = false;
      this.IsQQBtn = false
    },
    maskConfirmBtn() { // 弹窗确定按钮
      if (this.IsQQBtn) {
        this.copyBtn(this.$refs.copyBtn);
        // this.IsQQBtn = false;
        this.IsOPenMaskTemp = false;
      }
    },
    copyUrlBtn() { // 复制百度云链接密码
      this.IsOPenMaskTemp = true;
      this.copyBtn(this.$refs.likeUrlNode)
    },
    copyQQCode() {
      this.IsOPenMaskTemp = true;
      this.IsQQBtn = true
    },
    copyLinkBtn() {
      MessageBox({
        title: '提示',
        message: '是否跳转百度云链接？',
        showConfirmButton: true,
        showCancelButton: true
      }).then((res) => {
        if (res === 'confirm') {
          if (this.currentData.access.link.keywords) {
            this.IsOPenMaskTemp = true;
          } else {
            window.location.href = this.currentData.access.link.url
          }
        }
        this.IsOpenDownloadMask = false;
      })
    },
    copyBtn(ref) {
      const _this = this;
      let clipboard = new this.Clipboard(ref); //在main.js中引用
      clipboard.on("success", e => {
        _this.IsOpenDownloadMask = false;
        _this.$message({
          message: '复制成功',
          type: 'success'
        });
        if (!this.IsQQBtn) {
          window.location.href = this.currentData.access.link.url;
          this.IsOPenMaskTemp = false;
        } else {
          this.IsQQBtn = false
        }
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        _this.IsOpenDownloadMask = false
        // 不支持复制
        _this.$message({
          message: '该浏览器不支持自动复制!',
          type: 'warning'
        });
        // 释放内存
        clipboard.destroy();
      });
    },
    initList() {
      downloadList().then(res => {
        const data = res.data;
        if (data.returnCode === '0000') {
          this.downloadList = data.returnData;
        }
      })
    },
    downloadBtn(idx) {
      let downloadList = this.downloadList[idx];
      this.endTime = downloadList.endTime;
      this.currentQQ = downloadList.access.qqCode;
      if (downloadList.access.linkPassword && downloadList.access.linkUrl) {
        downloadList.access.link = {
          url: downloadList.access.linkUrl,
          keywords: downloadList.access.linkPassword
        }
      } else if (downloadList.access.linkUrl) {
        downloadList.access.link = {
          url: downloadList.access.linkUrl
        }
      }
      if (downloadList.access.qqCode) {
        downloadList.access.qqCode = downloadList.access.qqCode
      }
      this.currentData = downloadList;
      this.IsOpenDownloadMask = true
    },
    closeMask() {
      this.IsOpenDownloadMask = false
    },
    stopClick() {}
  }
}
</script>

<style scoped lang="stylus">
  .margin_r {
    margin-right: .89rem
  }
  .download_wrap
    width 7.5rem
    position fixed
    top 0
    bottom 0
    background-color #fff
    .download_item
      display flex
      justify-content space-between
      padding .2rem 0
      margin 0 .3rem
      align-items center
      border-bottom .01rem solid #e6e6e6
      .left
        h2
          font-size .32rem
          color #333
          line-height .46rem
          margin-bottom .1rem
          font-weight 600
        p
          font-size .28rem
          line-height .4rem
          color #999
    .download_btn
      width 1.2rem
      height .6rem
      border-radius .1rem
      font-size .36rem
      color #fff
      text-align center
      line-height .6rem
      background: #BFA267
    .download_mask
      position fixed
      top 0
      bottom 0
      width 7.5rem
      background-color rgba(0,0,0, .4)
      .copy_mask
        width 6rem
        background-color #fff
        position absolute
        left 50%
        top 50%
        transform translate(-50%, -50%)
        border-radius .2rem
        padding-top 0.4rem
        padding-bottom .4rem
        .download_mask_btn
          display flex
          font-size .3rem
          justify-content center
          margin-top .5rem
          .cancel, .mask_confirm
            width 1.5rem
            height .8rem
            background-color #BFA267
            text-align center
            border-radius .4rem
            line-height .8rem
            color #fff
          .cancel
            margin-right .3rem
            background-color #999
        h2
          font-size .35rem
          font-weight bold
          text-align center
          margin-bottom .3rem
        p
          text-align center
          font-size .3rem
      .mask_content
        width 6.9rem
        padding 0 .3rem
        position absolute
        bottom 0
        background-color #fff
        h2
          font-size .36rem
          line-height .52rem
          padding .24rem 0 .16rem .3rem
          font-weight 600
        .p
          font-size .28rem
          color #999
          line-height .4rem
          padding 0 .3rem .24rem .3rem
          border-bottom .01rem solid #f2f2f2
        .mask_bottom
          display flex
          justify-content center
          padding .24rem 0 .34rem
          .mask_bottom_btn
            text-align center
            .p1
              font-size .24rem
              color #333
              line-height .35rem
              margin-top .16rem
            img
              width 1rem
              height 1rem
</style>
