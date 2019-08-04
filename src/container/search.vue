<template>
    <div class="sear-wrap"  style="background-color: #F4F3F3;">
      <!--<div class="sear">
        <form action="" enctype='applicaion/json'>
          <div class="sear-input">
            <img class="sear-img" src="../assets/images/search.png" alt="">
            <input type="text" placeholder="搜索" @keyup.enter="submit" v-model="searVal" style="vertical-align:middle">
          </div>
        </form>
        <div @click="Search_con">取消</div>
      </div>-->
      <div class="search_input">
        <img class="search_icon" src="https://www.chbice.com/imgFile/cut/search.png" alt="">
        <div>
          <form action="" enctype='applicaion/json'>
            <input type="text" placeholder="钱币博览会" @keyup.enter="submit" v-model="searVal">
          </form>
        </div>
        <div class="search_cansel" @click="Search_con">取消</div>
      </div>
      <div v-show="storageKeywords && !searchList.length">
        <div style="height: 0.12rem;"></div>
        <p class="hot-sear hot-sear1">
          <span>搜索历史</span>
          <span @click="deleteHistory" class="iconfont icon-icon_delete"></span>
        </p>
        <ul class="keywords">
          <li v-for="(item, index) in storageKeywords" @click="changeClick(item)" v-bind:key="index">{{item}}</li>
        </ul>
      </div>
      <div v-if="keywordsList.length" v-show="isShowSear">
        <p class="hot-sear">热门搜索</p>
        <ul class="keywords">
          <li v-for="(item, index) in keywordsList" @click="changeClick(item.name)" v-bind:key="index">{{item.name}}</li>
        </ul>
      </div>
      <div class="sear_wrap" v-show="searchList.length">
        <ul class="sear_content">
          <li class="sear_content_list" @click="goToDetail(item.selectCode)" v-for="(item, index) in searchList" :key="index">
            <div class="sear_content_list_left">{{item.title}}</div>
            <!--<div>{{item.time}}</div>-->
            <div class="iconfont icon-gengduo"></div>
          </li>
        </ul>
      </div>
      <div class="confirm_mask" v-show="isOpenHistory">
        <div class="confirm_content">
          <img class="confirm_img" src="https://www.chbice.com/imgFile/cut/confirm.png" alt="">
          <p class="confirm_txt" style="margin-top: 0.71rem">确认删除</p>
          <p class="confirm_txt">全部历史记录?</p>
          <div style="height: 0.4rem;" v-show="!maskBtn"></div>
          <p class="confirm_yes confirm_btn" :class="{'confirm_active': !maskBtn}" @click="confirmBtn(true)">确认</p>
          <p class="confirm_cansel confirm_btn" :class="{'confirm_active': maskBtn}" @click="confirmBtn(false)">取消</p>
          <div style="height: 0.4rem;" v-show="maskBtn"></div>
        </div>
      </div>
      <reload @reloadBtn="searchReloadBtn" v-show="IsSearchReloadTemp"></reload>
    </div>
</template>

<script type="text/ecmascript-6">
import {getAntistop, searchName} from '@/api/index'
import reload from '@/components/reloadTemp' // 网络错误

export default {
  name: 'search',
  data() {
    return{
      searVal: '',
      keywordsList: {},
      searchList: [],
      isShowSear: true,
      storageKeywords: [],
      isOpenHistory: false,
      maskBtn: false,
      IsSearchReloadTemp: false
    }
  },
  created() {
    this.getKeywords()
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
    searchReloadBtn() {
      this.initgetAntistop()
    },
    // 删除搜索历史
    confirmBtn(e) {
      if (e) {
        localStorage.removeItem("storageKeywords");
        this.maskBtn = false
        setTimeout(() => {
          this.isOpenHistory = false
        }, 200)
        this.storageKeywords = null
      } else {
        this.maskBtn = true
        setTimeout(() => {
          this.isOpenHistory = false
        }, 200)
      }
    },
    //  打开删除搜索历史
    deleteHistory() {
      this.isOpenHistory = true
    },
    // 获取关键词
    getKeywords() {
      console.log(JSON.parse(localStorage.getItem('storageKeywords')));
      this.storageKeywords = JSON.parse(localStorage.getItem('storageKeywords'))
    },
    // 搜索
    submit() {
      if (!this.searVal) {
        console.log('搜索内容不能为空')
        return false
      }
      const storage = JSON.parse(localStorage.getItem('storageKeywords'))
      if (!storage || (storage && storage.indexOf(this.searVal) === -1)) {
        this.storageKeywords = storage || []
        this.storageKeywords.push(this.searVal)
        localStorage.setItem('storageKeywords', JSON.stringify(this.storageKeywords));
      }
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
      }).catch(() => {
        this.IsSearchReloadTemp = true
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
      this.searVal = e
    },
    initgetAntistop() {
      getAntistop({searchType: 'H5_HOME'}).then((res) => {
        this.keywordsList = res.data.returnData
        if (this.IsSearchReloadTemp) {
          this.IsSearchReloadTemp = false
        }
      }).catch(() => {
        this.IsSearchReloadTemp = true
      })
    }
  },
  components: {
    reload
  }
}

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .sear-wrap
    position fixed
    top: 0
    width 100%
    bottom: 0
    font-size 0.24rem
    background-color: rgba(255,255,255,1);
    z-index 333
    .search_input
      display flex
      width 6.95rem
      height: 0.61rem
      font-size 0.3rem
      background-color: #fff
      box-shadow: 0.03rem 0.05rem 0.06rem 0 rgba(86, 88, 89, 0.18);
      border-radius: 0.14rem
      box-sizing border-box
      margin 0.1rem 0 0 0.25rem
      align-items center
      .search_cansel
        width 0.78rem
        border-radius: 0 0.14rem 0.14rem 0
        letter-spacing: 0.03rem
        color: #000000;
        background-color: #f4ba43;
        height 0.61rem
        line-height 0.61rem
        text-align center
      input
        width 5.37rem
        height 0.61rem
        box-sizing border-box
      .search_icon
        width 0.45rem
        max-height 0.39rem
        height auto
        margin 0 0.24rem 0 0.11rem
    .confirm_mask
      position fixed
      top: 0
      width 100%
      bottom 0
      background-color: rgba(0,0,0, 0.5)
      .confirm_content
        position absolute
        top: 50%
        left 50%
        width 4.72rem
        /*height 4.8rem*/
        background-color: #f6f6f6;
        transform translate(-50%, -50%)
        .confirm_img
          width 2.22rem
          height auto
          display block
          margin -0.6rem auto 0
        .confirm_txt
          font-size: 0.36rem
          line-height: 0.48rem
          color: #000000;
          text-align center
        .confirm_btn
          font-size: 0.36rem
          line-height: 0.88rem
          color: #000000
          text-align center
        .confirm_yes
          margin  0.4rem auto 0.1rem
        .confirm_active
          width: 4.4rem
          height: 0.88rem
          background-color: #eed582;
          border-radius: 0.2rem
        .confirm_cansel
          margin 0 auto
    .sear_wrap
      margin-top 0.23rem
      .sear_content
        .sear_content_list
          display flex
          justify-content space-between
          width: 7.5rem;
          height: 1rem;
          background-color: #fff;
          box-sizing border-box
          line-height: 1rem;
          padding-left: 0.25rem;
          margin-bottom: 0.08rem;
          font-size: 0.3rem;
          font-family: PingFangSC-Regular;
          color: #000000;
          .icon-gengduo
            font-size 0.31rem
            font-weight 600
            margin-right 0.25rem
          .sear_content_list_left
            width: 3.21rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    .sear
      width 100%
      display: flex
      justify-content: center;
      font-size 0.26rem
      border-bottom 0.01rem solid rgba(245,245,245,1)
      /*.sear-input
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
          background rgba(245,245,245,1)*/
      div
        font-family:PingFangSC-Regular;
        color:rgba(51,51,51,1);
        padding-left 0.32rem
        margin-top 0.18rem
        line-height 0.54rem
    .hot-sear1
      display flex
      justify-content space-between
      .icon-icon_delete
        font-size 0.32rem
        padding-right 0.27rem
        padding-left 0.25rem
    .hot-sear
      margin-top 0.38rem
      margin-left 0.25rem
      margin-bottom 0.33rem
      font-family:PingFangSC-Regular;
      color: #888888;
    .keywords
      display flex
      flex-wrap: wrap
      margin-left 0.28rem
      font-size: 0.28rem;
      color: #353535;
      li
        background-color: #fffefe;
        border-radius: 0.2rem
        padding 0.12rem 0.25rem
        margin-bottom 0.26rem
        margin-right 0.3rem
  input::-webkit-input-placeholder {
    color: #000000;
    opacity: 0.5;
  }
  input::-moz-placeholder {
    color: #000000;
    opacity: 0.5;
  }
  input::-moz-placeholder {
    color: #000000;
    opacity: 0.5;
  }
  input::-ms-input-placeholder {
    color: #000000;
    opacity: 0.5;
  }
</style>
