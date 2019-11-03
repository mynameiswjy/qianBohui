<template>
    <div class="mask" ref="wrapper" style="z-index: 999;">
      <scroll :data="userVisitList.selectItem" style="height: 100%">
        <div class="wraps" :class="{p_bottom: p_bottom}" ref="content">
          <div class="res-title">
            <h2>{{userVisitList.name}}</h2>
            <img @click="closeTemp" src="../../assets/images/close.png" alt="">
          </div>
          <ul>
            <li v-for="(item, index) in userVisitList.selectItem" :key="index">
              <div v-if="(item.isType == 'I')" class="list">
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
                    <option v-for="(opt, idx) in JSON.parse(item.exe1)" :key="idx" :value="opt.code">{{opt.name}}</option>
                  </select>
                  <div v-show="!item[item.code]" class="select-default">请选择</div>
                </div>
              </div>
              <div  v-if="(item.isType == 'A')">
                <div class="note">{{item.name}}</div>
                <textarea name="" v-model="item[item.code]" class="textarea" id="" cols="30" rows="10"></textarea>
              </div>
            </li>
          </ul>
          <div class="foot-select">
            <select v-model="personNum" class="select-bottom left-margin">
              <option value ="1">1人</option>
              <option value ="2">2人</option>
              <option value ="3">3人</option>
              <option value ="4">4人</option>
              <option value ="5">5人</option>
              <option value ="6">6人</option>
              <option value ="7">7人</option>
              <option value ="8">8人</option>
            </select>
            <div @click="sendDataVisit">确定</div>
          </div>
        </div>
      </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
import '@/assets/mask.css'
import Scroll from '@/utils/scroll'
import { isBottom } from '@/utils/utils'
import { getRegisterTypeInfo, putRegisterInfo } from '@/api/index'

//var md5 = require('js-md5')

export default {
  name: 'visit',
  data() {
    return {
      tow: false,
      p_bottom: false,
      userVisitList: {},
      visitSendList: [],
      personNum: 1
    }
  },
  created() {
    this.initUserSelect()
  },
  methods: {
    sendDataVisit() {
      let initData = {
        registrationName: ' ',
        audienceType: ' ',
        boothType: ' ', //select选择框
        companyName: ' ', // 公司名称
        boothArea: ' ',
        companyUrl: ' ',
        phoneNum: ' ', // 手机号码
        emailAddress: ' ', // 邮箱地址
        qqCode: ' ', // qq号码
        wxCode: " ",
        relationAddress: ' ',
        remark: ' '
      }
      let selectItem = this.userVisitList.selectItem
      let visitSendList = {}
      for (var i = 0; i < selectItem.length; i++) {
        let data = selectItem[i]
        let key = data.code
        let value = data[key]
        visitSendList[key] = value
        let isRequired = data.isRequired
        // qq号码验证
        if (key === 'qqCode' && value) {
          if (!/^[1-9][0-9]{4,14}$/.test(value)) {
            this.$message.error('请输入正确的QQ号！');
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
        // 邮箱验证
        if (key === 'emailAddress' && value) {
          let regEmail = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$")
          if (!regEmail.test(value)) {
            this.$message.error('请输入正确的邮箱！');
            return false
          }
        }
        if (isRequired === 'Y' && !value) {
          this.$message.error('带*为必填项，请填写完整');
          return false
        }
      }
      for (let i in visitSendList) {
        visitSendList[i] = visitSendList[i] ? visitSendList[i] : ' ' // md5(visitSendList[i])
      }
      let data = Object.assign({}, initData, visitSendList, {
        type: 'VISITOR_REGISTER',
        personNum: this.personNum
      })
      console.log(data);
      putRegisterInfo(data).then(res => {
        if (res.data.returnCode === '0000') {
          this.$emit("closeVisit", this.tow)
          this.$message.success(res.data.returnMessage)
        } else {
          this.$message.error(res.data.returnMessage);
        }
      })
    },
    closeTemp() {
      this.$emit("closeVisit", this.tow)
    },
    initUserSelect() {
      getRegisterTypeInfo({registerType: 'VISITOR_REGISTER'}).then(res => {
        console.log(res);
        if (res.data.returnCode === '0000') {
          this.userVisitList = res.data.returnData
        }
      })
    }
  },
  mounted() {
    let wrapper = this.$refs.wrapper.clientHeight
    let content = this.$refs.content.clientHeight
    this.p_bottom = isBottom(wrapper, content)
  },
  computed: {
  },
  watch: {
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="stylus">
  .waring
    border-color red
  .mask
    /*padding-top 0.82rem*/
    .wraps
      overflow hidden
  .note {
    font-size: 0.3rem;
    line-height: 0.87rem;
    margin: 0 0.26rem;
    color: #000;
    /*font-weight: 600;*/
    font-family: PingFangSC-Regular;
    padding-top: 0.14rem;
  }
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
  .select-default
    position absolute
    top: 0.02rem
    left: 0.3rem
    font-size 24rpx
    color #b7b7b7

  .textarea {
    margin-left: 0.36rem;
    margin-top: 0.1rem;
    margin-bottom 0.42rem;
    width: 6.18rem;
    height: 0.92rem;
    border-radius: 0.08rem;
    padding: 0.2rem 0.3rem;
    border: 0.01rem solid #eee;
    border: 0.01rem solid #d3d5d6;
    color: #b7b7b7;
  }

  .foot-select
    border-top: 0.01rem solid rgba(238,240,242,1)
    padding-top 0.38rem
    padding-bottom 0.39rem
    display flex
    .select-bottom
      position relative
      width: 3.02rem;
      height: 0.72rem;
      appearance:none;
      -moz-appearance:none;
      -webkit-appearance:none;
      background-color: #fff;
      background: url("../../assets/images/zh-drop-down.png") no-repeat scroll 92% center transparent;
      background-size: 0.22rem 0.12rem;
      padding-right: 0.2rem;
      border: 0.01rem solid #eed582;
      color: #eed582
      padding-left 1rem
    div
      width:3.2rem;
      height:0.72rem;
      background: #eed582;
      border-radius: 0.12rem;
      font-size 0.28rem
      color: #000
      text-align center
      line-height 0.72rem
      margin-left 0.74rem
    .select-bottom:after
      content: '';
      position: absolute;
      left: 18px;
      top: auto;
      bottom: 0;
      right: auto;
      height: 300px;
      width: 2px;
      border-radius:5px;
      background-color: #bfa;
</style>
