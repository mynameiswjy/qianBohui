<template>
    <div class="mask mask_reser" :class="{show: isShow}" ref="wrapper" @touchmove.prevent>
      <navTemp></navTemp>
      <scroll style="height: 100%" :data="userInputList.selectItem">
        <div class="wraps" ref="content">
          <ul style="position: relative;">
            <div style="height: .13rem;"></div>
            <li v-for="(item, index) in userInputList.selectItem" :key="index">
              <div class="list mask-margin" v-if="(item.isType == 'I')">
                <div class="list-left">
                  <div v-show="item.isRequired == 'Y'" class="mandatory">*</div>
                  <div>{{item.name}}</div><!-- :class="{'list-left-text': item.name.length === 4, 'list-left-text1': item.name.length === 3}"-->
                </div>
                <input v-model="item[item.code]" :placeholder="'请输入' + item.name" type="text"/>
              </div>
              <div class="list mask-margin" v-if="(item.isType == 'S')">
                <div class="list-left">
                  <div v-show="item.isRequired == 'Y'" class="mandatory">*</div>
                  <div>{{item.name}}</div>
                </div>
                <div style="position: relative;" class="select_wrap">
                  <select v-model="item[item.code]" :class="{select1: !item[item.code]}">
                    <option v-for="(opt, idx) in JSON.parse(item.exe1)" :key="idx" :value="opt.code">{{opt.name}}</option>
                  </select>
                  <div v-show="!item[item.code]" class="iconfont icon-jiantou"></div>
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
            <a class="upload" href="#"  @click="downloadData">(如需下载预定资料，请点击)</a>
          </div>
          <div class="add-img">
            <imgUpload @imgIdObj="imgArr"></imgUpload>
          </div>
          <div @click="sendData" class="btns">确定</div>
          <div style="height: 0.25rem"></div>
        </div>
      </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import '@/assets/mask.css'
import Scroll from '@/utils/scroll'
import Loading from '../loading/loading'
import { getRegisterTypeInfo, deleteImage, putRegisterInfo } from '@/api/index'
import imgUpload from '../imgUpload/imgUpload'
import navTemp from '../navTemp.vue'

//var md5 = require('js-md5')

export default {
  name: "consulting",
  data() {
    return {
      isShow: false,
      isReservationPage: false,
      imgNum: 0,
      userInputList: {},
      sendList: [],
      images: []
    }
  },
  activated() {
    this.initInputList()
  },
  created() {
  },
  mounted: function () {
    /*let wrapper = this.$refs.wrapper.clientHeight
    let content = this.$refs.content.clientHeight*/
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
      if (this.images.length <= 0) {
        this.$message.error('图片为必须上传项');
        return false
      }
      console.log(sendList)
      for (let i in sendList) {
        sendList[i] = sendList[i] ? sendList[i] : ' '//  md5(sendList[i])
      }
      let data = Object.assign({}, initData, sendList, {
        type: 'BOOTH_RESERVE',
        images: this.images.join(',')
      })
      console.log(data)
      putRegisterInfo(data).then(res => {
        if (res.data.returnCode === '0000') {
          this.$emit("closeTemp", this.isReservationPage)
          this.$message.success(res.data.returnMessage)
        } else {
          this.$message.error(res.data.returnMessage);
        }
      })
    },
    initInputList() {
      getRegisterTypeInfo({registerType: 'BOOTH_RESERVE'}).then(res => {
        if (res.data.returnCode === '0000') {
          console.log(this.userInputList, 'this.userInputList');
          this.userInputList = res.data.returnData
          document.title = res.data.returnData.name;
        }
      })
    },
    // 接受上传图片组件 成功上传后的id
    imgArr(e) {
      this.images = e
    },
    closeTemp() {
      this.$emit("closeTemp", false)
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
      const isJPEG = file.type === 'image/jpeg';
      const isJPG = file.type === 'image/jpg';
      const isPNG = file.type === 'image/png';
      const isBMP = file.type === 'image/bmp';
      const isLt2M = file.size / 1024 / 1024 < 2;
      let isImg = true
      if (!isJPG && !isPNG && !isBMP && !isJPEG) {
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
      this.$router.push({path: 'downloadList'});
    }
  },
  components: {
    Scroll,
    Loading,
    imgUpload,
    navTemp
  }
}
</script>

<style scoped lang="stylus">
  .mask_reser
    overflow scroll
  .select_wrap
    .icon-jiantou
      position: absolute
      top 50%
      transform translateY(-50%)
      font-size .28rem
      color #999
      right 0
  .select-default
    position absolute
    top: 50%
    transform translateY(-50%)
    left 0
    font-size 0.32rem
    color #999
  .loading-wrap
    height 3rem
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    left 50%
    transform: translate(-50%, -50%)
  .list select{
    width: 4.8rem;
    background-color #fff
    height: 0.5rem;
    border-radius: 0.14rem;
    padding-left 0.2rem
    box-sizing border-box
    color: #333;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    border: 0 solid #d3d5d6;
  }
  .list .select1{
  }
  .upload{
    width: 4.77rem;
    text-align: left;
    font-size: 0.18rem;
    color: #BFA267;
    margin-left: 0.1rem;
  }
  select::-ms-expand { display: none; }
  .upload img{
    width: 0.1rem;
    height: 0.16rem;
    margin-left: 0.15rem;
  }
  .add-img
    display: flex;
    margin: 0 0.36rem 0.76rem;
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
    width: 6.9rem;
    height:0.88rem;
    background-color: #BFA267;
    border-radius: 0.44rem;
    font-size: 0.36rem;
    font-family:PingFangSC-Regular;
    color: #fff/*#;*/
    text-align: center;
    line-height: 0.88rem;
    font-weight 600
    letter-spacing: 0.04rem;
    margin-left: 0.25rem;
  }
</style>
