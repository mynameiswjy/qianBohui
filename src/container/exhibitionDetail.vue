<template>
    <div class="details_wrap">
      <div class="title">
        <img src="../assets/images/introduce.png" alt="333" class="introduce-icon">
        <div class="title-right">
          <div class="details_select">
            <h2 class="details_h2">历届展会</h2>
            <select>
              <option value ="volvo">请选择</option>
              <option value ="saab">Saab</option>
              <option value="opel">Opel</option>
              <option value="audi">Audi</option>
            </select>
          </div>
          <div class="title-right-en">Exhibition Introduction</div>
        </div>
      </div>
      <div class="news_wrap left-margin">
        <ul class="news_content">
          <li class="news_content_list" v-for="item in list" v-bind:key="item.id">
            <div class="news_content_list_left">{{item.name}}</div>
            <div>{{item.time}}</div>
          </li>
        </ul>
        <div class="btns">
          <div class="prev">
            <img src="../assets/images/prev-page.png" alt="">
          </div>
          <div class="next">
            <img style="" src="../assets/images/next-page.png" alt="">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "exhibitionDetail",
  data() {
    return {
      list: [
        {name: '贵金属纪念币知识介绍', id: '0', time: '2018-07-03'},
        {name: '纪念币的保存、清洗及赝品识别', id: '1', time: '2018-07-03'},
        {name: '纪念币题材及发行要素辨识', id: '2', time: '2018-07-03'},
        {name: '购买途径及鉴定证书辨识', id: '3', time: '2018-07-03'},
        {name: '如何成为特许零售商', id: '4', time: '2018-07-03'}
      ]
    }
  },
  created() {
    document.title = '历届展会';
  },
  methods: {
  }
}
</script>

<style scoped lang="stylus">
select::-ms-expand { display: none; }
.details_wrap
  position fixed
  top: 0
  left: 0
  right 0
  width 100%
  bottom 0
  background-color: #fff
  .title
    width: 6.78rem;
    display: flex;
    margin-bottom: 0.32rem;
    margin-top: 0.58rem;
    margin-left 0.36rem
    font-family:PingFangSC-Medium;
    .introduce-icon
      width: 0.34rem;
      height: 0.34rem;
    .title-right
      margin-left: 0.22rem;
      .details_select
        width 6.22rem
        display flex
        /*justify-content space-between*/
        select
          width: 2.6rem;
          height: 0.5rem;
          font-size: 0.24rem
          font-family:PingFangSC-Regular;
          color:rgba(198,160,86,1);
          appearance:none;
          -moz-appearance:none;
          -webkit-appearance:none;
          background: url("../assets/images/zh-drop-down.png") no-repeat scroll 92% center transparent;
          background-size: 0.22rem 0.12rem;
          border-radius 0.08rem
          padding: 0rem 0 0rem 0.16rem;
          border: 0.01rem solid rgba(198,160,86,1);
        .details_h2
          width: 6.22rem;
          margin-bottom: 0.1rem;
          font-size: 0.34rem;
          line-height: 0.3rem;
          font-family: PingFangSC-Medium;
          color: rgba(198,160,86,1);
          display: flex;
          justify-content: space-between;
        .title-right-en
          display: block;
          font-size:0.2rem;
          font-family:PingFangSC-Light;
          color:rgba(207,194,170, 1);
          line-height: 0.3rem;
</style>
