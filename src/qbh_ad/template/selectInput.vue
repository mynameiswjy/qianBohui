<template>
    <div class="select_input_wrap anim_ad">
      <div style="height: 3.17rem;"></div>
      <img class="one" src="https://www.chbice.com/imgFile/ico/select/ad_date_birth.png" alt="">
      <div class="select_input" @click="selectDateTime">{{pickerValue?pickerValue:'出生年月'}}</div>
      <mt-datetime-picker
        ref="picker"
        type="date"
        :start-date="startDate"
        :end-date="endDate"
        v-model="dateValue"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm"
      >
      </mt-datetime-picker>
      <img class="one two" src="https://www.chbice.com/imgFile/ico/select/ad_addr.png" alt="">
      <div class="select_input" @click="selectAddr">{{userSelectAddrInfo ? userSelectAddrInfo : '选择你的所在地'}}</div>
      <div class="next_question" @click="nextQuestion">下一题</div>
      <addrTemp v-if="IsOpenSelectAddr" @close-addr-temp="closeAddrTemp" @address-info="addressInfo"></addrTemp>
    </div>
</template>

<script>
import addrTemp from './addrTemp.vue'
export default {
  name: "selectInput",
  data() {
    return {
      pickerVisible: false,
      IsOpenSelectAddr: false,
      startDate: new Date('1920-01-01'),
      endDate: new Date('2020-12-12'),
      pickerValue: '',
      userSelectAddrInfo: '',
      addr1: '',
      addr2: '',
      addr3: '',
      dateValue: '1985-01-01'
    }
  },
  methods: {
    nextQuestion() {
      if (!this.pickerValue) {
        this.Toast('请选择出生日期');
        return false
      }
      if (!this.userSelectAddrInfo) {
        this.Toast('请选择地址');
        return false
      }
      this.$emit('select-input', {
        birthday: this.pickerValue,
        province: this.addr1,
        city: this.addr2,
        District: this.addr3,
        isShow: 2
      })
    },
    selectDateTime() {
      this.$refs.picker.open();
    },
    handleConfirm(e) {
      this.pickerValue = ''
      const date = new Date(e)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      this.pickerValue = year + '-' + month + '-' + day
    },
    selectAddr() {
      this.IsOpenSelectAddr = true
    },
    addressInfo(e) {
      this.userSelectAddrInfo = e.addr
      this.addr1 = e.addr1
      this.addr2 = e.addr2
      this.addr3 = e.addr3
      this.IsOpenSelectAddr = false
    },
    closeAddrTemp() {
      this.IsOpenSelectAddr = false
    }
  },
  components: {
    addrTemp
  }
}
</script>

<style scoped>
  .flex {
    display: flex;
  }
  .select_input_wrap img {
    display: block;
  }
  .select_input_wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 7.5rem;
  }

  .select_input_wrap .one {
    width: 4.28rem;
    height: .62rem;
    margin: 0 auto;
  }

  .select_input_wrap .two {
    margin-top: .94rem;
  }

  .select_input {
    width: 4.03rem;
    height: .73rem;
    background-image: url("https://www.chbice.com/imgFile/ico/select/ad_input.png");
    background-size: 4.03rem .73rem;
    background-repeat: no-repeat;
    margin: .31rem auto 0;
    font-size: .26rem;
    line-height: .73rem;
    padding-left: .25rem;
    color: #F4DEBA;
    overflow: auto;
  }

  .next_question {
    background-image: url("https://www.chbice.com/imgFile/ico/select/ad_border_2.png");
    width: 2.18rem;
    height: .67rem;
    background-size: 2.15rem .66rem;
    background-position: center;
    background-repeat: no-repeat;
    margin: 2.76rem auto;
    text-align: center;
    line-height: .67rem;
    font-size: .36rem;
    color: #F4DEBA;
  }
  .common_addr_wrap p {
    font-size: .3rem;
    color: #333;
    font-weight: 600;
    padding-left: .2rem;
    line-height: 1;
    border-left: .06rem solid #BFA267;
    margin: .1rem .3rem .3rem;
  }

</style>
