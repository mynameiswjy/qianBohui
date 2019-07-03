<template>
    <div :class="{'wrap': !newTemp}">
      <div v-if="newTemp === 1">
        <div class="intr_wrap intr_wrap1">
          <h2>{{introduceObj.title}}</h2>
          <p class="other_con">{{introduceObj.content}}</p>
        </div>
        <div class="loading-container" v-show="!introduceObj.content">
          <loading></loading>
        </div>
      </div>
      <div v-else-if="newTemp === 2">
        <div class="intr_wrap intr_wrap2">
          <h2 class="intr_wrap2_h2">{{introduceObj.title}}</h2>
          <p :class="{show: show}" ref="contentTxt">{{introduceObj.content}}</p>
          <div v-if="openStyle" v-show="showContent" class="a_full" @click="showBts">{{showText}}</div>
        </div>
        <div class="loading-container" v-show="!introduceObj.content">
          <loading></loading>
        </div>
      </div>
      <div v-else style="margin-left: 0.36rem">
        <div v-if="openStyle" class="title_ab">
          <h2>{{introduceObj.title}}</h2>
          <div class="">{{text}}</div><!--Exhibition Introduction-->
        </div>
        <div class="title" v-else>
          <img src="../assets/images/introduce.png" alt="333" class="introduce-icon">
          <div class="title-right">
            <h2>{{introduceObj.title}}</h2>
            <div class="title-right-en">{{text}}</div>
          </div>
        </div>
        <div class="header_intro" :class="{height_hide: !introduceObj.content}">
          <div class="header-text" :class="{show: show}"><!-- ref="contentTxt"-->
            <span>{{introduceObj.content}}</span>
            <div v-if="IsContactWay" class="contact_way">
              <p>服务热线：<a href="tel:4008-188-666" class="contact_way_color">4008-188-666</a></p>
              <p>服务传真：<span class="contact_way_color">010-59311250</span></p>
              <p>服务邮箱：<span class="contact_way_color">service@chngc.net</span></p>
            </div>
          </div>
          <div class="loading-container" v-show="!introduceObj.content">
            <loading></loading>
          </div>
          <div v-if="openStyle" v-show="showContent" class="a_full" @click="showBts">{{showText}}</div>
        </div>
      </div>
    </div>
</template>

<script>
import Loading from './loading/loading'
export default {
  name: "introduce",
  props: {
    newTemp: {
      type: Number,
      default: 0
    },
    introduceObj: {
      type: Object,
      default: function () {
        return {
          title: '',
          content: ''
        }
      }
    },
    show: {
      type: Boolean,
      default: true
    },
    text: {
      type: String,
      default: ''
    },
    openStyle: {
      type: Boolean,
      default: false
    },
    IsContactWay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      obj: {},
      showText: "显示全文",
      showContent: false
    }
  },
  created() {
  },
  mounted() {
    this.ShowContent()
  },
  methods: {
    showBts() {
      if (this.show) {
        this.showText = "收起全文"
      } else {
        this.showText = "显示全文"
      }
      this.show = !this.show
    },
    ShowContent() {
      if (this.introduceObj.content) {
        this.$nextTick(() => {
          if (this.$refs.contentTxt.offsetHeight >= 150) {
            this.showContent = true
          } else {
            this.showContent = false
          }
        })
      }
      /*setTimeout(() => {

      }, 200)*/
    }
  },
  computed: {
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus">
  .intr_wrap1
    height 2.45rem
  .intr_wrap2
    padding-bottom 0.3rem
    .a_full
      font-size: 0.28rem
      margin-left 0.3rem
      margin-top 0.15rem
      color #eed582
  .intr_wrap
    width 7rem
    background-color: #ffffff;
    box-shadow: 0.03rem 0.05rem 0.06rem 0 rgba(86, 88, 89, 0.18);
    border-radius: 0.14rem;
    margin-left 0.25rem
    .intr_wrap2_h2
      padding-top 0.28rem
      /*padding-bottom 0.2rem*/
    h2
      text-align center
      padding-top 0.25rem
      font-size 0.36rem
      color rgb(2,2,2)
      font-weight 600
    p
      font-size 0.28rem
      color rgb(32,32,32)
      margin 0.14rem auto 0
      line-height 0.56rem
      width 6.19rem
    .other_con
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;//向显示多少行就给多大值
      -webkit-box-orient: vertical;
  .title_ab
    text-align center
    margin-left -0.36rem
    h2
      margin-bottom: 0.1rem;
      font-size: 0.34rem;
      line-height: 0.3rem;
      font-family:PingFangSC-Medium;
      color:rgba(198,160,86,1);
      margin-top 0.58rem
    div
      display: block;
      font-size:0.2rem;
      font-family:PingFangSC-Light;
      color:rgba(207,194,170,1);
      line-height: 0.3rem;
      margin-bottom 0.32rem
  .height_hide
    height 1.5rem
  .header_intro
    width: 6.21rem;
    padding: 0.39rem 0.3rem 0.4rem 0.27rem;
    box-shadow: 0.0rem 0rem 0.21rem rgba(198,160,86, 0.8);
    border-radius: 0.08rem;
    position: relative
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      left 50%
      transform: translate(-50%, -50%)
    .header-text
      /*height: 3.22rem;*/
      text-align: justify;
      font-size: 0.285rem;
      font-family:PingFangSC-Regular;
      color: rgba(72,72,71,1);
      background:rgba(255,255,255,1);
      line-height: 0.42rem
      .contact_way
        /*margin-left 1rem*/
        .contact_way_color
          color: #2C90FF
    .a_full
      font-size: 0.28rem
      font-family:PingFangSC-Light;
      color: #C6A056
      padding-top 0.2rem
      width 1.5rem
  .title{
    display: flex;
    margin-bottom: 0.32rem;
    font-family:PingFangSC-Medium;
  }
  .show{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;//向显示多少行就给多大值
    -webkit-box-orient: vertical;
  }
  .title-right{
    margin-left: 0.22rem;
  }
  .title-right-en{
    display: block;
    font-size:0.2rem;
    font-family:PingFangSC-Light;
    color:rgba(207,194,170,1);
    line-height: 0.3rem;
  }
  .title h2{
    text-align: left;
    margin-bottom: 0.1rem;
    font-size: 0.34rem;
    line-height: 0.3rem;
    font-family:PingFangSC-Medium;
    color:rgba(198,160,86,1);
  }
  .introduce-icon{
    width: 0.33rem;
    height: 0.32rem;
  }
</style>
