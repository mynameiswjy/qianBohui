<template>
  <div style="position: fixed; top: 0; bottom: 0; width: 100%; background: #ffffff; z-index: 9;">
    <div>{{msg}}</div>
    <div>我是circleId:{{$route.params.circleId}}</div>
    <div>父组件对象{{this.arr}}</div>
    <button @click="reverseMsg">点我</button>
    <button @click="goBack">返回</button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    arr: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      msg: 'Hello Word'
    }
  },
  mounted() {

  },
  methods: {
    reverseMsg(e) {
      console.log(e);
      this.msg = this.msg.split('').reverse().join('')
    },
    goBack() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>

</style>
