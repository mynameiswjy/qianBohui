<template>
    <div class="prize_wrap">
      <div class="prize_content">
        <h3>请准确填写信息以便领取奖品</h3>
        <input class="prize_input" @input="getUserName" type="text" placeholder="姓名"/>
        <input class="prize_input" type="number" @input="getUserPhone" placeholder="手机号码"/>
        <p class="prize_input" @click="getUserAddr">{{userAddr ? userAddr : '所在地区'}}</p>
        <input class="prize_input" type="text" @input="getUserAddrDetail" placeholder="详细地址"/>
        <div class="prize_rule" @click="agreeBtn">
          <span class="iconfont" :class="IsAgree ? 'icon-querenanniu' : 'icon-xuanze'"></span>
          <span>我已全部了解本次活动内容及规则。</span>
        </div>

        <div class="prize_common_btn get_prize_btn" @click="confirmBtn">确认并提交</div>
      </div>
      <addrTemp v-if="IsOpenSelectAddr" @close-addr-temp="closeAddrTemp" @address-info="addressInfo"></addrTemp>
      <div class="part_prize" v-if="successSubmit">
        <div class="Involved_content">
          <h3>{{hasPrize ? '已参与过抽奖' : '提交成功'}}</h3>
          <p>活动结束后会有工作人员与您取得联系， 请注意保持手机畅通。</p>
          <div class="part_prize_btn prize_common_btn" @click="closeMask">{{hasPrize ? '我的奖品' : '确定'}}</div>
        </div>
      </div>
      <div class="part_prize" v-if="checkPrize">
        <div class="part_prize_content">
          <p class="part_prize_title">您已获得</p>
          <div class="part_prize_center">
<!--            <img class="part_prize1" src="https://www.chbice.com/imgFile/ico/prize/1-1.png" alt="">-->
            <img class="part_prize2" src="https://www.chbice.com/imgFile/ico/prize/5.png" alt="">
          </div>
          <div class="part_prize_bott">
            <span class="iconfont icon-ic_gonggao"></span>
            <span class="">获得《中国金币文化》一本</span>
          </div>
          <div class="part_prize_btn prize_common_btn" @click="getPrizeBtn">确定</div>
        </div>
      </div>
    </div>
</template>

<script>
import {isPoneAvailable} from '../utils/utils'
import addrTemp from './template/addrTemp.vue'
import {winnerSubmit} from '../api/index'
export default {
  name: "getPrize",
  data() {
    return {
      userName: '',
      userPhone: '',
      userAddr: '',
      userAddrDetail: '',
      IsOpenSelectAddr: false,
      addr1: '',
      addr2: '',
      addr3: '',
      successSubmit: false,
      hasPrize: false,
      checkPrize: false,
      IsAgree: false
    }
  },
  activated() {
    document.title = '解锁牛年上上签';
  },
  methods: {
    agreeBtn() {
      this.IsAgree = !this.IsAgree
    },
    getUserName(e) {
      this.userName = e.target.value
    },
    getUserPhone(e) {
      this.userPhone = e.target.value
    },
    getUserAddrDetail(e) {
      this.userAddrDetail = e.target.value
    },
    getUserAddr() {
      this.IsOpenSelectAddr = true
    },
    confirmBtn() {
      let reg = /^[\u2E80-\u9FFF]+$/
      if (!this.userName || !reg.test(this.userName)) {
        this.Toast('您输入的姓名不合法')
        return false
      }
      const phone = isPoneAvailable(this, this.userPhone)
      if (!this.userPhone || !phone) {
        return false
      }
      if (!this.userAddr) {
        this.Toast('请选择地址')
        return false
      }
      const regAddr = /^(?=.*?[\u4E00-\u9FA5])[a-zA-Z0-9\-\_\u4E00-\u9FA5]{5,100}/
      if (!this.userAddrDetail || !regAddr.test(this.userAddrDetail)) {
        this.Toast('请输入详细地址')
        return false
      }
      if (!this.IsAgree) {
        this.Toast('请先确认协议')
        return false
      }

      winnerSubmit({
        "answerId": this.$store.state.adUserId,
        "name": this.userName,
        "phone": this.userPhone,
        "province": this.addr1,
        "city": this.addr2,
        "district": this.addr3,
        "address": this.userAddrDetail,
        "prize": "1"
      }).then((res) => {
        if (res.data.code === 200) {
          this.successSubmit = true
        } else if (res.data.code === 400) {
          this.successSubmit = true
          this.hasPrize = true
        }
      })
    },
    closeAddrTemp() {
      this.IsOpenSelectAddr = false
    },
    addressInfo(e) {
      this.userAddr = e.addr
      this.addr1 = e.addr1
      this.addr2 = e.addr2
      this.addr3 = e.addr3
      this.IsOpenSelectAddr = false
    },
    closeMask() {
      this.successSubmit = false
      if (this.hasPrize) {
        this.checkPrize = true
      } else {
        this.successSubmit = false
        this.$router.push({path: 'qbh_ad'});
      }
    },
    getPrizeBtn() {
      this.successSubmit = false
      this.$router.push({path: 'qbh_ad'});
    }
  },
  components: {
    addrTemp
  }
}
</script>

<style scoped>
  .prize_wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 7.5rem;
    background-color: #fff;
    background-image: url("https://www.chbice.com/imgFile/ico/lo/getPrizeBg.png");
    background-size: 7.5rem;
    background-repeat: no-repeat;
  }
  .prize_content {
    width: 5.2rem;
    height: 7.7rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 1.9rem;
  }
  .prize_content h3 {
    font-size: .26rem;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #F4DEBA;
    line-height: 1;
    text-shadow: 0 .06rem .02rem rgba(79, 4, 10, 0.53);
    padding-top: 1.5rem;
    margin-bottom: .42rem;
    text-align: center;
  }
  .prize_input {
    background-image: url("https://www.chbice.com/imgFile/ico/lo/prize_input.png");
    width: 3rem;
    height: .52rem;
    padding-left: .2rem;
    background-size: 3.2rem .52rem;
    font-size: .24rem;
    color: #F4DEBA;
    white-space: nowrap;
    display: block;
    margin: 0 auto .2rem;
    line-height: .52rem;
  }
  .prize_rule {
    font-size: .16rem;
    color: #F4DEBA;
    text-align: center;
  }
  .icon-querenanniu, .icon-xuanze {
    font-size: .2rem;
  }
  .get_prize_btn {
    position: absolute;
    bottom: .3rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .prize_common_btn {
    width: 1.87rem;
    height: .61rem;
    background-image: url("https://www.chbice.com/imgFile/ico/lo/prize_btn.png");
    background-size: 1.85rem .58rem;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #C33739;
    font-size: .3rem;
    color: #F4DEBA;
    text-align: center;
    line-height: .61rem;
  }

  .part_prize {
    width: 7.5rem;
    position: fixed;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.6);
  }

  .part_prize_content {
    width: 5.15rem;
    height: 4.14rem;
    background-color: #C33739;
    box-shadow: 0 .11rem .08rem .01rem rgba(3, 0, 0, 0.28);
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .part_prize_title {
    font-size: .4rem;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #F4DEBA;
    line-height: 1;
    text-shadow: 0 .06rem .02rem rgba(79, 4, 10, 0.53);
    padding-top: .46rem;
    margin-bottom: .26rem;
    text-align: center;
  }
  .part_prize_center {
    width: 2.96rem;
    height: 2.36rem;
    background-color: #A40812;
    margin: 0 auto;
    display: flex;
    align-items: center;
  }
  .part_prize_center img {
    width: 2.96rem;
    height: 2.36rem;
  }
  .part_prize_center .part_prize1 {
    width: 1.1rem;
    height: 1.1rem;
  }
  .part_prize_center .part_prize2 {
    width: 2.36rem;
    height: 2.36rem;
    margin: 0 auto;
  }
  .Involved_content {
    width: 5.15rem;
    height: 2.52rem;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #C33739;
  }
  .part_prize_bott {
    font-size: .15rem;
    color: #F4DEBA;
    margin: .1rem auto;
    display: flex;
    justify-content: center;
    width: 3rem;
  }
  .part_prize_bott .icon-ic_gonggao {
    font-size: .18rem;
    color: #F4DEBA;
  }
  .Involved_content h3 {
    font-size: .4rem;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #F4DEBA;
    line-height: 1;
    text-shadow: 0 .06rem .02rem rgba(79, 4, 10, 0.53);
    margin-bottom: .4rem;
    text-align: center;
    padding-top: .5rem;
  }
  .Involved_content p {
    font-size: .26rem;
    color: #F4DEBA;
    line-height: .36rem;
    max-width: 4.32rem;
    margin: 0 auto;
  }
  .part_prize_btn {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: -1.33rem;
  }

  ::-webkit-input-placeholder { color:#F4DEBA; }
  ::-moz-placeholder { color:#F4DEBA; } /* firefox 19+ */
  :-ms-input-placeholder { color:#F4DEBA; } /* ie */
  input:-moz-placeholder { color:#F4DEBA; }
</style>
