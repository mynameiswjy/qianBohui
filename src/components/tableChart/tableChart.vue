<template>
  <div>
    <table class="table_wrap" cellpadding="0" cellspacing="0" border="0">
      <tr><!--https://www.chqbh.com/imgFile/cut/sell_out.png已售完图片-->
        <td class="td_left bg_yellow">项目</td>
        <td colspan="2" class="bg_hui">规格</td>
        <td class="bg_hui bor_left" :class="{'bg_hui1': !isShowRemark}">
          <p>价格</p>
          <p>(元/个)</p>
        </td>
        <td class="td_right bor_left remark_bg" v-show="isShowRemark">
          <p>备注</p>
          <p>及数量</p>
        </td>
      </tr>
      <tr>
        <td class="bg_yellow" style="border-bottom: 0.01rem solid #f4f3f3;height: 0.73rem;">
          <p>会刊</p>
          <p>内页</p>
        </td>
        <td colspan="2" class="bor_bottom">参见会刊广告信息</td>
        <td class="bor_left bor_bottom">5000/page</td>
        <td style="font-size: 0.2rem;" class="bor_left bor_bottom" v-show="isShowRemark">
          <p>填报在协议</p>
          <p>中的“展览服</p>
          <p>务费”项</p>
        </td>
      </tr>
      <tr>
        <td rowspan="12" class="bg_yellow bor_rad_bott_left">展位</td>
        <td rowspan="8" class="bor_bottom">
          <div>特装位</div>
          <div>(空地)</div>
        </td>
        <td class="bor_bottom bor_left">10mx10m</td>
        <td class="bor_left bor_bottom">275000</td>
        <td class="bor_left bor_bottom" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="bor_bottom">9mx9m</td>
        <td class="bor_left bor_bottom">225000
        <td class="bor_left bor_bottom" v-show="isShowRemark">
        <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
      </td>
      </tr>
      <tr>
        <td class="bor_bottom">9mx6m</td>
        <td class="bor_left bor_bottom">150000</td>
        <td class="bor_left bor_bottom" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="bor_bottom">8mx6m</td>
        <td class="bor_left bor_bottom">130000</td>
        <td class="bor_left bor_bottom" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="bor_bottom">3mx9m</td>
        <td class="bor_left bor_bottom">68000</td>
        <td class="bor_left bor_bottom" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="bor_bottom">6mx6m</td>
        <td class="bor_left bor_bottom">99000</td>
        <td class="bor_left bor_bottom" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="bor_bottom">6mx4m</td>
        <td class="bor_left bor_bottom">72000</td>
        <td class="bor_left bor_bottom" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="bor_bottom">3mx6m</td>
        <td class="bor_left bor_bottom">45000</td>
        <td class="bor_left bor_bottom" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td rowspan="2" class="bor_bottom">A级</td>
        <td class="bor_left bor_bottom">3mx3m标</td>
        <td class="bor_left bor_bottom">20000</td>
        <td class="bor_left bor_bottom" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td class="bor_bottom">3mx3m拐</td>
        <td class="bor_left bor_bottom">22000</td>
        <td class="bor_left bor_bottom" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td rowspan="2">B级</td>
        <td class="bor_left bor_bottom">3mx3m标</td>
        <td class="bor_left bor_bottom">18000</td>
        <td class="bor_left bor_bottom" v-show="isShowRemark">
          <img class="out_print" src="https://www.chqbh.com/imgFile/cut/sell_out.png" alt="">
        </td>
      </tr>
      <tr>
        <td>3mx3m拐</td>
        <td class="bor_left">20000</td>
        <td class="bor_left" v-show="isShowRemark">
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
  p
    line-height 1.3
  .bg_yellow
    background-color: #eed582;
  .bg_hui
    background-color: #CFCFCF;
  .bg_hui1
    width 2.5rem
  .table_wrap
    font-size: 0.24rem
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
      height 0.85rem
      border-bottom 0.01rem solid #f4f3f3;
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
</style>
