// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "@/assets/reset.css"
import {Upload, Button, Dialog} from "element-ui"

Vue.use(Upload)
Vue.use(Dialog)
Vue.use(Button)
Vue.config.productionTip = false

/* eslint-disable no-new */

function setRootFontSize() {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + 'px'
}
window.addEventListener('resize', function () {
  setRootFontSize()
}, false)
setRootFontSize()
/*document.addEventListener('touchstart', function (e) {
  e.preventDefault();
})*/

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
