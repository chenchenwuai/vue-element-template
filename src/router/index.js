import router, { constantRouterMap, NoMatchRouter } from './routers'
import Router from 'vue-router'
import store from '@/store'
import Config from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
import { buildMenus } from '@/api/system/menu'
import { filterAsyncRouter, flatAsyncRouter } from '@/utils/permission'
import { isArray } from '@/utils/validate'

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login']// no redirect whitelist

/**
 * 路由前置守卫
 */
router.beforeEach((to, from, next) => {
  console.log('[ Router ] : ', from.path, '->', to.path)
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.title
  }
  NProgress.start()
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (!store.getters.userinfo.id) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(res => { // 拉取user_info
          loadMenus(next, to)
        }).catch((e) => {
          store.dispatch('LogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else if (store.getters.loadMenus) {
        next()
      } else {
        // 为false,一定没有获取动态路由,就跳转到获取动态路由的方法
        loadMenus(next, to)
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

// 首次登录动态加载当前职位权限
export const loadMenus = (next, to) => {
  buildMenus().then(res => {
    let all_permission = []
    if (res && isArray(res)) {
      all_permission = res.filter(item => {
        return true
      })
    }

    const asyncRouter = handlePermissions(all_permission)
    store.dispatch('setUserPermissions', asyncRouter)

    store.dispatch('updateLoadMenus', true)
    asyncRouter.push({ path: '*', redirect: '/404', hidden: true })
    store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
      router.addRoutes(asyncRouter) // 动态添加可访问路由表
      next({ ...to, replace: true })
    })
  }).catch(e => {
    next({ ...to, replace: true })
  })
}

function handlePermissions(permissions) {
  const flatPermissions = flatAsyncRouter(permissions, [])
  // flatPermissions.unshift('admin')
  store.dispatch('setUserFlatPermissions', flatPermissions)

  return filterAsyncRouter(permissions)
}

export const resetRouter = (asyncRouter) => {
  const allRouter = [...constantRouterMap, ...asyncRouter, NoMatchRouter]
  const newRouter = new Router({
    mode: 'hash',
    scrollBehavior: () => ({ y: 0 }),
    routes: allRouter
  })
  router.matcher = newRouter.matcher
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
