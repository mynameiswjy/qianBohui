<template>
    <div class="sear-wrap">
      <div class="sear">
        <div class="sear-input">
          <img class="sear-img" src="../assets/images/search.png" alt="">
          <input type="text" placeholder="搜索" v-model="searVal" style="vertical-align:middle">
        </div>
        <div @click="Search_con">{{searVal ? '搜索' : '取消'}}</div>
      </div>
      <p class="hot-sear">热门搜索</p>
      <ul class="keywords">
        <li v-for="(item, index) in list" @click="changeClick(index)" v-bind:key="index">{{item}}</li>
      </ul>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'search',
  data() {
    return{
      searVal: '',
      list: ['人民币', '搜索', '热门搜索', '纪念币', '古代钱币', '纸币', '运动币', '数字币', '货币', '人民币']
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    Search_con() {
      console.log(this.searVal)
    },
    changeClick(e) {
      console.log(e)
      this.searVal = this.list[e]
    }
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .sear-wrap
    position fixed
    top: 0rem
    left: 0rem
    right 0
    width 100%
    bottom: 0rem
    font-size 0.24rem
    background-color: rgba(255,255,255,1);
    /*background-color: #bfa;*/
    z-index 333
    .sear
      width 100%
      display: flex
      justify-content: center;
      font-size 0.26rem
      border-bottom 0.01rem solid rgba(245,245,245,1)
      .sear-input
        width 5.97rem
        height: 0.54rem
        background rgba(245,245,245,1)
        border-radius: 0.12rem
        margin 0.18rem 0 0.17rem 0
        display flex
        .sear-img
          width: 0.24rem;
          height 0.24rem
          margin 0.15rem 0.21rem 0.15rem 0
        input
          height 100%
          width 100%
          background rgba(245,245,245,1)
      div
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        padding-left 0.32rem
        margin-top 0.18rem
        line-height 0.54rem
  .hot-sear
    margin-top 0.36rem
    margin-left 0.27rem
    margin-bottom 0.24rem
    font-family:PingFangSC-Regular;
    color:rgba(135,135,135,1)
  .keywords
    display flex
    color:rgba(74,73,73,1)
    flex-wrap: wrap
    margin-left 0.28rem
    li
      padding 0.17rem 0.2rem
      background-color #F4F4F4
      border-radius 0.08rem
      color #4A4949
      margin-bottom 0.22rem
      margin-right 0.22rem
</style>
