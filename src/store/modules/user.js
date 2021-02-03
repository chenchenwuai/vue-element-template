import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, removeUserCache } from '@/utils/auth'
import { Loading } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    userinfo: {},
    permissions: [],
    flatPermissions: [],
    loadMenus: false // 第一次加载菜单时用到
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, userinfo) => {
      state.userinfo = userinfo
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    },
    SET_FLAT_PERMISSIONS: (state, permissions) => {
      state.flatPermissions = permissions
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    }
  },

  actions: {
    // 登录
    Login({ commit, dispatch }, userInfo) {
      const rememberMe = userInfo.rememberMe
      return new Promise((resolve, reject) => {
        login(userInfo.username, userInfo.password).then(res => {
          setToken(res.token, rememberMe)
          commit('SET_TOKEN', res.token)
          commit('SET_USER', res.userInfo)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          setUserInfo(res, commit)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        Loading.service({
          lock: true,
          text: '退出中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.9)'
        })
        logOut(commit)
        resolve()
      })
    },
    setUserPermissions({ commit }, permissions) {
      return new Promise((resolve, reject) => {
        commit('SET_PERMISSIONS', permissions)
      })
    },
    setUserFlatPermissions({ commit }, permissions) {
      return new Promise((resolve, reject) => {
        commit('SET_FLAT_PERMISSIONS', permissions)
      })
    },
    updateLoadMenus({ commit }, status) {
      return new Promise((resolve, reject) => {
        commit('SET_LOAD_MENUS', status)
      })
    }
  }
}

export const logOut = (commit) => {
  commit('SET_TOKEN', '')
  commit('SET_PERMISSIONS', [])
  removeToken()
  removeUserCache()
  location.reload()
}

export const setUserInfo = (res, commit) => {
  commit('SET_USER', res)
}

export default user
