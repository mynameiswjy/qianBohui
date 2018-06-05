import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/Test'
import test1 from '@/components/Test2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Test',
      component: test
    },
    {
      path: '/test1',
      name: 'Test2',
      component: test1
    }
  ]
})
