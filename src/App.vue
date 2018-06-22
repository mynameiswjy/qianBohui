<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view :arr="arr"/>
  </div>
</template>

<script>

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
