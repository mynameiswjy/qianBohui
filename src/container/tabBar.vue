<template>
  <div class="wrap">
    <div class="booth">
      <img class="tab-icon" src="../assets/images/booth-reservation.png" alt="">
      <div>展位预订</div>
    </div>
    <div>
      <img class="tab-icon" src="../assets/images/visit-registration.png" alt="">
      <div>参观登记</div>
    </div>
    <div class="consulting">
      <img class="tab-img" src="../assets/images/consulting.png" alt="">
      <div>在线咨询</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabBar",
  data() {
    return {
    }
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
