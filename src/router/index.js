import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/container/homePage'
import aboutZh from '@/container/aboutzh'
import goods from '@/container/goods'
import audience from '@/container/audience'
import news from '@/container/news'
import search from '@/container/search.vue'
import exhibitionDetail from '@/container/exhibitionDetail.vue'
import contactUs from '@/container/contactUs.vue'
import newsLandingPage from '@/container/newsLandingPage.vue'

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
      name: 'homePage',
      children: [
      ]
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
    },
    {
      path: '/search',
      component: search,
      name: 'search'
    },
    {
      path: "/exhibitionDetail",
      name: 'exhibitionDetail',
      component: exhibitionDetail
    },
    {
      path: "/contactUs",
      name: 'contactUs',
      component: contactUs
    },
    {
      path: "/newsLandingPage",
      name: 'newsLandingPage',
      component: newsLandingPage
    }
  ]
})
