import request from '@/utils/request'

// 获取当前登录用户的权限菜单
export function buildMenus() {
  return request({
    url: '/menus/users/trees',
    method: 'get',
    params: {
      clientType: 1
    }
  })
}
