<template>
    <div class="sear-wrap">
      <div class="sear">
        <form action="" enctype='applicaion/json'>
          <div class="sear-input">
            <img class="sear-img" src="../assets/images/search.png" alt="">
            <input type="text" placeholder="搜索" @keyup.enter="submit" v-model="searVal" style="vertical-align:middle">
          </div>
        </form>
        <div @click="Search_con">取消</div>
      </div>
      <div v-if="keywordsList.length" v-show="isShowSear">
        <p class="hot-sear">热门搜索</p>
        <ul class="keywords">
          <li v-for="(item, index) in keywordsList" @click="changeClick(index)" v-bind:key="index">{{item.name}}</li>
        </ul>
      </div>
      <div class="sear_wrap left-margin" v-show="searchList.length">
        <ul class="sear_content">
          <li class="sear_content_list" @click="goToDetail(item.code)" v-for="(item, index) in searchList" :key="index">
            <div class="sear_content_list_left">{{item.title}}</div>
            <div>{{item.time}}</div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import {getAntistop, searchName} from '@/api/index'

export default {
  name: 'search',
  data() {
    return{
      searVal: '',
      keywordsList: {},
      searchList: [],
      isShowSear: true
    }
  },
  created() {
    this.$nextTick(function () {
      this.initgetAntistop()
    })
  },
  mounted() {
  },
  activated() {
    document.title = '搜索';
  },
  destroyed() {
    this.searchList = []
  },
  methods: {
    // 搜索
    submit() {
      let data = {
        searchType: 'H5_HOME',
        searchName: this.searVal
      }
      searchName(data).then((res) => {
        if (res.data.returnCode === '0000' && res.data.returnData) {
          this.searchList = res.data.returnData
          this.isShowSear = false
        } else {
          this.searchList = []
          this.isShowSear = true
          this.$message({
            message: '暂无搜索内容',
            type: 'warning'
          });
        }
      })
    },
    goToDetail(e) {
      this.$router.push({
        name: "newsLandingPage",
        params: {
          name: 'newsLandingPage',
          code: e
        }
      })
    },
    // 关键词
    Search_con() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    changeClick(e) {
      this.searVal = this.keywordsList[e].name
    },
    initgetAntistop() {
      getAntistop({searchType: 'H5_HOME'}).then((res) => {
        this.keywordsList = res.data.returnData
      })
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
    .sear_wrap
      box-shadow: 0.0rem 0rem 0.21rem rgba(198,160,86, 0.6);
      width: 6.21rem;
      padding: 0.38rem 0.29rem 0.29rem 0.29rem; // 0.18
      border-radius: 0.08rem;
      margin-top 0.55rem
      .sear_content
        .sear_content_list
          display flex
          justify-content space-between
          height: 0.76rem;
          line-height: 0.76rem;
          padding-left: 0.35rem;
          padding-right 0.35rem
          margin-bottom: 0.14rem;
          font-size: 0.3rem;
          font-family: PingFangSC-Regular;
          color: #717170;
          background:rgba(198,160,86, 0.08)
          .sear_content_list_left
            width: 3.21rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
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
