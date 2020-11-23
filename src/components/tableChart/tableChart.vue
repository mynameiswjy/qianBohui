<template>
  <div>
    <table class="table_wrap" cellpadding="0" cellspacing="0" border="0">
      <tr class="high"><!--https://www.chqbh.com/imgFile/cut/sell_out.png已售完图片-->
        <td class="td_left bg_yellow font_color_white">项目</td>
        <td colspan="2" class="bg_yellow font_color_white">规格</td><!--bg_hui-->
        <td class="bg_yellow font_color_white" :class="{'bg_hui1': !isShowRemark}">
          <p>价格</p>
          <p>(元/个)</p>
        </td>
        <td class="td_right bor_left remark_bg" v-show="isShowRemark">
          <p>备注</p>
          <p>及数量</p>
        </td>
      </tr>
      <tr>
        <td class="bg_hui with" style="height: 0.75rem;padding-top: .1rem;">
          <p>会刊</p>
          <p>内页</p>
        </td>
        <td colspan="2" class="row column">参见会刊广告信息</td>
        <td class="row">5000/page</td>
        <td style="font-size: 0.2rem;" class="" v-show="isShowRemark">
          <p>填报在协议</p>
          <p>中的“展览服</p>
          <p>务费”项</p>
        </td>
      </tr>
      <tr>
        <td rowspan="12" class="bg_hui">展位</td>
        <td rowspan="8" class="column row">
          <div>特装位</div>
          <div>(空地)</div>
        </td>
        <td class="table_height row column">10mx10m</td>
        <td class="table_height row">275000</td>
        <td class=" " v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="table_height row column">9mx9m</td>
        <td class="table_height row">225000
        <td class="" v-show="isShowRemark">
        <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
      </td>
      </tr>
      <tr>
        <td class="table_height row column">9mx6m</td>
        <td class="table_height row">150000</td>
        <td class=" " v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="table_height row column">8mx6m</td>
        <td class="table_height row">130000</td>
        <td class="" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="table_height row column">3mx9m</td>
        <td class="table_height row">68000</td>
        <td class="" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="table_height row column">6mx6m</td>
        <td class="table_height row">99000</td>
        <td class="" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="table_height row column">6mx4m</td>
        <td class="table_height row">72000</td>
        <td class=" " v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="table_height row column">3mx6m</td>
        <td class="table_height row">45000</td>
        <td class=" " v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td rowspan="2" class="column row">A级</td>
        <td class="table_height row column">3mx3m标</td>
        <td class="table_height row">20000</td>
        <td class="" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="table_height row column">3mx3m拐</td>
        <td class="table_height row">22000</td>
        <td class=" " v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td rowspan="2" class="column">B级</td>
        <td class="table_height row column">3mx3m标</td>
        <td class="table_height row">18000</td>
        <td class="" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="column">3mx3m拐</td>
        <td class="table_height">20000</td>
        <td class="" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>

    </table>
  </div>
</template>

<script>
export default {
  name: "tableChart",
  data() {
    return {
      isShowRemark: false
    }
  }
}
</script>

<style scoped lang="stylus">
  /*table>tr>td*/
  .table_wrap .high {
    height: 1.04rem;
  }
  .table_wrap .with {
    width: 1.04rem;
  }
  .table_height {
    height .6rem
  }
  .font_color_white {
    color #fff
  }
  p
    line-height 1.3
  .bg_yellow
    background-color: #BFA267
  .bg_hui
    background-color: #D8D8D8;
  .bg_hui1
    width 2.5rem
  .table_wrap
    font-size: 0.28rem
    width 100%
    text-align center
    background-color: #ffffff;
    box-shadow: 0.03rem 0.05rem 0.06rem 0  rgba(86, 88, 89, 0.18);
    border-radius: 0.3rem
    overflow hidden
    .remark_bg
      background-color: #CFCFCF;
    .out_print
      width 0.98rem
      height auto
      max-height 0.45rem
      display table-cell
      margin 0 auto
    .td_left
      width 0.83rem
      height 0.85rem/*
      border-bottom 0.01rem solid #f4f3f3;*/
      border-radius 0.3rem 0 0 0
    .td_right
      width 1.17rem
      height 0.85rem
      border-radius 0 0.3rem 0 0
    .td_title
      width 2.94rem
    .td_title2
      width 1.35rem
    .bor_left
      border-left 0.01rem solid #BFBFBF;
    .bor_right
      border-left 0.01rem solid #BFBFBF;
    .bor_bottom
      border-bottom 0.01rem solid #BFBFBF;
    .bor_rad_bott_left
      border-radius 0 0 0 0.3rem
  .row
    border-bottom 0.01rem solid #e6e6e6
  .column
    border-right 0.01rem solid #e6e6e6
</style>
