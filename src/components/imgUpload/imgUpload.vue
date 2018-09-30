<template>
  <div class="uploadImg">
    <div class="upload-content">
      <div class="upload-title">
        <p>{{upTitle}}</p>
        <p class="show-num">{{upNum}}/{{uploadNum}}</p>
      </div>
      <ul class="img-list">
        <li class="show-img" v-for="(item, index) in imgList" :key="index">
          <img :src="item" alt="">
          <kk-icon :class="isDel == true ? '' : 'hide-del'" name="error" color="#FF685D" size="0.4rem" @click.native="delImg(index)"></kk-icon>
        </li>
        <div class="uploadSec">
          <img src="../../assets/images/add_img.png" alt="上传图标">
          <input type="file" value="" id="choose" @change='onUpload' multiple>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "imgUpload"
}
</script>

<style scoped lang="stylus">
  .uploadImg{
    text-align: left;
    .upload-content{
      margin-left: 0.3rem;
      .upload-title{
        display: flex;
        justify-content: space-between;
        padding: 0.3rem 0.3rem 0.3rem 0;
        .show-num{
          color: #c9c9c9;
        }
      }
      .img-list{
        display: inline-block;
        margin: 0.6rem 0.3rem 0.3rem 0;
        .show-img{
          position: relative;
          display: inline-block;
          margin-right: 0.12rem;
          height: 1.3rem;
          width: 1.3rem;
          img{
            width: 100%;
            height: 100%;
          }
          .hide-del{
            display: none;
          }
          .yd-icon-error{
            position: absolute;
            top: 0;
            right: 0;
          }
        }
        .uploadSec{
          position: relative;
          display: inline-block;
          width: 1.3rem;
          height: 1.3rem;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
          #choose{
            position: absolute;
            height: 100%;
            left: 0;
            top: 0;
            opacity: 0;
          }
        }
      }
    }
  }
</style>
