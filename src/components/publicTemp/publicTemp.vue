 <template>
   <div>
     <div class="new_tempwrap">
       <ul class="header_nav" :class="{'header_nav1': aboutzhObj.navList.length === 2}">
         <li :class="{'text_active':idx == index && aboutzhObj.navList.length !== 1}"
             @click="changeTempBtns(index)"
             v-for="(item, index) in aboutzhObj.navList"
             :key="index"
         >
           {{item.name}}
         </li>
       </ul>
       <div class="temp_content">
         <ul>
           <li v-show="index == idx" v-for="(text, index) in aboutzhObj.textList" :key="index" ref="t_ref">
             <div v-if="text.isTableType">
               <table-temp style="width: 6.9rem;margin-left: -0.06rem;padding-top: 0.1rem;padding-bottom: 0.2rem;"></table-temp>
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
     <visit @closeVisit="closeVisit" v-if="isVisitTemp"></visit>
   </div>
</template>

<script type="text/ecmascript-6">
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
      let titleItem = this.aboutzhObj.navList[e]
      this.$nextTick(function () {
        this.ShowContentTemp()
        item.showFullBtn = this.$refs.t_ref[e].clientHeight
      })
      if (e == 2 && titleItem.type === 'IsSkip') { // 在展商专区打开展位预订模板
        this.$router.push({path: titleItem.path});
        this.idx = this.userLastStatus
      } else {
        this.userLastStatus = e
      }
      if (e == 1 && titleItem.type === 'IsSkip') {
        this.$router.push({path: titleItem.path});
        this.idx = this.userLastStatusVisit
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
    visit,
    tableTemp
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .new_tempwrap
    width 7rem
    background-color: #ffffff;
    border-radius: 0.14rem;
    margin-left 0.25rem
    .header_nav:after
      content ''
      width .28rem
      height .53rem
      background-image url("https://www.chbice.com/imgFile/icon/title_left.png")
      background-size cover
      background-repeat no-repeat
      position absolute
      left -0.28rem
      top 0
    .header_nav:before
      content ''
      width .28rem
      height .53rem
      background-image url("https://www.chbice.com/imgFile/icon/title_right.png")
      background-size cover
      background-repeat no-repeat
      position absolute
      right -0.28rem
      top 0
    .header_nav
      font-size: 0.3rem
      width 4.8rem
      display flex
      justify-content center
      color #BFA267
      margin 0 auto
      border-top .02rem solid #BFA267
      border-bottom .02rem solid #BFA267
      position relative
      li
        width 1.6rem
        background-color: #BFA267;
        text-align center
        line-height 0.53rem
        font-weight 550
        color #fff
      .text_active
        background-color: #fff
        color #BFA267
        line-height 0.51rem
        position relative
      .li_add_style
        width 50%
    .temp_content
      font-size 0.28rem
      line-height 0.5rem
      width 6.72rem
      margin 0 auto
      text-align: justify;
      padding-top 0.3rem
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
  .header_nav1
    width 3.2rem!important
  .border_s
    position relative
    font-size 0.36rem
    color #000
    margin-left 0.2rem
  .border_s:before
    content ''
    width 0.08rem
    height 0.35rem
    background-color: #eed582;/*#*/
    position absolute
    left -0.2rem
    top 50%
    transform translateY(-50%)
  .font_wei {
    font-weight 600
  }
</style>
