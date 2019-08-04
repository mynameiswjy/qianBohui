<template>
    <div :class="{'wrap': !newTemp}">
      <div v-if="newTemp === 1">
        <div class="intr_wrap intr_wrap1">
          <h2>{{introduceObj.title}}</h2>
          <p class="other_con">{{introduceObj.content}}</p>
        </div>
        <div class="loading-container" v-show="!introduceObj.content">
          <loading :openSmall="true"></loading>
        </div>
      </div>
      <div v-else-if="newTemp === 2">
        <div class="intr_wrap intr_wrap2">
          <h2 class="intr_wrap2_h2">{{introduceObj.title}}</h2>
          <p :class="{'show': show}" ref="contentTxt" @click="showBts">{{introduceObj.content}}</p>
          <!--<div v-if="openStyle" v-show="showContent" class="a_full" @click="showBts">{{showText}}</div>-->
        </div>
        <div class="loading-container" v-show="!introduceObj.content">
          <loading :openSmall="true"></loading>
        </div>
      </div>
      <div  v-else-if="newTemp === 3">
        <div class="intr_wrap">
          <h3 class="cantact_title">联系我们</h3>
          <div class="cantact_p">
            <div>服务热线：<a href="tel:4008-188-666" class="">4008-188-666</a></div>
            <div>服务传真：<span class="">010-59311250</span></div>
            <div>服务邮箱：<span class="">service@chngc.net</span></div>
          </div>
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
    }
  },
  computed: {
    showText() {
      return this.show ? '收起全文' : '显示全文'
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus">
  .show{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 6;//向显示多少行就给多大值
    -webkit-box-orient: vertical;
  }
  .intr_wrap1
    padding-bottom 0.3rem
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
    overflow hidden
    .cantact_title
      width 100%
      height 0.94rem
      background-color: #eed582;
      font-size: 0.36rem;
      font-weight 600
      text-align center
      line-height 0.94rem
      color: #000000
      box-sizing border-box
    .intr_wrap2_h2
      padding-top 0.28rem
      /*padding-bottom 0.2rem*/
    h2
      text-align center
      padding-top 0.25rem
      font-size 0.36rem
      color rgb(2,2,2)
      font-weight 600
    .cantact_p
      font-size 0.28rem
      line-height 0.5rem
      padding 0.2rem 0 0.2rem 0.3rem
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
      -webkit-line-clamp: 6;//向显示多少行就给多大值
      -webkit-box-orient: vertical;
</style>
