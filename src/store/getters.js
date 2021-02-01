const getters = {

  // app
  size: state => state.app.size,
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  documentHidden: state => state.app.documentHidden,

  // user
  token: state => state.user.token,
  permissions: state => state.user.permissions,
  flatPermissions: state => state.user.flatPermissions,
  userinfo: state => state.user.userinfo,
  username: state => (state.user.userinfo && state.user.userinfo.username) ? state.user.userinfo.username : null,
  loadMenus: state => state.user.loadMenus,

  // tagsView
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  // permission
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,

  // settings
  WEB_TITLE: state => state.settings.title,
  WEB_VERSION: state => state.settings.version,
  BAIDU_MAP_AK: state => state.settings.BAIDU_MAP_AK
}
export default getters

