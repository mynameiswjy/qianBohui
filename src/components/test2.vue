<template>
  <div>
    <div>{{msg}}</div>
    <button @click="reverseMsg">点我</button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      msg: 'Hello Word'
    }
  },
  methods: {
    reverseMsg(e) {
      console.log(e);
      this.msg = this.msg.split('').reverse().join('')
    }
  }
}
</script>

<style scoped>

</style>
