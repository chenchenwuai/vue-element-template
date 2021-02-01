import store from '@/store'
import Layout from '@/layout/index'

export const filterAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(router => {
    if (!router.path) {
      return false
    }
    if (!router.meta) {
      router.meta = {
        title: router.name,
        icon: router.icon
      }
    }
    if (router.componentName) {
      if (router.componentName === 'Layout') { // Layout组件特殊处理
        router.component = Layout
      } else {
        const componentName = router.componentName
        router.component = loadView(componentName)
      }
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children)
    }
    return true
  })
}

export const flatAsyncRouter = (routers, flatPermissions) => { // 遍历后台传来的权限，将权限字符串转为一维数组
  routers.forEach(item => {
    if (item.permission) {
      flatPermissions.push(item.permission.toLowerCase())
    }
    if (item.children && item.children.length) {
      flatPermissions = flatAsyncRouter(item.children, flatPermissions)
    }
  })
  return flatPermissions
}

export const loadView = (view) => {
  return (resolve) => require([`@/views/${view}`], resolve)
}

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const roles = store.getters && store.getters.roles
    const permissionRoles = value

    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}
