<template>
    <div class="nav_temp_wrap flex">
      <div class="iconfont icon-fanhui" @click="backBtn"></div>
      <div class="iconfont icon-shouye" @click="goIndexBtn"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import '@/assets/mask.css'
export default {
  name: 'consulting',
  data() {
    return {
      three: false,
    }
  },
  methods: {
    backBtn() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    goIndexBtn() {
      this.$router.push({path: 'homePage'});
    }
  }
}

</script>

<style scoped lang="stylus">
  .flex
    display flex
    align-items center
    justify-content space-between
  .nav_temp_wrap
    width 7rem
    padding 0 .25rem
    height .8rem
    background-color #e6e6e6
    .icon-fanhui
      font-size .32rem
      font-weight bold
      color #333
    .icon-shouye
      font-size .32rem
      font-weight bold
      color #333
</style>
