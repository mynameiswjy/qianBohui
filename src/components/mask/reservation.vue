<template>
    <div class="mask" :class="{show: isShow}" ref="wrapper" @touchmove.prevent>
      <scroll style="height: 100%" :data="userInputList.selectItem">
        <div class="wraps" :class="{p_bottom: p_bottom}" ref="content">
          <div class="res-title">
            <h2>{{userInputList.name}}</h2>
            <img @click="closeTemp" src="../../assets/images/close.png" alt="">
          </div>
          <ul style="position: relative;">
            <li v-for="(item, index) in userInputList.selectItem" :key="index">
              <div class="list" v-if="(item.sore != 3)">
                <div class="list-left">
                  <div>{{item.name}}</div>
                  <div class="mandatory">*</div>
                </div>
                <input v-model="sendList[item.name]" type="text"/>
              </div>
              <div class="list" v-else>
                <div class="list-left">
                  <div>{{item.name}}</div>
                  <div class="mandatory">*</div>
                </div>
                <div style="position: relative;">
                  <select v-model="sendList[item.name]" :class="{select1: !item.value}">
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                  </select>
                  <div v-show="!sendList[item.name]" class="select-default">请选择</div>
                </div>
              </div>
            </li>
            <div v-show="!userInputList.selectItem" class="loading-wrap">
              <loading class="loading-container"></loading>
            </div>
          </ul>
          <div class="list-upload">
            <div>资料上传</div>
            <div class="upload">如需下载预定资料，请点击<img src="../../assets/images/zh-down.png" alt=""></div>
          </div>
          <div class="add-img">
            <!--<div class="user-img">
              <img src="http://img.zcool.cn/community/0117e2571b8b246ac72538120dd8a4.jpg@1280w_1l_2o_100sh.jpg" alt="">
            </div>-->
            <el-upload
              action="https://www.chqbh.com/qbh/uploadDownload/uploadImage.do"
              list-type="picture-card"
              :before-upload="beforUpload"
              :limit="8"
              :before-remove="beforRemove"
              :on-preview="handlePictureCardPreview"
              :on-success="successImg"
            >
              <div class="upload-img">
                <img src="../../assets/images/add_img.png" alt="">
                <div class="upload-img-add">添加图片</div>
              </div>
            </el-upload>
          </div>
          <div @click="sendData" class="btns">确定</div>
          <div style="height: 0.18rem"></div>
        </div>
      </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import '@/assets/mask.css'
import Scroll from '@/utils/scroll'
import { isBottom } from '@/utils/utils'
import Loading from '../loading/loading'
import { getRegisterTypeInfo, deleteImage, putRegisterInfo } from '@/api/index'

export default {
  name: "consulting",
  data() {
    return {
      isShow: false,
      one: false,
      p_bottom: false,
      imgNum: 0,
      userInputList: {},
      sendList: []
    }
  },
  created() {
    this.initInputList()
  },
  mounted: function () {
    let wrapper = this.$refs.wrapper.clientHeight
    let content = this.$refs.content.clientHeight
    this.p_bottom = isBottom(wrapper, content)
  },
  methods: {
    sendData() {
      console.log(this.sendList)
      let data = {
        type: 'BOOTH_RESERVE',
      }
      putRegisterInfo(data).then(res => {
        console.log(res)
      })
    },
    initInputList() {
      getRegisterTypeInfo({registerType: 'BOOTH_RESERVE'}).then(res => {
        if (res.data.returnCode === '0000') {
          this.userInputList = res.data.returnData
        }
      })
    },
    closeTemp() {
      this.$emit("closeTemp", this.one)
    },
    handlePictureCardPreview(e) { // 点击文件列表中已上传的文件时的钩子
      console.log(e)
    },
    successImg(res, file, fileList) { // 上传成功后
      console.log('res', res)
      console.log('file', file)
      console.log('fileList', fileList)
    },
    beforRemove(file) {
      let id = file.response.returnData.id
      deleteImage({id: id}).then(res => {
        console.log(res)
      })
    },
    beforUpload(file) { // 上传之前执行
      this.imgNum++
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isBMP = file.type === 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 2;
      let isImg = true
      if (!isJPG && !isPNG && !isBMP) {
        this.$message.error('上传图片必须是JPG/PNG/BMP 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      if (this.imgNum > 8) {
        this.$message.error('上传图片不能超过 8 张');
        isImg = false
      }
      return (isJPG || isPNG || isBMP) && isLt2M && isImg;
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus">
  .select-default
    position absolute
    top: 0.02rem
    left: 0.3rem
    font-size 24rpx
    color #b7b7b7
  .loading-wrap
    height 3rem
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    left 50%
    transform: translate(-50%, -50%)
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
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    border: 0.01rem solid #d3d5d6;
    color: #666;
  }
  .list .select1{
    padding: 0 0.3rem;
    background: url("../../assets/images/zh-drop-down.png") no-repeat scroll 92% center transparent;
    background-size: 0.22rem 0.12rem;
    padding-right: 0.2rem;
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
    position relative
    img
      display: block;
      margin: 0 auto;
      width: 0.44rem;
      height: 0.39rem;
      margin-top: 0.44rem;
    .upload-img-add
      height 0.82rem
      line-height: 0.72rem;
      /*position absolute
      top: 0*/
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
