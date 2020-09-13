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
          <p class="p">文件有效期2020-7-31  10:00</p>
          <div class="mask_bottom">
            <div
              class="mask_bottom_btn copy1"
              style="margin-right: .89rem"
              data-clipboard-text="666"
              @click="copyBtn"
            >
              <img src="https://www.chbice.com/imgFile/icon/qq_url.png" alt="">
              <p class="p1">获取管理员QQ号</p>
            </div>
            <div class="mask_bottom_btn">
              <img src="https://www.chbice.com/imgFile/icon/copy_url.png" alt="">
              <p class="p1">获取管理员QQ号</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {downloadList} from "@/api/index"

export default {
  name: "downloadList",
  data() {
    return {
      downloadList: null,
      IsOpenDownloadMask: false
    }
  },
  created() {
  },
  mounted() {
    this.initList()
  },
  methods: {
    copyBtn() {
      const _this = this;
      let clipboard = new this.Clipboard(".copy1"); //在main.js中引用
      console.log(clipboard);
      clipboard.on("success", e => {
        console.log(e);
        debugger
        // 释放内存
        // clipboard.destroy();
      });
      clipboard.on("error", e => {
        console.log(e, 'error');
        debugger
        // 不支持复制
        // Message({
        //   message: "该浏览器不支持自动复制",
        //   type: "warning"
        // });
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
      // const item = this.downloadList[idx]
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
