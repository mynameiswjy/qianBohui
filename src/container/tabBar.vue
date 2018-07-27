<template>
  <div>
    <ul class="wrap">
      <li class="booth" @click="cilckTabBarOne">
        <img class="tab-icon" src="../assets/images/booth-reservation.png">
        <div>展位预订</div>
      </li>
      <li alt="" @click="cilckTabBarTwo">
        <img class="tab-icon" src="../assets/images/visit-registration.png" alt="">
        <div>参观登记</div>
      </li>
      <li class="consulting" alt="" @click="cilckTabBarThree">
        <img class="tab-img" src="../assets/images/consulting.png" alt="">
        <div>在线咨询</div>
      </li>
    </ul>
    <visit v-if="one"></visit>
  </div>
</template>

<script>
/*!function(d, w) {
  var c = d.documentElement;
  debugger
  w = function() {
    var a = c.clientWidth; // 375
    a && (c.style.fontSize = a/375 * 100 + "px")
  };
  window.addEventListener("orientationchange" in window ? "orientationchange" : "resize", w, !1);
  d.addEventListener("DOMContentLoaded", w, !1)
}(document, window);*/
console.log('window.devicePixelRatio=======>', window.devicePixelRatio)
console.log(document.documentElement.clientWidth)
console.log(document.documentElement.clientHeight)
import visit from "@/components/mask/visit.vue"
export default {
  name: "tabBar",
  data() {
    return {
      one: false
    }
  },
  methods: {
    /*cilckTabBar(e) {
      let target = e.target.dataset
      let index = target.index
      console.log(e.target.getAttribute("data-index"))
    },*/
    cilckTabBarOne() {
      this.one = !this.one
    },
    cilckTabBarTwo() {
    },
    cilckTabBarThree() {}
  },
  components: {
    visit
  }
}
</script>

<style scoped>
  .wrap{
    width: 7.5rem;
    height: 0.98rem;
    font-size: 0.22rem;
    display: flex;
    /*flex-wrap: wrap;*/
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
  .tab-icon{
    width: 0.34rem;
    height: 0.34rem;
    padding-top: 0.16rem;
    padding-bottom: 0.10rem;
  }
</style>
