<template>
    <div>
      <h2>展会介绍</h2>
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
  .show{
    overflow:hidden;;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:8;
  }
  .show-bts{
    color: blue;
    width: 90px;
    height: 20px;
  }
  h2{
    text-align: center;
  }
</style>
