const menus = [
  {
    componentName: 'Layout',
    icon: 'setting',
    name: '系统管理',
    path: '/system',
    id: '1',
    children: [
      {
        componentName: 'system/users',
        icon: 'users-setting',
        name: '用户管理',
        path: 'users',
        id: '2'
      },
      {
        componentName: 'system/roles',
        icon: 'roles-setting',
        name: '角色管理',
        path: 'roles',
        id: '3'
      }
    ]
  }
]

module.exports = [
  {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}/menus/users/trees(?!\/)`),
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: menus
      }
    }
  }
]
