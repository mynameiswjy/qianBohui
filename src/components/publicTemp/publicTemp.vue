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
              <table class="table_wrap" border="1">
                <caption class=""></caption>
                <tr class="tr_head tr_head_l">
                  <td class="td_head td_head_t td_head_r t_height t_flex">项目</td>
                  <td class="td_head td_head_t td_head_r t_height t_flex">规格</td>
                  <td class="td_head td_head_t td_head_r t_height t_flex">价格(元/个)</td>
                </tr>
                <tr class="tr_head tr_head_l">
                  <td class="td_head td_head_t td_head_r td_head_w1 t_height t_flex">会刊内页</td>
                  <td class="td_head td_head_t td_head_r td_head_w2 t_height t_flex">参见会刊广告信息</td>
                  <td class="td_head td_head_t td_head_r td_head_w3 t_flex">5000/page</td>
                </tr>
                <tr class="tr_head tr_head_l">
                  <td class="td_head td_head_t td_head_r td_head_b t_flex">展位</td>
                  <td class="td_head td_head_t td_head_r">
                    <table>
                      <tr class="">
                        <td class="td_head_r td_body_w2 t_flex">
                          <div>特装位</div>
                          <div>(空地)</div>
                        </td>
                        <td class="">
                          <table>
                            <tr class="">
                              <td class="td_head_b td_body_w4 t_height t_flex">10mx10m</td>
                            </tr>
                            <tr class="">
                              <td class="td_head_b td_body_w4 t_height t_flex">9mx9m</td>
                            </tr>
                            <tr class="">
                              <td class="td_head_b td_body_w4 t_height t_flex">9mx6m</td>
                            </tr>
                            <tr class="">
                              <td class="td_head_b td_body_w4 t_height t_flex">8mx6m</td>
                            </tr>
                            <tr class="">
                              <td class="td_head_b td_body_w4 t_height t_flex">3mx9m</td>
                            </tr>
                            <tr class="">
                              <td class="td_head_b td_body_w4 t_height t_flex">6mx6m</td>
                            </tr>
                            <tr class="">
                              <td class="td_head_b td_body_w4 t_height t_flex">3mx6m</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr class="">
                        <td class="td_head_t td_head_r t_flex">A级</td>
                        <td>
                          <table>
                            <tr class="">
                              <td class="td_head_b td_body_w4 t_height t_flex">3mx3m标</td>
                            </tr>
                            <tr class="">
                              <td class="td_head_b td_body_w4 t_height t_flex">3mx3m拐</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr class="">
                        <td class="td_head_t td_head_r t_flex td_head_b">B级</td>
                        <td>
                          <table>
                            <tr class="">
                              <td class="td_head_b td_body_w4 t_height t_flex">3mx3m标</td>
                            </tr>
                            <tr class="">
                              <td class="td_head_b td_body_w4 t_height t_flex">3mx3m拐</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td class="td_head td_head_t td_head_r">
                    <table>
                      <tr><td class="td_body_w3 t_height t_flex">275000</td></tr>
                      <tr><td class="td_head_t td_body_w3 t_height t_flex">225000</td></tr>
                      <tr><td class="td_head_t td_body_w3 t_height t_flex">150000</td></tr>
                      <tr><td class="td_head_t td_body_w3 t_height t_flex">130000</td></tr>
                      <tr><td class="td_head_t td_body_w3 t_height t_flex">68000</td></tr>
                      <tr><td class="td_head_t td_body_w3 t_height t_flex">99000</td></tr>
                      <tr><td class="td_head_t td_body_w3 t_height t_flex">45000</td></tr>
                      <tr><td class="td_head_t td_body_w3 t_height t_flex">20000</td></tr>
                      <tr><td class="td_head_t td_body_w3 t_height t_flex">22000</td></tr>
                      <tr><td class="td_head_t td_body_w3 t_height t_flex">18000</td></tr>
                      <tr><td class="td_head_t td_body_w3 t_height t_flex td_head_b">20000</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            <div v-else>
              <div class="temp_content-li" :class="{show_temp: text.show_temp}">
              <span v-for="(txt, idx) in text.text" :key="idx">
                <span :class="{font_wei: isFontWei}">{{txt.title}}</span>
                <span>{{txt.txt}}<br></span>
              </span>
                <span v-if="text.footerTxt" v-show="!text.show_temp" class="footer_txt">{{text.footerTxt}}</span>
              </div>
              <div class="a_full" v-show="text.showFullBtn>166 || initShowFullBtn>166" @click="showBts(index)">{{text.showText}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'publicTemp',
  props: {
    aboutzhObj: {
      type: Object,
      default: null
    },
    isFontWei: {
      type: Boolean,
      default: true
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
      initShowFullBtn: 0
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
    changeTempBtns(e = 0) {
      this.idx = e
      let item = this.aboutzhObj.textList[e]
      this.$nextTick(function () {
        this.ShowContentTemp()
        item.showFullBtn = this.$refs.t_ref[e].clientHeight
      })
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
      .table_wrap
        font-size: 0.28rem
        width 100%
        .t_flex
          vertical-align: middle;
        .tr_head
          text-align center
        .tr_head_r
          border-right 0.01rem solid #333
        .tr_head_l
          border-left 0.01rem solid #333
        .tr_head_t
          border-top 0.01rem solid #333
        .tr_head_b
          border-bottom 0.01rem solid #333
        .td_head
          text-align center
        .td_head_r
          border-right 0.01rem solid #333
        .td_head_b
          border-bottom 0.01rem solid #333
        .td_head_t
          border-top 0.01rem solid #333
        .td_head_l
          border-left 0.01rem solid #333
        .td_head_w1
          width 1.2rem
        .td_head_w2
          width 3rem
        .td_body_w2
          width 1.5rem
        .td_body_w4
          width 1.8rem
        .td_body_w3
          width 1.65rem
        .td_head_w3
          width 1.3rem
        .t_height
          height 0.65rem
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
