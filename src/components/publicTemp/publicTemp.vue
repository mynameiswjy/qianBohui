 <template>
   <div>
     <div class="new_tempwrap" v-if="newTemp === 1">
       <ul class="header_nav" :class="{'header_nav1':isVisitP}">
         <li :class="{'text_active':idx == index, 'li_add_style': aboutzhObj.navList.length <= 2}"
             @click="changeTempBtns(index)"
             v-for="(item, index) in aboutzhObj.navList"
             :key="index"
         >
           {{item}}
         </li>
       </ul>
       <div class="temp_content">
         <ul>
           <li v-show="index == idx" v-for="(text, index) in aboutzhObj.textList" :key="index" ref="t_ref">
             <div v-if="text.isTableType">
               <table-temp style="width: 6.3rem;margin-left: -0.06rem;padding-top: 0.3rem;padding-bottom: 0.2rem;"></table-temp>
             </div>
             <div v-else>
               <div class="temp_content-li" :class="{show_temp: text.show_temp}" @click="showBts(index)">
                 <span v-for="(txt, idx) in text.text" :key="idx">
                   <span :class="{font_wei: isFontWei, 'border_s': txt.title}" v-show="txt.title">{{txt.title}}<br></span>
                   <span v-show="txt.txt">{{txt.txt}}<br></span>
                 </span>
                 <span v-if="text.footerTxt" v-show="!text.show_temp" class="footer_txt">{{text.footerTxt}}</span>
               </div>
               <!--<div class="a_full" v-show="text.showFullBtn>166 || initShowFullBtn>=166" @click="showBts(index)">{{text.showText}}</div>-->
             </div>
           </li>
         </ul>
       </div>
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
    newTemp: {
      type: Number,
      default: 0
    },
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
  .new_tempwrap
    width 7rem
    /*height 5rem*/
    background-color: #ffffff;
    box-shadow: 0.03rem 0.05rem 0.06rem 0 rgba(86, 88, 89, 0.18);
    border-radius: 0.14rem;
    margin-left 0.25rem
    .header_nav
      width 7rem
      height 0.94rem
      border-radius 0.14rem 0.14rem 0 0
      background-color: #eed582
      font-size: 0.3rem
      display flex
      justify-content space-between
      overflow hidden
      li
        width 2.333rem
        background-color: #eed582;
        text-align center
        line-height 0.98rem
        font-weight 550
      .text_active
        background-color: #fff
        position relative
      .text_active:after {
        content ''
        width 89.6%
        height 0.04rem
        background-color: #eed582;
        transform translateX(-50%)
        position absolute
        left 50%
        bottom: 0
      }
      .li_add_style
        width 50%
    .temp_content
      font-size 0.28rem
      line-height 0.6rem
      width 6.19rem
      margin 0 auto
      text-align: justify;
      padding-top 0.2rem
      padding-bottom 0.3rem
      color #000
      .show_temp
        overflow:hidden;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:8;
      .a_full
        color #eed582
  .border_s
    position relative
    font-size 0.36rem
    color #000
    margin-left 0.2rem
  .border_s:before
    content ''
    width 0.08rem
    height 0.35rem
    background-color: #eed582;
    position absolute
    left -0.2rem
    top 50%
    transform translateY(-50%)
  .font_wei {
    font-weight 600
  }
</style>
