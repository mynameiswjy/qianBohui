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
        <div class="intr_wrap">
          <h2 class="intr_wrap2_h2">{{introduceObj.title}}</h2>
          <p :class="{'show': show}" ref="contentTxt" @click="showBts">{{introduceObj.content}}</p>
          <!--<img v-if="IsActive" src="../assets/images/yanhua1.png" class="bg_img" alt="烟花">
          <img v-if="IsActive" src="https://www.chbice.com/imgFile/deng1.png" class="bg_img1" alt="灯笼">-->
        </div>
        <div class="loading-container" v-show="!introduceObj.content">
          <loading :openSmall="true"></loading>
        </div>
      </div>
      <div  v-else-if="newTemp === 3">
        <div class="intr_wrap" style="overflow: hidden">
          <h3 class="cantact_title intr_wrap2_h2">联系我们</h3>
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
    isOpenActive: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      value: ''
    }
  },
  data() {
    return {
      obj: {},
      showContent: false,
      show: true,
      IsActive: this.$store.state.IsActive // 十一活动样式控制器
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    showBts() {
      this.show = !this.show
    }
  },
  computed: {},
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
    .a_full
      font-size: 0.28rem
      margin-left 0.3rem
      margin-top 0.15rem
      color #eed582
  .intr_wrap
    width 7rem
    background-color: #ffffff;
    margin-left 0.25rem
    position relative
    .bg_img {
      position absolute
      width 0.83rem
      height auto
      bottom -0.9rem
      left 0.5rem
    }
    .bg_img1
      position absolute
      width 0.86rem
      height auto
      bottom -0.86rem
      right -0.25rem
    .cantact_title
      text-align center
    .intr_wrap2_h2
      background-image url("https://www.chbice.com/imgFile/icon/title_bg.png")
      background-repeat no-repeat
      background-size 2.45rem 0.53rem
      width 2.45rem
      height 0.53rem
      margin 0.3rem auto 0.2rem
      font-size 0.32rem
      color #fff
      line-height 0.53rem
    h2
      text-align center
      font-size 0.36rem
      color rgb(2,2,2)
    .cantact_p
      font-size 0.28rem
      line-height 0.5rem
      padding 0.2rem 0 0.2rem 0.3rem
    p
      font-size 0.28rem
      color #333
      margin 0 auto 0
      line-height 0.5rem
      width 6.72rem
    .other_con
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 6;//向显示多少行就给多大值
      -webkit-box-orient: vertical;
</style>
