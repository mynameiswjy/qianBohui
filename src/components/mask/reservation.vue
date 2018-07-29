<template>
    <div class="mask" :class="{show: isShow}">
      <div class="wrap">
        <div class="res-title">
          <h2>展位预定</h2>
          <img @click="closeTemp" src="../../assets/images/close.png" alt="">
        </div>
        <div class="list">
          <div>公司名称</div>
          <input type="text"/>
        </div>
        <div class="list">
          <div>展位号</div>
          <input type="text"/>
        </div>
        <div class="list">
          <div>展位类型</div>
          <input type="text"/>
        </div>
        <div class="list">
          <div>展位数量</div>
          <select>
            <option value ="volvo">请选择</option>
            <option value ="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div class="list">
          <div>展位面积</div>
          <input type="text"/>
        </div>
        <div class="list">
          <div>展位负责人</div>
          <input type="text"/>
        </div>
        <div class="list">
          <div>手机号码</div>
          <input type="text"/>
        </div>
        <div class="list">
          <div>邮箱地址</div>
          <input type="text"/>
        </div>
        <div class="list">
          <div>资料上传</div>
          <div class="upload">如需下载预定资料，请点击<img src="" alt=""></div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "consulting",
  data() {
    return {
      isShow: false,
      one: false
    }
  },
  created() {
  },
  mounted: function () {
    this.$nextTick(function () {
      this.$on('childMethod', function () {
        console.log('监听成功')
      })
    })
  },
  methods: {
    closeTemp() {
      console.log(555)
      this.isShow = !this.isShow
//      this.$emit("closeTemp", this.one)
    }
  }
}
</script>

<style scoped >
  .show{
    display: none;
  }
  .mask{
    z-index: 999;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: rgba(1,1,1, 0.5);
  }
  .wrap{
    width: 100%;
    background-color: #fff;
  }
  .res-title{
    display: flex;
    font-size: 0.3rem;
    width: 100%;
    justify-content: center;
    height: 0.76rem;
    line-height: 0.76rem;
    position: relative;
    border-bottom: 0.01rem solid #EEF0F2;
    margin-top: 0.52rem;
    color: #C8A258;
    margin-bottom: 0.11rem;
  }
  .res-title img{
    width: 0.24rem;
    height: 0.24rem;
    position: absolute;
    right: 0;
    top: 0;
    padding: 0.26rem 0.36rem;
  }
  .list{
    font-size: 0.3rem;
    display: flex;
    justify-content: space-between;
    line-height: 0.75rem;
    margin: 0 0.26rem;
    color: #000;
    font-weight: 600;
    font-family:PingFangSC-Regular;
    padding-top: 0.14rem;
  }
  .list input,.list select{
    width: 4.77rem;
    height: 0.75rem;
    border-radius: 0.08rem;
    border: 0.01rem solid rgba(198,160,86,1);
    color: #eee;
  }
  .list select{
    padding: 0 0.2rem;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background: url("../../assets/images/zh-drop-down.png") no-repeat scroll right center transparent;
    background-size: 0.25rem 0.2rem;
    padding-right: 0.2rem;
  }
  .upload{
    width: 4.77rem;
    text-align: left;
  }
  select::-ms-expand { display: none; }
</style>
