import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '../container/homePage'
import aboutZh from '../container/aboutzh'
import goods from '../container/goods'
import audience from '../container/audience'
import news from '../container/news'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/homePage'
    },
    {
      path: '/homePage',
      component: HomePage,
      name: 'homePage'
    },
    {
      path: '/aboutzh',
      component: aboutZh,
      name: 'aboutzh'
    },
    {
      path: '/goods',
      component: goods,
      name: 'goods'
    },
    {
      path: '/audience',
      component: audience,
      name: 'audience'
    },
    {
      path: '/news',
      component: news,
      name: 'news'
    }
  ]
})
