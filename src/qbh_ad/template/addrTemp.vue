<template>
  <div class="addr_wrap">
    <div class="addr_content">
      <div class="addr_top flex">
        <div class="iconfont icon-fanhui" @click="goBack()" v-if="!IsProvince"></div>
        <div v-if="IsProvince"></div>
        <div class="iconfont icon-close" @click="closeAddrTemp()"></div>
      </div>
      <div class="common_addr_wrap" v-if="IsProvince">
        <p>选择省份</p>
        <ul class="common_addr flex">
          <li v-for="(item, index) in province['0']" :key="index" :class="{'active': index === provinceIdx}" @click="userSelectAddr(index)">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="common_addr_wrap anim_ad" v-if="IsCity">
        <p>选择城市</p>
        <ul class="common_addr flex">
          <li v-for="(item, index) in city" :key="index" :class="{'active': index === cityIdx}" @click="userSelectCity(index)">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="common_addr_wrap anim_ad" v-if="IsDistrict">
        <p>选择县区</p>
        <ul class="common_addr flex">
          <li v-for="(item, index) in district" :key="index" :class="{'active': index === districtIdx}" @click="userSelectDistrict(index)">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import city from '../city.json'
export default {
  name: "addrTemp",
  data() {
    return {
      IsProvince: true,
      IsCity: false,
      IsDistrict: false,
      province: city,
      city: null,
      district: null,
      provinceIdx: -1,
      cityIdx: -1,
      districtIdx: -1,
      coeIdx: '',
      addr1: '',
      addr2: '',
      addr3: ''
    }
  },
  methods: {
    userSelectDistrict(e) {
      this.districtIdx = e
      this.addr3 = this.district[e]
      this.$emit('address-info', {
        addr: this.addr1 + '-' + this.addr2 + '-' + this.addr3,
        addr1: this.addr1,
        addr2: this.addr2,
        addr3: this.addr3,
      })
    },
    userSelectCity(e) {
      this.cityIdx = e
      const idx = this.coeIdx + ',' + e
      this.IsCity = false
      this.district = this.province[idx]
      // this.IsDistrict = true
      this.addr2 = this.city[e]
      this.$emit('address-info', {
        addr: this.addr1 + '-' + this.addr2,
        addr1: this.addr1,
        addr2: this.addr2,
        addr3: ''
      })
    },

    userSelectAddr(e) {
      this.provinceIdx = e
      const idx = 0 + ',' + e
      this.coeIdx = idx
      this.IsProvince = false
      this.city = this.province[idx]
      this.IsCity = true
      this.addr1 = this.province['0'][e]
    },
    goBack(e) {
      if (this.IsCity) {
        this.IsCity = false
        this.IsProvince = true
      } else if (this.IsDistrict) {
        this.IsDistrict = false
        this.IsCity = true
      }
    },
    closeAddrTemp() {
      this.IsDistrict = false
      this.IsProvince = true
      this.$emit('close-addr-temp')
    }
  }
}
</script>

<style scoped>

  .addr_wrap {
    position: fixed;
    top: 0;
    width: 7.5rem;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0, .6);
  }
  .addr_content {
    position: absolute;
    bottom: 0;
    background-color: #fff;
    width: 7.5rem;
    min-height: 6rem;
  }
  .addr_top {
    justify-content: space-between;
    padding: .2rem .3rem;
    background-color: #ccc;
  }
  .icon-fanhui {
    font-size: .25rem;
    color: #333;
  }
  .icon-close {
    font-size: .25rem;
    color: #333;
  }
  .flex {
    display: flex;
  }
  .common_addr_wrap {

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
  .common_addr {
    width: 6.9rem;
    margin: 0 auto;
    flex-wrap: wrap;
  }
  .common_addr li {
    font-size: .26rem;
    color: #333;
    padding: .15rem .3rem;
    /*background-color: #baf;*/
    margin-right: .1rem;
    margin-bottom: .1rem;
  }
  .active {
    background-color: #BFA267;
    color: #fff!important;
  }

</style>
