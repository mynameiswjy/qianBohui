<template>
  <div id="app">
    <img class="title-img" src="https://weixin.566.com/BizImage/CircleBgImage/201806/15/d58a_47de4ee4_47de4ee4.jpg">
    <ul class="tab" @click="tabChange">
      <li class="tab-li" :class="{active:tab.id == idx}" v-for="tab in tabs" v-bind:key="tab.id" :data-index="tab.id">{{tab.name}}</li>
    </ul>
    <div class="border-line"></div>
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
  created() {
    document.title = '首页';
  },
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif,PingFangSC-Regular;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .title-img{
    width: 100%;
    height: 171px;
  }
  .border-line{
    width:375px;
    height:1px;
    background:rgba(238,236,233,1);
    margin-bottom: 30px;
  }
  .tab{
    display: flex;
    height: 39px;
    line-height: 39px;
    text-align: center;
    font-size: 15px;
    font-family: PingFangSC-Regular;
    color: rgba(51,51,51,1);
  }
  .tab-li{
    flex: 1;
    position: relative;
  }
  .active{
    color: #C8A258;
  }
  .active:after {
    content: '';
    position: absolute;
    left: 25px;
    top: auto;
    bottom: 0;
    right: auto;
    height: 3px;
    width: 25px;
    border-radius:5px;
    background-color: #C8A258;
  }
</style>
