<template>
    <div class="wrap">
      <div class="title">
        <img src="../assets/images/introduce.png" alt="333" class="introduce-icon">
        <div class="title-right">
          <h2>展会介绍</h2>
          <div class="title-right-en">Exhibition Introduction</div>
        </div>
      </div>
      <p class="header-text" :class="{show: show}">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
      </p>
      <div class="show-bts" @click="showBts">{{showText}}</div>
    </div>
</template>

<script>
export default {
  name: "introduce",
  data() {
    return {
      obj: {},
      show: true,
      showText: "显示全文"
    }
  },
  created() {
  },
  methods: {
    showBts() {
      if (this.show) {
        this.show = false
        this.showText = "收起全文"
      } else {
        this.show = true
        this.showText = "显示全文"
      }
    }
  }
}
</script>

<style scoped>
  .header-text{
    /*width: 375px;*/
  }
  .wrap{
    margin-left: 20px;
  }
  .title{
    display: flex;
    margin-bottom: 5px;
  }
  .show{
    overflow:hidden;;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:8;
  }
  .title-right{
    margin-left: 11px;
  }
  .title-right-en{
    display: block;
    height:8px;
    font-size:10px;
    font-family:PingFangSC-Light;
    color:rgba(207,194,170,1);
    /*line-height:30px;*/
  }
  .show-bts{
    color: blue;
    width: 90px;
    height: 20px;
  }
  h2{
    text-align: left;
    margin-bottom: 5px;
    font-size:17px;
    font-family:PingFangSC-Medium;
    color:rgba(198,160,86,1);
  }
  .introduce-icon{
    width:16.5px;
    height:16px;
  }
</style>
