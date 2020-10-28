<template>
  <div class="result_wrap" ref="imageWrapper">
    <div style="height: 1.45rem;"></div>
    <div class="result_title_wrap">
      <div class="result_title_bor"></div>
      <img class="result_title" src="https://www.chbice.com/imgFile/ico/logo.png" alt="">
      <div class="result_title_bor"></div>
    </div>
    <div class="result_img_wrap">
      <img class="result_img" src="https://www.chbice.com/imgFile/ico/ad_sesult/ad_result_coin_bg.png" alt="">
      <img class="result_img_title" src="https://www.chbice.com/imgFile/ico/result/ad_ result_title.png" alt="">
      <img :src="'https://www.chbice.com/imgFile/ico/coin/1' + coinUrl.coinImgUrl + '.png'" :class="{'result_img_coin1': coinUrl.coinImgUrl === 6}" class="result_img_coin" alt="">
      <div class="result_coin_name">{{coinUrl.patternFlag}}</div>
    </div>
    <img class="result_border" src="https://www.chbice.com/imgFile/ico/12312312312312.png" alt="">
    <img class="result_border1" src="https://www.chbice.com/imgFile/ico/result/d_ result_title_1.png" alt="">
    <div class="result_code">
      <p class="result_code_title">{{resultCodeTitle}}</p>
      <img class="result_code_img" src="https://www.chbice.com/imgFile/ico/result/ad_ result_boder.png" alt="">
      <img src="https://www.chbice.com/imgFile/ico/1211.png" class="code_img" alt="">
    </div>
    <div class="result_code result_code1">
      <p class="result_code_title result_code_title1">关注银行官方渠道获取相关信息</p>
      <div style="height: .42rem;"></div>
      <ul class="flex bank_list">
        <li class="bank_item" :class="{'bank_item1': (index+1)%2!==0}" v-for="(item, index) in dataObj.banks" :key="index">
          <img class="bank_item_img" :src="item" alt="">
        </li>
      </ul>
    </div>
    <div class="result_code2">
      <p class="result_code_title result_code_title2">中国金币官方销售渠道</p>
      <ul class="addr_list">
        <li v-for="(item, index) in dataObj.stores" :key="index" class="addr_item flex">
          <h3 class="addr_item_company">{{item.companyName}}</h3>
          <div>
            <div v-for="(shopInfo, idx) in item.info" :key="idx" class="flex addr_item_right">
              <h3 class="addr_item_shop">{{shopInfo.name}}</h3>
              <h3 class="addr_item_addr">{{shopInfo.address}}</h3>
            </div>
          </div>
        </li>
        <li style="text-align: left;padding-top: .4rem;margin-left: .25rem;">{{dataObj.specialString}}</li>
      </ul>
      <div class="flex result_btn_wrap">
        <p class="result_btn" @click="saveImg">保存秘笈</p>
        <p style="width: .48rem;"></p>
        <p class="result_btn" @click="joinActive">参与抽奖</p>
      </div>
    </div>
    <img class="result_border" src="https://www.chbice.com/imgFile/ico/12312312312312.png" alt="">
    <div class="result_remind">* 渠道相关信息均以中国金币网公示内容为准。</div>
    <div class="save_img" v-if="dialogTableVisible" @click.stop="closeSaveImg()">
      <div class="iconfont icon-close"></div>
      <div class="save_img_content" @click.stop="lookImg">
        <img :src="canvasImg" class=""/>
      </div>
      <div class="save_btn">
        <span>上下滑动查看完整图片，长按图片保存</span>
        <span class="iconfont icon-huabanfuben"></span>
        </div>
    </div>
  </div>
</template>

<script>
import {adSubmit, adList, offlineStore, baseUrl} from '../api/index'
import * as types from "../store/mutation-types";
// import html2canvas from 'html2canvas';
export default {
  name: "result",
  data() {
    return {
      dataObj: {
        banks: [],
        stores: [],
        specialString: ''
      },
      coinUrl: this.$store.state.adReqParams,
      dialogTableVisible: false,
      resultCodeTitle: '',
      canvasImg: ''
    }
  },
  created() {
  },
  mounted() {
  },
  activated() {
    this.resultCodeTitle = this.$store.state.adReqParams.shoppingSelect === 1 ? '金币云商直通车' : '直通金币云商感受线上新体验'
    document.title = '解锁牛年上上签';
    this.initAdData()
  },
  methods: {
    lookImg() {

    },
    closeSaveImg() {
      this.dialogTableVisible = false
    },
    saveImg() {
      offlineStore({answerId: this.$store.state.adUserId}).then(imgUrl => {
        if (imgUrl.data.code === 200) {
          this.canvasImg = baseUrl + imgUrl.data.data
          this.dialogTableVisible = true
        } else {
          this.Toast('图片生成失败请重新保存')
        }
      })
    },
    downloadIamge: function(imgsrc, name) {
      let image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function() {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
        let a = document.createElement("a"); // 生成一个a元素
        let event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "海报"; // 设置图片名称没有设置则为默认
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    },
    joinActive() {
      this.$router.push({path: 'LuckyDraw'});
    },

    initAdData() {
      Promise.all([this.getUserId()]).then((res) => {
        adList({answerId: res[0]}).then((data) => {
          if (data.data.code === 200) {
            this.dataObj = data.data.data
          }
        })
      })
    },
    getUserId() {
      return new Promise((resolve, reject) => {
        adSubmit(this.$store.state.adReqParams).then((res) => {
          if (res.data.code === 200) {
            resolve(res.data.data)
            this.$store.commit(types.AD_USER_ID, res.data.data)
          } else {
            reject(res.data)
          }
        }).catch(() => {
        })
      })
    }
  }
}
</script>

<style scoped>
  .result_btn {
    width: 1.87rem;
    height: .61rem;
    background-image: url("https://www.chbice.com/imgFile/ico/result/ad_ result_btn.png");
    background-repeat: no-repeat;
    background-size: 1.86rem .61rem;
    font-size: .3rem;
    text-align: center;
    line-height: .61rem;
    color: #F4DEBA;
  }
  .result_btn_wrap {
    position: absolute;
    bottom: -.3rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .addr_item_right {
    margin-bottom: .15rem;
  }
  .addr_item {
    justify-content: center;
  }
  .addr_item_addr {
    width: 3.39rem;
    line-height: .32rem;
  }
  .addr_item_shop {
    width: 1.29rem;
    margin-right: .14rem;
    line-height: .32rem;
  }
  .addr_item_company {
    width: 1.6rem;
    line-height: .32rem;
    margin-right: .15rem;
  }
  .addr_list {
    color: #F4DEBA;
    font-size: .2rem;
    height: 6.2rem;
    overflow: auto;
  }
  .bank_item1 {
    margin-right: .42rem;
  }
  .bank_item_img {
    width: 2.87rem;
    height: .55rem;

  }
  .bank_item {
    width: 2.87rem;
    height: .55rem;
    margin-bottom: .2rem;
  }
  .bank_list {
    flex-wrap: wrap;
    margin-left: .43rem;
  }
  .result_code .result_code_title1 {
    background: linear-gradient(27deg, #9F181F, #A81A24);
    /*background-color: #9F181F;#A81A24*/
  }
  .result_code_img {
    width: 3.23rem;
    height: 3.23rem;
    display: block;
    margin: .47rem auto 0;
    z-index: 1;
  }
  .code_img {
    width: 1.94rem;
    height: 1.95rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .result_code_title {
    font-size: .24rem;
    color: #F4DEBA;
    text-align: center;
    display: inline-block;
    padding: 0 .2rem;
    white-space: nowrap;
    line-height: 1;
    background-color: #B71F2C;
    position: absolute;
    top: -0.12rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .result_code_title2 {
    background: linear-gradient(27deg, #8B1017, #92131A);
  }
  .result_code {
    width: 7.02rem;
    height: 4.12rem;
    border-radius: .3rem;
    border: .02rem solid #E6AF97;
    margin: .5rem auto 0;
    position: relative;
  }
  .result_code1 {
    height: 4.39rem;
  }
  .result_code2 {
    width: 7.02rem;
    height: 6.2rem;
    border-radius: .3rem;
    border: .02rem solid #E6AF97;
    margin: .5rem auto .68rem;
    position: relative;
    padding: .5rem 0 .7rem;
  }
  .flex {
    display: flex;
  }
  .result_border {
    width: 7.52rem;
    height: .52rem;
    display: block;
    margin-left: -0.02rem;
  }
  .result_border1 {
    width: 3.61rem;
    height: .64rem;
    display: block;
    margin: .23rem auto 0;
  }
  .result_wrap {
    position: absolute;
    /*background-color: #DB2839;*/
    width: 7.5rem;
    top: 0;
    left: 0;
    height: 32.6rem;
    overflow: auto;
    background-color: #fff;
    background-image: url("https://www.chbice.com/imgFile/ico/ad_sesult/result_bg.png");
    background-repeat: no-repeat;
    background-size: 7.5rem 32.6rem;
  }
  .result_title_wrap {
    width: 7.5rem;
    height: .59rem;
    position: relative;
    display: flex;
    align-items: center;
  }
  .result_title_bor {
    width: 1.98rem;
    height: .05rem;
    border-top: .01rem solid #F4DEBA;
    border-bottom: .01rem solid #F4DEBA;
  }
  .result_title {
    width:3.04rem;
    height: .59rem;
    display: block;
    margin: 0 auto;
  }
  .result_img_wrap {
    position: relative;
  }
  .result_coin_name {
    width: 2.92rem;
    height: .61rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: .5rem;
    background-image: url("https://www.chbice.com/imgFile/ico/result_coin_name.png");
    background-size: 2.92rem .61rem;
    font-size: .33rem;
    color: #F4DEBA;
    text-align: center;
    line-height: .61rem;
  }
  .result_img_title {
    position: absolute;
    width: 4.08rem;
    height: .67rem;
    left: 50%;
    transform: translateX(-50%);
    top: -0.38rem;
  }
  .result_img {
    width: 6.03rem;
    height: 5.82rem;
    display: block;
    margin: 1.05rem auto 0;
  }
  .result_img_coin {
    position: absolute;
    top: 1.44rem;
    left: 51%;
    transform: translateX(-50%);
    width: 2.94rem;
    height: 2.94rem;
  }
  .result_img_coin1 {
    width: 2.94rem;
    height: 1.92rem;
    top: 1.9rem;
  }
  .save_img {
    position: fixed;
    top: 0;
    width: 7.5rem;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0, .6);
  }
  .save_img .icon-close {
    color: #fff;
    font-size: .3rem;
    top: 8%;
    display: flex;
    justify-content: flex-end;
    padding: .5rem .3rem;
  }
  .save_img_content {
    position: absolute;
    top: 8%;
    width: 6rem;
    height: 10rem;
    left: 50%;
    transform: translateX(-50%);
    overflow: auto;
  }
  .save_btn {
    height: .6rem;
    color: #fff;
    text-align: center;
    line-height: .6rem;
    position: absolute;
    bottom: 1rem;
    left: 50%;
    font-size: .3rem;
    transform: translateX(-50%);
    border-radius: .1rem;
    white-space: nowrap;
  }
  .icon-huabanfuben {
    font-size: .5rem;
    color: #fff;
  }
  .save_img_content img {
    width: 6rem;
  }
  .result_remind {
    font-size: .30rem;
    color: #E6AF97;
    margin: .2rem 0 0 -1rem;
    transform: scale(.7);
  }
</style>
