<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!--<test1></test1>-->
    <router-view/>
  </div>
</template>

<script>
// import test1 from './components/Test2'
export default {
  name: 'App',
  // components: {
  //   test1
  // }
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
