<template>
    <div class="mask" :class="{show: isShow}">
      <div class="wrap">
        <div class="res-title">
          <h2>展位预定</h2>
          <img @click="closeTemp" src="../../assets/images/close.png" alt="">
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
            <div>展位号</div>
            <div class="mandatory">*</div>
          </div>
          <input type="text"/>
        </div>
        <div class="list">
          <div class="list-left">
            <div>展位类型</div>
            <div class="mandatory">*</div>
          </div>
          <select>
            <option value ="volvo">请选择</option>
            <option value ="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <div class="list">
          <div>展位数量</div>
          <input type="text"/>
        </div>
        <div class="list">
          <div>展位面积</div>
          <input type="text"/>
        </div>
        <div class="list">
          <div class="list-left">
            <div>展位负责人</div>
            <div class="mandatory">*</div>
          </div>
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
        <div class="list-upload">
          <div>资料上传</div>
          <div class="upload">如需下载预定资料，请点击<img src="../../assets/images/zh-down.png" alt=""></div>
        </div>
        <div class="add-img">
          <div class="upload-img">
            <img src="../../assets/images/add_img.png" alt="">
            <div>添加图片</div>
          </div>
          <!--<img src="" alt="">-->
        </div>
        <div class="btns">确定</div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
import '../../assets/mask.css'
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
      // this.isShow = !this.isShow
      this.$emit("closeTemp", this.one)
    }
  }
}
</script>

<style scoped >
  .wrap{
    margin-top: 0.82rem;
  }
  .list select{
    width: 4.77rem;
    height: 0.75rem;
    padding: 0.2rem 0.3rem;
    border-radius: 0.08rem;
    border: 0.01rem solid rgba(198,160,86,1);
    color: #000;
  }
  .list select{
    padding: 0 0.3rem;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    background: url("../../assets/images/zh-drop-down.png") no-repeat scroll 92% center transparent;
    background-size: 0.22rem 0.12rem;
    padding-right: 0.2rem;
    border: 0.01rem solid #d3d5d6;
    color: #b7b7b7;
  }
  .upload{
    width: 4.77rem;
    text-align: left;
    font-size: 0.24rem;
    color: #C8A258;
    margin-left: 0.3rem;
  }
  select::-ms-expand { display: none; }
  .upload img{
    width: 0.1rem;
    height: 0.19rem;
    margin-left: 0.21rem;
  }
  .add-img{
    display: flex;
    margin: 0 0.36rem 0.36rem;
    font-size: 0.24rem;
  }
  .upload-img{
    width: 1.68rem;
    height: 1.68rem;
    border: 0.01rem dashed #BFBFBF;
  }
  .upload-img img{
    display: block;
    margin: 0 auto;
    width: 0.44rem;
    height: 0.39rem;
    margin-top: 0.44rem;
  }
  .upload-img div{
     text-align: center;
    margin-top: 0.19rem;
  }
  .btns{
    width:6.78rem;
    height:0.72rem;
    background:rgba(200,162,88,1);
    border-radius:0.12rem;
    font-size: 0.28rem;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
    text-align: center;
    line-height: 0.72rem;
    margin-left: 0.36rem;
  }
</style>
