import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/Layout.vue'
import List from './views/List.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/list'
  }, {
    path: '/',
    name: 'layout',
    component: Layout,
    children: [{
        path: '/list',
        name: 'list',
        component: List
      },
      {
        path: '/baokuan',
        name: 'baokuan',
        component: () => import( /* webpackChunkName: "about" */ './views/Category.vue')
      },
      {
        path: '/loan',
        name: 'loan',
        component: () => import( /* webpackChunkName: "about" */ './views/Loan.vue')
      },
      {
        path: '/xiakuanbibei',
        name: 'xiakuanbibei',
        component: () => import( /* webpackChunkName: "about" */ './views/Category.vue')
      }
    ]
  }, {
    path: '/category',
    name: 'category',
    component: () => import( /* webpackChunkName: "about" */ './views/Category.vue')
  }, {
    path: '/detail',
    name: 'detail',
    component: () => import( /* webpackChunkName: "about" */ './views/Detail.vue')
  }]
})
