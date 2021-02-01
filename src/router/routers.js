import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login',
    meta: { title: '登录', noCache: true },
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/frame-features/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/frame-features/401'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/frame-features/redirect')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true, noCache: true }
      }
    ],
    alwaysShow: false
  },
  {
    path: '/userinfo',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: '',
        component: () => import('@/views/profile'),
        name: '个人中心',
        meta: { title: '个人中心' }
      }
    ]
  }
]

export const NoMatchRouter = {
  path: '*', redirect: '/404', hidden: true
}

export default new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
