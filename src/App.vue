<template>
  <div id="app">
    <nav-bar :isShowNavImg="isShowNavImg"></nav-bar>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import navBar from '@/container/navBar'
export default {
  data() {
    return {
    }
  },
  name: 'App',
  created() {
  },
  methods: {
  },
  computed: {
    isShowNavImg() {
      return this.$route.name == 'homePage'
    }
  },
  components: {
    navBar
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
  .menu-tab{
    position: fixed;
    bottom: 0;
    background-color: #fff;
  }
</style>
