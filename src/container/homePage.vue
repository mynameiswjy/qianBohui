<template>
  <div>
    <introduce></introduce>
    <div>首页</div>
  </div>
</template>

<script>
import introduce from '@/components/introduce'
export default {
  name: "index",
  data() {
    return {
      obj: 0,
    }
  },
  components: {
    introduce
  }
}
</script>

<style scoped>

</style>
