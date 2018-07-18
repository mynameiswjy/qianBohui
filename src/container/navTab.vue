<template>
    <div>
      <img :hidden="this.idx != 0" class="title-img" src="https://weixin.566.com/BizImage/CircleBgImage/201806/15/d58a_47de4ee4_47de4ee4.jpg">
      <ul class="tab">
        <li class="tab-li" @click="tabChange(tab.id)" v-for="tab in tabs" v-bind:key="tab.id">
          <router-link :class="{active:tab.id == idx}" :to="tab.path">{{tab.name}}</router-link>
        </li>
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
    padding-left: 17.5px;
    position: relative;
  }
  .active{
    color: #C8A258;
    padding-bottom: 9px;
    border-bottom: 3px solid #C8A258;
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
