<template>
  <div id="app">
    <img class="title-img" src="https://weixin.566.com/BizImage/CircleBgImage/201806/15/d58a_47de4ee4_47de4ee4.jpg">
    <ul class="tab" @click="tabChange">
      <li class="tab-li" :class="{active:tab.id == idx}" v-for="tab in tabs" v-bind:key="tab.id" :data-index="tab.id">{{tab.name}}</li>
    </ul>
    <introduce></introduce>
    <router-view/>
  </div>
</template>

<script>
import '@/assets/reset.css'
import introduce from '@/components/introduce'
export default {
  data() {
    return {
      tabs: [
        {name: '首页', id: '0'},
        {name: '关于展会', id: '1'},
        {name: '展商专区', id: '2'},
        {name: '观众专区', id: '3'},
        {name: '新闻资讯', id: '4'},
      ],
      idx: 0
    }
  },
  name: 'App',
  methods: {
    tabChange(e) {
      let target = e.target.dataset
      let index = target.index
      this.idx = index
    }
  },
  components: {
    introduce
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .title-img{
    width: 100%;
    height: 200px;
  }
  .tab{
    display: flex;
  }
  .tab-li{
    flex: 1;
  }
  .active{
    color: red;
  }
</style>
