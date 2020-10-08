<template>
    <div class="analysis_wrap ">
      <div style="height: 2.67rem"></div>
      <img class="analysis_title" src="https://www.chbice.com/imgFile/ico/analysis/analysis_title.png" alt="">
      <div class="progress_wrap">
        <div class="progress" :class="{'progress1': animSwitch}"></div>
        <img class="progress_img" :class="{'progress_img1': animSwitch}" src="https://www.chbice.com/imgFile/ico/20201004213930.gif" alt="">
      </div>
    </div>
</template>

<script>
export default {
  name: "analysisTemp",
  data() {
    return {
      progress: 0,
      animSwitch: false
    }
  },
  created() {
  },
  mounted() {
    this.animSwitch = true
    this.nextQuestion()
  },
  methods: {
    nextQuestion() {
      setTimeout(() => {
        this.$router.push({path: 'result'});
        this.$emit('select-input', {isShow: 1})
      }, 3000)
    }

  }
}
</script>

<style scoped>
  .analysis_wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 7.5rem;
  }
  .analysis_wrap .analysis_title {
    width: 4.75rem;
    height: 1.12rem;
    display: block;
    margin: 1.46rem auto 1rem;
  }
  .progress_wrap {
    width: 4.85rem;
    height: .2rem;
    background-color: #fff;
    margin: 0 auto;
    border-radius: .1rem;
    position: relative;
  }
  .progress {
    position: absolute;
    top: 0;
    left: 0;
    height: .2rem;
    background-color: #FE800C;
    border-radius: .1rem;
    width: 0;
  }
  .progress_img {
    position: absolute;
    width: .88rem;
    height: .82rem;
    top: -0.38rem;
    left: 0rem;
  }
  .progress_img1 {
    animation: progressLeft 2s ease 1 alternate forwards;
  }
  .progress1 {
    animation: progressWidth 2s ease 1 alternate forwards;
  }
  @keyframes progressLeft {
    0% {
      left: 0;
    }
    100% {
      left: 4.5rem;
    }
  }
  @keyframes progressWidth {
    0% {
      width: 0;
    }
    100% {
      width: 4.85rem;
    }
  }
</style>
