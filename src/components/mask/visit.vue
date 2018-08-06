<template>
    <div class="mask" ref="wrapper">
      <scroll :data="goods" style="height: 100%">
        <div class="wraps" :class="{p_bottom: p_bottom}" ref="content">
          <div class="res-title">
            <h2>参观登记</h2>
            <img @click="closeTemp" src="../../assets/images/close.png" alt="">
          </div>
          <div class="list">
            <div class="list-left">
              <div>观众类别</div>
              <div class="mandatory">*</div>
            </div>
            <input type="text"/>
          </div>
          <div class="list">
            <div class="list-left">
              <div>公司名称</div>
              <div class="mandatory">*</div>
            </div>
            <input type="text"/>
          </div>
          <div class="list">
            <div class="list-left">
              <div>公司地址</div>
              <div class="mandatory">*</div>
            </div>
            <input type="text"/>
          </div>
          <div class="list">
            <div class="list-left">
              <div>手机号码</div>
              <div class="mandatory">*</div>
            </div>
            <input type="text"/>
          </div>
          <div class="list">
            <div class="list-left">
              <div>电子邮件</div>
              <div class="mandatory">*</div>
            </div>
            <input type="text"/>
          </div>
          <div class="list">
            <div class="list-left">
              <div>QQ/微信号</div>
              <div class="mandatory">*</div>
            </div>
            <input type="text"/>
          </div>
          <div class="note">备注信息</div>
          <textarea name="" class="textarea" id="" cols="30" rows="10"></textarea>
          <div class="foot-select">
            <select class="select-bottom left-margin">
              <option value ="volvo">1人</option>
              <option value ="saab">2人</option>
              <option value="opel">3人</option>
              <option value="audi">4人</option>
            </select>
            <div>确定</div>
          </div>
        </div>
      </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import '@/assets/mask.css'
import Scroll from '@/utils/scroll'
import datas from '@/assets/goods-list'
import { isBottom } from '@/utils/utils'

let _foods = []

datas.goods.forEach((item) => {
  _foods = _foods.concat(item.foods)
})

export default {
  name: 'visit',
  data() {
    return {
      tow: false,
      goods: _foods,
      p_bottom: false
    }
  },
  methods: {
    closeTemp() {
      this.$emit("closeVisit", this.tow)
    }
  },
  mounted() {
    let wrapper = this.$refs.wrapper.clientHeight
    let content = this.$refs.content.clientHeight
    this.p_bottom = isBottom(wrapper, content)
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus">
  .mask
    /*padding-top 0.82rem*/
    .wraps
      overflow hidden
  .note {
    font-size: 0.3rem;
    line-height: 0.87rem;
    margin: 0 0.26rem;
    color: #000;
    /*font-weight: 600;*/
    font-family: PingFangSC-Regular;
    padding-top: 0.14rem;
  }

  .textarea {
    margin-left: 0.36rem;
    margin-top: 0.1rem;
    margin-bottom 0.42rem;
    width: 6.18rem;
    height: 0.92rem;
    border-radius: 0.08rem;
    padding: 0.2rem 0.3rem;
    border: 0.01rem solid #eee;
    border: 0.01rem solid #d3d5d6;
    color: #b7b7b7;
  }

  .foot-select
    border-top: 0.01rem solid rgba(238,240,242,1)
    padding-top 0.38rem
    padding-bottom 0.39rem
    display flex
    .select-bottom
      position relative
      width: 3.02rem;
      height: 0.72rem;
      appearance:none;
      -moz-appearance:none;
      -webkit-appearance:none;
      background-color: #fff;
      background: url("../../assets/images/zh-drop-down.png") no-repeat scroll 92% center transparent;
      background-size: 0.22rem 0.12rem;
      padding-right: 0.2rem;
      border: 0.01rem solid #C7A157;
      color: #C7A157
      padding-left 1rem
    div
      width:3.2rem;
      height:0.72rem;
      background:rgba(199,161,87,1);
      border-radius:0.12rem;
      font-size 0.28rem
      color: #fff
      text-align center
      line-height 0.72rem
      margin-left 0.74rem
    .select-bottom:after
      content: '';
      position: absolute;
      left: 18px;
      top: auto;
      bottom: 0;
      right: auto;
      height: 300px;
      width: 2px;
      border-radius:5px;
      background-color: #bfa;
</style>
