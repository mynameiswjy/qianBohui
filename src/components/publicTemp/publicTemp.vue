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
              <!--<table class="outTable">
                <thead>
                <tr>
                  <td width="160px">班级名称</td>
                  <td width="150px">学生名称</td>
                  <td width="150px">课程名称</td>
                  <td>课程成绩</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>信息与计算科学1班</td>
                  <td colspan="4">
                    <table frame="void" class="inTable">
                      <tr>
                        <td width="149px">张三</td>
                        <td colspan="3">
                          <table frame="void" class="inTable">
                            <tr>
                              <td width="149px">高等数学</td>
                              <td>80</td>
                            </tr>
                            <tr>
                              <td>大学英语</td>
                              <td>85</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td width="149px">李四</td>
                        <td colspan="3">
                          <table frame="void" class="inTable">
                            <tr>
                              <td width="149px">基础物理</td>
                              <td>80</td>
                            </tr>
                            <tr>
                              <td>形式政治</td>
                              <td>80</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                </tbody>
              </table>-->
              <table class="table_wrap" border="1">
                <caption class="table_title1">展位明细表</caption>
                <caption class="table_title2">公司营业执照复印件、安全责任书快递至组委会</caption>
                <thead>
                <tr class="tr_head">
                  <td class="td_head td_head1">项目</td>
                  <td class="td_head td_head1">规格</td>
                  <td class="td_head td_head1">价格(元/个)</td>
                  <td class="td_head">备注及数量</td>
                </tr>
                <tr class="tr_head">
                  <td class="td_head td_head1 td_head_w1">会刊内页</td>
                  <td class="td_head td_head1 td_head_w2">参见会刊广告信息</td>
                  <td class="td_head td_head1 td_head_w3">5000/单 page</td>
                  <td class="td_head td_head_w4">填报在协议中的"展览服务页"项</td>
                </tr>
                <tr></tr>
                </thead>
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
        /*width 100%*/
        overflow: auto
        .table_title1
          font-size 0.34rem
          margin-bottom 0.2rem
        .table_title2
          font-size 0.24rem
          margin-bottom 0.1rem
          color: red
        .tr_head
          border 0.01rem solid #333
          .td_head1
            border-right 0.01rem solid #333
          .td_head
            text-align center
          .td_head_w1
            width 1.8rem
          .td_head_w2
            width 2.2rem
          .td_head_w3
            width 2.2rem
          .td_head_w4
            width 2.5rem
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
