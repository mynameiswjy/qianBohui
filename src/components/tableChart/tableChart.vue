<template>
  <div>
    <table class="table_wrap" cellpadding="8" cellspacing="0" border="1">
      <tr>
        <td>项目</td>
        <td colspan="2">规格</td>
        <td>价格(元/个)</td>
      </tr>
      <tr>
        <td>会刊内页</td>
        <td colspan="2">参见会刊广告信息</td>
        <td>5000/page</td>
      </tr>
      <tr>
        <td rowspan="11">展位</td>
        <td rowspan="7">
          <div>特装位</div>
          <div>(空地)</div>
        </td>
        <td>10mx10m</td>
        <td>275000</td>
      </tr>
      <tr>
        <td>9mx9m</td>
        <td>225000</td>
      </tr>
      <tr>
        <td>9mx6m</td>
        <td>150000</td>
      </tr>
      <tr>
        <td>8mx6m</td>
        <td>130000</td>
      </tr>
      <tr>
        <td>3mx9m</td>
        <td>68000</td>
      </tr>
      <tr>
        <td>6mx6m</td>
        <td>99000</td>
      </tr>
      <tr>
        <td>3mx6m</td>
        <td>45000</td>
      </tr>
      <tr>
        <td rowspan="2">A级</td>
        <td>3mx3m标</td>
        <td>20000</td>
      </tr>
      <tr>
        <td>3mx3m拐</td>
        <td>22000</td>
      </tr>
      <tr>
        <td rowspan="2">B级</td>
        <td>3mx3m标</td>
        <td>18000</td>
      </tr>
      <tr>
        <td>3mx3m拐</td>
        <td>20000</td>
      </tr>

    </table>
  </div>
</template>

<script>
export default {
  name: "tableChart",
  data() {
    return {
    }
  }
}
</script>

<style scoped lang="stylus">
  /*table>tr>td*/
  .table_wrap
    font-size: 0.28rem
    width 100%
    text-align center
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
</style>
