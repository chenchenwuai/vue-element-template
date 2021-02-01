import { constantRouterMap } from '@/router/routers'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    willToPath: '/' // 获取到项目菜单后要跳转的路径
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_WILL_TO_PATH: (state, path) => {
      state.willToPath = path
    }
  },
  actions: {
    GenerateRoutes({ commit }, asyncRouter) {
      commit('SET_ROUTERS', asyncRouter)
    },
    setWillToPath({ commit }, path) {
      commit('SET_WILL_TO_PATH', path)
    }
  }
}

export default permission
