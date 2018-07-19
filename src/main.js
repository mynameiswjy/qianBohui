// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */

function setRootFontSize() {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
}
window.addEventListener('resize', function () {
  setRootFontSize()
}, false)
setRootFontSize()

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
