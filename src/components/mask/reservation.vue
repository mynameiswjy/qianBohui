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
              <div class="list" v-if="(item.isType == 'I')">
                <div class="list-left">
                  <div>{{item.name}}</div>
                  <div v-show="item.isRequired == 'Y'" class="mandatory">*</div>
                </div>
                <input v-model="item[item.code]" type="text"/>
              </div>
              <div class="list" v-if="(item.isType == 'S')">
                <div class="list-left">
                  <div>{{item.name}}</div>
                  <div v-show="item.isRequired == 'Y'" class="mandatory">*</div>
                </div>
                <div style="position: relative;">
                  <select v-model="item[item.code]" :class="{select1: !item[item.code]}">
                    <option v-for="(opt, idx) in JSON.parse(item.exe1)" :key="idx" :value="opt.name">{{opt.name}}</option>
                  </select>
                  <div v-show="!item[item.code]" class="select-default">请选择</div>
                </div>
              </div>
            </li>
            <div v-show="!userInputList.selectItem" class="loading-wrap">
              <loading class="loading-container"></loading>
            </div>
          </ul>
          <div class="list-upload">
            <div>资料上传</div>
            <a class="upload" href="https://www.baidu.com/ssid=0844c0cff1c481eddf5e562c/from=844b/s?word=%E4%BD%A0%E6%83%B3%E8%A6%81%E6%90%9C%E4%BB%80%E4%B9%88&ts=6667273&t_kt=0&ie=utf-8&fm_kl=021394be2f&rsv_iqid=3412737581&rsv_t=70401nkEEm55acjeiklq7MZqKB39DKmDLeLh6wVZZbjW77QbxQ%252BSrGc%252BwQ&sa=ib&ms=1&rsv_pq=3412737581&rsv_sug4=7969&tj=1&inputT=5115&ss=100"  @click="downloadData">如需下载预定资料，请点击<img src="../../assets/images/zh-down.png" alt=""></a>
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
              :on-remove="onRemoveImg"
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

var md5 = require('js-md5')

export default {
  name: "consulting",
  data() {
    return {
      isShow: false,
      one: false,
      p_bottom: false,
      imgNum: 0,
      userInputList: {},
      sendList: [],
      images: []
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
      let initData = {
        boothId: ' ', // 展位号
        boothLeader: ' ', // 展位负责人
        companyName: ' ', // 公司名称
        boothNum: ' ', // 展位数量
        boothType: ' ', //select选择框
        emailAddress: ' ', // 邮箱地址
        phoneNum: ' ', // 手机号码
        qqCode: ' ', // qq号码
        boothArea: ' ',
        compa_InyUrl: ' ',
        wxCode: " "
      }
      let selectItem = this.userInputList.selectItem
      let sendList = {}
      for (var i = 0; i < selectItem.length; i++) {
        let data = selectItem[i]
        let key = data.code
        let value = data[key]
        sendList[key] = value
        let isRequired = data.isRequired
        // qq号码验证
        if (key === 'qqCode' && value) {
          if (!/^[1-9][0-9]{4,14}$/.test(value)) {
            this.$message.error('请输入正确的QQ号！');
            return false
          }
        }
        // 邮箱验证
        if (key === 'emailAddress' && value) {
          let regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
          if (!regEmail.test(value)) {
            this.$message.error('请输入正确的邮箱！');
            return false
          }
        }
        // 手机号验证
        if (key === 'phoneNum' && value) {
          let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
          if (!myreg.test(value)) {
            this.$message.error('请输入正确的手机号！');
            return false
          }
        }
        if (isRequired === 'Y' && !value) {
          this.$message.error('带*为必填项，请填写完整');
          return false
        }
      }
      if (!this.images.length) {
        this.$message.error('图片为必须上传项');
        return false
      }
      /*console.log(sendList)
      console.log('报名成功')
      return false*/
      for (let i in sendList) {
        sendList[i] = sendList[i] ? md5(sendList[i]) : ' '
      }
      let data = Object.assign({}, initData, sendList, {
        type: 'BOOTH_RESERVE',
        images: this.images.join(',')
      })
      console.log(data)
      putRegisterInfo(data).then(res => {
        if (res.data.returnCode === '0000') {
          this.$emit("closeTemp", this.one)
          this.$message.success('报名成功！')
        } else {
          this.$message.error('服务器错误或上传失败，请重新填写');
        }
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
      this.images = this.images.concat(file.response.returnData.id)
      console.log(this.images.join(','))
    },
    beforRemove(file, fileList) { // 删除图片
      let id = file.response.returnData.id
      deleteImage({id: id}).then(res => {
        console.log(res)
      })
    },
    onRemoveImg(file, fileList) {
      this.images = fileList.map(item => {
        return item.response.returnData.id
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
    },
    downloadData() {
      console.log(2222)
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
