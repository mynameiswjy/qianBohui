<template>
  <div id="app">
    <nav-tab></nav-tab>
    <router-view/>
  </div>
</template>

<script>
import '@/assets/reset.css'
import navTab from '@/container/navTab'

export default {
  data() {
    return {
    }
  },
  name: 'App',
  created() {
    document.title = '首页';
  },
  methods: {
  },
  components: {
    navTab
  }
}
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: "Helvetica Neue For Number", "PingFang SC Light", "Heiti SC", "San Francisco", "Helvetica", Arial, sans-serif;
    color: #2c3e50;
  }
</style>
