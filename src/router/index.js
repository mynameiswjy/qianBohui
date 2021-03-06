import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/homePage'
    },
    {
      path: '/homePage',
      component: (e) => import('@/container/homePage'),
      name: 'homePage',
      children: []
    },
    {
      path: '/aboutzh',
      component: () => import('@/container/aboutzh'),
      name: 'aboutzh'
    },
    {
      path: '/goods',
      component: () => import('@/container/goods'),
      name: 'goods'
    },
    {
      path: '/audience',
      component: () => import('@/container/audience'),
      name: 'audience'
    },
    {
      path: '/news',
      component: () => import('@/container/news'),
      name: 'news'
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/container/search.vue')
    },
    {
      path: "/exhibitionDetail",
      name: 'exhibitionDetail',
      component: () => import('@/container/exhibitionDetail.vue')
    },
    {
      path: "/contactUs",
      name: 'contactUs',
      component: () => import('@/container/contactUs.vue')
    }, {
      path: "/aboutUs",
      name: 'aboutUs',
      component: () => import('@/container/aboutUs.vue')
    },
    {
      path: "/newsLandingPage",
      name: 'newsLandingPage',
      component: () => import('@/container/newsLandingPage.vue')
    },
    {
      path: "/reservation",
      name: 'reservation',
      component: () => import('@/components/mask/reservation.vue')
    },
    {
      path: "/visit",
      name: 'visit',
      component: () => import('@/components/mask/visit.vue')
    },
    {
      path: "/downloadList",
      name: 'downloadList',
      component: () => import('@/components/downloadList.vue')
    },
    {
      path: "/qbh_ad",
      name: 'qbhAd',
      component: () => import('@/qbh_ad/index.vue')
    },
    {
      path: "/ad_select",
      name: 'adSelect',
      component: () => import('@/qbh_ad/select.vue')
    },
    {
      path: "/result",
      name: 'result',
      component: () => import('@/qbh_ad/result.vue')
    },
    {
      path: "/LuckyDraw",
      name: 'LuckyDraw',
      component: () => import('@/qbh_ad/LuckyDraw.vue')
    },
    {
      path: "/getPrize",
      name: 'getPrize',
      component: () => import('@/qbh_ad/getPrize.vue')
    }
  ]
})
