// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import "@/assets/reset.css"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/recompose_ele_ui.css'
import router from './router'
import Clipboard from 'clipboard';

import 'mint-ui/lib/style.css'
import { DatetimePicker, Picker, Toast } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Picker.name, Picker);

Vue.prototype.Clipboard = Clipboard;
Vue.prototype.Toast = Toast;

Vue.use(ElementUI)
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
  store,
  components: { App },
  template: '<App/>'
})
