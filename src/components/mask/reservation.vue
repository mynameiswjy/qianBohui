<template>
    <div class="mask" :class="{show: isShow}" ref="wrapper" @touchmove.prevent>
      <scroll :data="goods" style="height: 100%">
        <div class="wraps" :class="{p_bottom: p_bottom}" ref="content">
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
            <div class="user-img">
              <img src="http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg" alt="">
            </div>
            <el-upload
              action="https://weixin.566.com/api/Question/SaveUserFeedbackImage"
              list-type="picture-card"
              :before-upload="beforUpload"
              :on-preview="handlePictureCardPreview"
            >
              <div class="upload-img">
                <img src="../../assets/images/add_img.png" alt="">
                <div>添加图片</div>
              </div>
            </el-upload>
            <!--<img src="" alt="">-->
          </div>
          <div class="btns">确定</div>
          <div style="height: 0.18rem"></div>
        </div>
        <!--<ul class="wraps" ref="content">
          <li v-for="food in goods" class="food-item border-1px">
            <div class="icon">
              <img width="57" height="57" :src="food.icon">
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span class="count">66月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
            </div>
          </li>
        </ul>-->
      </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import '@/assets/mask.css'
import Scroll from '@/utils/scroll'
import { isBottom } from '@/utils/utils'
import datas from '@/assets/goods-list'

let _foods = []

datas.goods.forEach((item) => {
  _foods = _foods.concat(item.foods)
})

export default {
  name: "consulting",
  data() {
    return {
      isShow: false,
      one: false,
      goods: _foods,
      p_bottom: false
    }
  },
  created() {
  },
  mounted: function () {
    let wrapper = this.$refs.wrapper.clientHeight
    let content = this.$refs.content.clientHeight
    this.p_bottom = isBottom(wrapper, content)
  },
  methods: {
    closeTemp() {
      this.$emit("closeTemp", this.one)
    },
    handlePictureCardPreview(e) {
      console.log(e)
    },
    beforUpload(e) {
      console.log(e)
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus">
  /*html, body {
    overflow: hidden;
  }*/
  .mask
    .wraps
      overflow hidden
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
  .add-img
    display: flex;
    margin: 0 0.36rem 0.36rem;
    font-size: 0.24rem;
    .user-img
      background-color: #bfa
      width 1.68rem
      height 1.68rem
      margin-right 0.33rem
      img
        width 100%
        height 100%
  .upload-img
    width: 1.66rem;
    height: 1.66rem;
    border: 0.01rem dashed #BFBFBF;
    .el-upload__input
      display none!important
    img
      display: block;
      margin: 0 auto;
      width: 0.44rem;
      height: 0.39rem;
      margin-top: 0.44rem;
    .primary
      color b
      .el-upload__input
        display none!important
        color red
        background-color: #bfa
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
