<template>
  <div class="">
    <ul class="upload_temp_img">
      <li class="show-img" :class="{'show-img1': index == 0}" v-for="(item, index) in imgs" :key="index">
        <img :src="getObjectURL(item)" alt="">
        <span class="iconfont icon-guanbi" @click="delImg(index)"></span>
      </li>
      <div class="upload-img">
        <img src="../../assets/images/add_img.png" class="img_btn" alt="上传图标">
        <input type="file" value="" ref="inputer" class="input_file" @change='onUpload'>
        <div class="upload-img-add">添加图片</div>
      </div>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { deleteImage } from '../../api/index'
export default {
  name: "imgUpload",
  data() {
    return {
      imgs: [], // 图片容器
      imgLen: 0, // 记录图片个数
      imgId: []
    }
  },
  created() {
  },
  methods: {
    onUpload(e) {
      let dataObj = e.target.files[0]
      // 图片限制
      let oldLen = this.imgLen;
      if(oldLen > 7) {
        this.$message.error('上传图片不能超过 8 张');
        return false;
      }
      let size = Math.floor(dataObj.size / 1024);
      if (size > 2 * 1024 * 1024) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false
      }
      const isJPEG = dataObj.type === 'image/jpeg';
      const isJPG = dataObj.type === 'image/jpg';
      const isPNG = dataObj.type === 'image/png';
      const isBMP = dataObj.type === 'image/bmp';
      if (!isJPG && !isPNG && !isBMP && !isJPEG) {
        this.$message.error('上传图片必须是JPG/PNG/BMP 格式!');
        return false
      }
      this.imgs = this.imgs.concat(dataObj)
      //创建 formData 对象
      let formData = new FormData();
      // 向 formData 对象中添加文件
      formData.append('file', dataObj);
      const instance = axios.create({
        'Content-Type': 'multipart/form-data'
      })
      instance.post('https://www.chbice.com/qbh/uploadDownload/uploadImage.do', formData).then(res => {
        if (res.data.returnCode == '0000') {
          this.imgLen++;
          this.imgId = this.imgId.concat(res.data.returnData.id)
          this.$emit('imgIdObj', this.imgId)
        }
      }).catch(err => {
        alert('图片上传错误')
        console.log(err)
      })
    },
    getObjectURL(file) {
      let url = null
      if (window.createObjectURL != undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL != undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL != undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    delImg(e) { // 图片删除
      let id = this.imgId[e]
      deleteImage({id: id}).then(res => {
        this.imgs.splice(e, 1)
        this.imgId.splice(e, 1)
        this.$emit('imgIdObj', this.imgId)
        this.imgLen--;
      })
    },
  }
}
</script>

<style scoped lang="stylus">
  .upload_temp_img
    display: flex
    flex-wrap: wrap;
    .show-img
      width: 1.66rem;
      height: 1.66rem;
      border: 0.01rem solid #BFBFBF;
      border-radius 0.05rem
      margin-right 0.33rem
      margin-top 0.2rem
      position relative
      .icon-guanbi
        font-size 0.16rem
        color: #fff
        border-radius 0.14rem
        width 0.28rem
        height 0.28rem
        text-align center
        line-height 0.28rem
        background-color: #DD1010
        position absolute
        top 0
        right 0
      img
        width 100%
        height 100%
    .upload-img
      width: 1.66rem;
      height: 1.66rem;
      border: 0.01rem dashed #BFBFBF;
      position relative
      display: inline-block;
      overflow: hidden;
      text-decoration: none;
      text-indent: 0;
      background-color: #FBFDFF
      margin-top 0.2rem
      .input_file
        color: transparent;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        opacity: 0;
      .img_btn
        display: block;
        margin: 0 auto;
        width: 0.44rem;
        height: 0.39rem;
        margin-top: 0.44rem;
      .upload-img-add
        height 0.82rem
        line-height: 0.72rem;
        text-align center
</style>
