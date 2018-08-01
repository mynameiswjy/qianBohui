<template>
    <div class="mask">
      <div class="wraps">
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
          <select>
            <option value ="volvo">1人</option>
            <option value ="saab">2人</option>
            <option value="opel">3人</option>
            <option value="audi">4人</option>
          </select>
          <div>确定</div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import '@/assets/mask.css'
export default {
  name: 'visit',
  data() {
    return {
      tow: false
    }
  },
  methods: {
    closeTemp() {
      this.$emit("closeVisit", this.tow)
    }
  }
}
</script>

<style scoped >
  .wraps{
    margin-top: 0.82rem;
  }
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
    width: 6.18rem;
    height: 0.92rem;
    border-radius: 0.08rem;
    padding: 0.2rem 0.3rem;
    border: 0.01rem solid #eee;
    border: 0.01rem solid #d3d5d6;
    color: #b7b7b7;
  }

  .foot-select select{
    width: 3.02rem;
    height: 0.72rem;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background-color: #fff;
  }
</style>
