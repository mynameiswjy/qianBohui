<template>
    <div>
      <!--<img :hidden="this.idx != 0" class="title-img" src="https://weixin.566.com/BizImage/CircleBgImage/201806/15/d58a_47de4ee4_47de4ee4.jpg">-->
      <img class="title-img" src="https://weixin.566.com/BizImage/CircleBgImage/201806/15/d58a_47de4ee4_47de4ee4.jpg">
      <ul class="tab">
        <li class="tab-li" @click="tabChange(tab.id)" v-for="tab in tabs" v-bind:key="tab.id">
          <router-link :class="{active:tab.id == idx}" :to="tab.path">{{tab.name}}</router-link>
        </li>
        <li class="search-icon"><img src="../assets/images/search.png" alt=""></li>
      </ul>
      <div class="border-line"></div>
    </div>
</template>

<script>
export default {
  name: "navTab",
  data() {
    return {
      tabs: [
        {name: '首页', id: '0', path: '/'},
        {name: '关于展会', id: '1', path: '/aboutzh'},
        {name: '展商专区', id: '2', path: '/goods'},
        {name: '观众专区', id: '3', path: '/audience'},
        {name: '新闻资讯', id: '4', path: '/news'},
      ],
      idx: 0
    }
  },
  methods: {
    tabChange(e) {
      /*let target = e.target.dataset
      let index = target.index*/
      this.idx = e
    }
  }
}
</script>

<style scoped>
  .title-img{
    width: 7.5rem;
    height: 3.41rem;
  }
  .search-icon{
    
  }
  .border-line{
    width:7.5rem;
    height:0.01rem;
    background:rgba(238,236,233,1);
    margin-bottom: 0.3rem;
  }
  .tab{
    display: flex;
    height: 0.79rem;
    line-height: 0.79rem;
    text-align: center;
    font-size: 0.28rem;
    font-family: PingFangSC-Regular;
    color: rgba(51,51,51,1);
  }
  .tab-li:first-child{
    padding-left: 0.36rem;
  }
  .tab-li{
    padding-right: 0.35rem;
    position: relative;
  }
  .active{
    color: #C8A258;
    padding-bottom: 0.18rem;
    border-bottom: 0.06rem solid #C8A258;
  }
  /*.active:after {
    content: '';
    position: absolute;
    left: 18px;
    top: auto;
    bottom: 0;
    right: auto;
    height: 3px;
    width: 25px;
    border-radius:5px;
    background-color: #C8A258;
  }*/
</style>
