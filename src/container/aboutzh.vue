<template>
    <div>
      关于展会
      <tabBar class="menu-tab"></tabBar>
    </div>
</template>

<script>
import tabBar from '@/container/tabBar' // 底部tabBar
export default {
  name: "aboutzh",
  created() {
    document.title = '关于展会';
  },
  components: {
    tabBar
  }
}
</script>

<style scoped>

</style>
