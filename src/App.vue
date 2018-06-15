<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/test1/8">路由</router-link>
    <div>
      我是路由组件
      <router-view :arr="arr"/>
    </div>
  </div>
</template>

<script>
import test1 from './components/Test2'

export default {
  data() {
    return {
      arr: {
        name: '1',
        age: 8
      }
    }
  },
  name: 'App',
  components: {
    test1
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
