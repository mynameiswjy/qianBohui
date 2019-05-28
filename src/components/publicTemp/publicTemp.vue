<template>
    <div class="temp_wrap left-margin">
      <ul class="header_nav">
        <li :class="{'text_active':idx == index, 'li_add_style': aboutzhObj.navList.length == 2}"
            @click="changeTempBtns(index)"
            v-for="(item, index) in aboutzhObj.navList"
            :key="index"
        >
          {{item}}
          <img v-show="idx == index" class="arrow" src="../../assets/images/arrow.png" alt="">
        </li>
      </ul>
      <div class="temp_content">
        <ul>
          <li v-show="index == idx" v-for="(text, index) in aboutzhObj.textList" :key="index" ref="t_ref">
            <div v-if="text.isTableType">
              <table-temp></table-temp>
            </div>
            <div v-else>
              <div class="temp_content-li" :class="{show_temp: text.show_temp}">
              <span v-for="(txt, idx) in text.text" :key="idx">
                <span :class="{font_wei: isFontWei}">{{txt.title}}</span>
                <span>{{txt.txt}}<br></span>
              </span>
                <span v-if="text.footerTxt" v-show="!text.show_temp" class="footer_txt">{{text.footerTxt}}</span>
              </div>
              <div class="a_full" v-show="text.showFullBtn>166 || initShowFullBtn>=166" @click="showBts(index)">{{text.showText}}</div>
            </div>
          </li>
        </ul>
      </div>
      <reservation @closeTemp="tempCloseGoods" v-if="isReservation"></reservation>
      <visit @closeVisit="closeVisit" v-if="isVisitTemp"></visit>
    </div>
</template>

<script type="text/ecmascript-6">
import reservation from "@/components/mask/reservation.vue"
import visit from "@/components/mask/visit.vue"
import tableTemp from '../tableChart/tableChart'
export default {
  name: 'publicTemp',
  props: {
    aboutzhObj: {// 接收的数据
      type: Object,
      default: null
    },
    isFontWei: { // 文字是否加粗
      type: Boolean,
      default: true
    },
    isReservaPage: { // 是否含有展位预订指令
      type: Boolean,
      default: false
    },
    isVisitP: { // 此页面是否含有参观登记指令
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      idx: 0,
      show_temp: true,
      showText: "显示全文",
      listHeight: 0,
      showFullText: false,
      showContentTemp: false,
      initShowFullBtn: 0,
      isReservation: false,
      isVisitTemp: false,
      userLastStatus: 0, // 展商专区用户打开展位预订前的状态
      userLastStatusVisit: 0 // 观众专区用户打开参观登记前的状态
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(function () {
      this.ShowContentTemp()
    })
  },
  methods: {
    tempCloseGoods(e) {
      this.isReservation = e
      if (!e) {
        this.idx = this.userLastStatus
        this.$nextTick(function () {
          this.ShowContentTemp()
        })
      }
    },
    closeVisit(e) {
      this.isVisitTemp = e
      if (!e) {
        this.idx = this.userLastStatusVisit
        this.$nextTick(function () {
          this.ShowContentTemp()
        })
      }
    },
    changeTempBtns(e = 0) {
      this.idx = e
      let item = this.aboutzhObj.textList[e]
      this.$nextTick(function () {
        this.ShowContentTemp()
        item.showFullBtn = this.$refs.t_ref[e].clientHeight
      })
      if (e == 2 && this.isReservaPage) { // 在展商专区打开展位预订模板
        this.isReservation = true
      } else {
        this.userLastStatus = e
      }
      if (e == 1 && this.isVisitP) {
        this.isVisitTemp = true
      } else {
        this.userLastStatusVisit = e
      }
    },
    showBts(e) {
      let item = this.aboutzhObj.textList[e]
      if (e == 0) {
        item.show_temp = !item.show_temp
        if (item.show_temp) {
          item.showText = "显示全文"
        } else {
          item.showText = "收起全文"
        }
      } else if (e == 1) {
        item.show_temp = !item.show_temp
        if (item.show_temp) {
          item.showText = "显示全文"
        } else {
          item.showText = "收起全文"
        }
      } else if (e == 2) {
        item.show_temp = !item.show_temp
        if (item.show_temp) {
          item.showText = "显示全文"
        } else {
          item.showText = "收起全文"
        }
      }
    },
    ShowContentTemp() {
      this.initShowFullBtn = this.$refs.t_ref[0].clientHeight
    }
  },
  watch: {
  },
  computed: {
  },
  components: {
    reservation,
    visit,
    tableTemp
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .font_wei {
    font-weight 600
  }
  .temp_wrap
    .header_nav
      display flex
      font-size: 0.34rem
      font-family PingFangSC-Medium
      color #333
      margin-bottom 0.2rem
      margin-right 0.38rem
      justify-content space-between
      li
        padding 0.26rem 0
        position relative
        .arrow
          position absolute
          left: 38%
          top: 1.06rem
          width 0.42rem
          height 0.36rem
      .li_add_style
        margin:0 0.89rem
      .text_active
        color: #C6A056
        position relative
      .text_active:after
        content: ''
        position absolute
        bottom: 0
        left 0
        width:95%
        height:0
        border-width:0 0.04rem 0.05rem 0.04rem
        border-style:none solid solid
        border-color:transparent transparent #c8a258
    .temp_content
      width 6.21rem
      margin-top 0.55rem
      padding 0.34rem 0.3rem 0.38rem 0.27rem
      border-radius 0.08rem
      box-shadow 0rem 0 0.21rem #C6A056
      background-color: #fff
      .a_full
        font-size: 0.28rem
        font-family:PingFangSC-Light;
        color: #C6A056
        padding-top 0.2rem
        width 1.5
        background-color: #fff
      .temp_content-li
        text-align: justify;
        font-size: 0.28rem
        font-family:PingFangSC-Regular;
        color:rgba(72,72,71,1);
        line-height: 0.42rem
        .footer_txt
          display flex
          justify-content flex-end
          margin-top 15px
      .show_temp
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        -webkit-line-clamp:8;
</style>
