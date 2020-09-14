<template>
    <div class="sear-wrap">
      <div class="search_input">
        <div class="seach_left">
          <span class="iconfont icon-sousuo"></span>
          <form action="" enctype='applicaion/json'>
            <input type="text" placeholder="钱币博览会" @keyup.enter="submit" v-model="searVal">
          </form>
        </div>
        <div class="search_cansel" @click="Search_con">取消</div>
      </div>
      <div v-show="storageKeywords && !searchList.length">
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
    background-color: #fff;
    z-index 333
    .search_input
      display flex
      width 6.95rem
      height: 0.61rem
      font-size 0.3rem
      margin .4rem 0.3rem
      color #BFA267
      .seach_left
        display flex
        width 5.96rem
        height .56rem
        border-radius: .28rem;
        border: .01rem solid #BFA267;
        input
          width 100%
          height 100%
          color #BFA267
          box-sizing border-box
        input::-webkit-input-placeholder {
          color: #BFA267 ; /*WebKit browsers*/
        }
        input::-moz-placeholder {
          color: #BFA267 ; /*Mozilla Firefox 4 to 18 */
        }
        input::-moz-placeholder {
          color: #BFA267 ; /*Mozilla Firefox 19+ */
        }
        input::-ms-input-placeholder {
          color: #BFA267 ; /*Internet Explorer 10+*/
        }
        .icon-sousuo
          font-size .34rem
          width .64rem
          text-align center
          line-height .61rem
          font-weight 600
      .search_cansel
        width 0.94rem
        color: #BFA267;
        height 0.61rem
        line-height 0.61rem
        text-align center
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
          width: 6.9rem;
          height: .85rem;
          background-color: #fff;
          box-sizing border-box
          line-height: 1rem;
          margin 0 auto;
          font-size: 0.28rem;
          font-family: PingFangSC-Regular;
          color: #333;
          border-bottom .01rem solid #E6E6E6
          .icon-gengduo
            font-size 0.28rem
            color #BFA267
          .sear_content_list_left
            width: 3.21rem;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
    .sear
      width 100%
      display: flex
      justify-content: center;
      font-size 0.26rem
      border-bottom 0.01rem solid rgba(245,245,245,1)
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
        font-size 0.35rem
        padding-right 0.3rem
        padding-left 0.25rem
    .hot-sear
      margin-left 0.3rem
      margin-bottom 0.33rem
      font-family:PingFangSC-Regular;
      font-size .32rem
      color: #333;
    .keywords
      display flex
      flex-wrap: wrap
      margin-left 0.28rem
      color: #353535;
      li
        background-color: #BFA267;
        border-radius: 0.22rem
        padding 0.08rem 0.16rem
        line-height 1
        margin-bottom 0.24rem
        margin-right 0.24rem
        color #fff
</style>
