<template>
  <div>
    <!--<ul class="wraps">
      <li class="booth" @click="cilckTabBarOne">
        <img class="tab-icon" src="../assets/images/booth-reservation.png">
        <div>展位预订</div>
      </li>
      &lt;!&ndash;<li alt="" @click="cilckTabBarTwo">&ndash;&gt;
        &lt;!&ndash;<img class="tab-icon" src="../assets/images/visit-registration.png" alt="">&ndash;&gt;
        &lt;!&ndash;<div>参观登记</div>&ndash;&gt;
      &lt;!&ndash;</li>&ndash;&gt;
      <li class="consulting" alt="" @click="cilckTabBarThree">
        <img class="tab-img" src="../assets/images/consulting.png" alt="">
        <div>在线咨询</div>
      </li>
    </ul>-->
    <ul class="tab_wrap">
      <li class="tab_item" @click="cilckTabBarOne">
        <img class="tab-icon" src="https://www.chbice.com/imgFile/cut/reservation.png">
        <div>展位预订</div>
      </li>
      <!--<li alt="" @click="cilckTabBarTwo">-->
      <!--<img class="tab-icon" src="https://www.chqbh.com/imgFile/cut/visit.png" alt="">-->
      <!--<div>参观登记</div>-->
      <!--</li>-->
      <li class="" :class="{'cous_active': IsClass}" alt="" @click="cilckTabBarThree">
        <img class="tab-icon" src="https://www.chbice.com/imgFile/cut/online_consult.png" alt="">
        <div>在线咨询</div>
      </li>
    </ul>
    <!--<visit @closeVisit="visitClose" v-if="tow"></visit>-->
    <reservation @closeTemp="tempClose" v-if="isReservationPage"></reservation>
    <consulting @closeZixun="tempZixun" v-if="three"></consulting>
  </div>
</template>

<script>
//import visit from "@/components/mask/visit.vue"
import reservation from "@/components/mask/reservation.vue"
import consulting from "@/components/mask/consulting.vue"
import * as types from '../store/mutation-types'
export default {
  name: "tabBar",
  data() {
    return {
      isReservationPage: this.$store.state.isReservationPage,
      tow: false,
      three: false,
      IsClass: false
    }
  },
  created() {
    console.log(this.isReservationPage);
  },
  methods: {
    tempZixun(e) {
      this.three = e
      this.IsClass = e
    },
    cilckTabBarOne(e) {
      this.isReservationPage = !this.isReservationPage
      this.$store.commit(types.IS_RESERVSTION_PAGE, this.isReservationPage)
    },
    // 通过子组件传过来的值 动态的改变 变量==> one
    tempClose(e) {
      this.isReservationPage = e
      this.$store.commit(types.IS_RESERVSTION_PAGE, e)
    },
    visitClose(e) {
      this.tow = e
    },
    cilckTabBarTwo() {
      this.tow = !this.tow
    },
    cilckTabBarThree() {
      this.IsClass = true
      this.three = !this.three
    }
  },
  components: {
    // visit,
    reservation,
    consulting
  }
}
</script>

<style scoped>
  .tab_wrap {
    width: 100%;
    height: 1rem;
    display: flex;
    background-color: #fff;
  }
  .cous_active {
    background-color: #f4ba43;
  }
  .tab_wrap li {
    width: 3.75rem;
    text-align: center;
    box-sizing: border-box;
    font-size: 0.3rem;
    color: #353535;
  }
  .tab_item {
    border-right: 0.01rem solid #ccc;
  }
  .tab-icon{
    width: 0.34rem;
    height: 0.34rem;
    padding-top: 0.16rem;
    padding-bottom: 0.07rem;
  }
  .wraps{
    width: 7.5rem;
    height: 0.98rem;
    font-size: 0.22rem;
    display: flex;
    color: #8A8A8A;
    justify-content: space-between;
    text-align: center;
  }
  .booth{
    margin-left: 1.07rem;
  }
  .consulting{
    margin-right: 1.07rem;
  }
  .consulting .tab-img{
    width: 0.4rem;
    height: 0.38rem;
    padding-top: 0.14rem;
    padding-bottom: 0.08rem;
  }
</style>
