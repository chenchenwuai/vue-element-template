import variables from '@/assets/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { title, tagsView, fixedHeader, sidebarLogo, uniqueOpened, showFooter, footerTxt, caseNumber, version, baiduAK } = defaultSettings

const state = {
  title: title,
  theme: variables.theme,
  showSettings: false,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  uniqueOpened: uniqueOpened,
  showFooter: showFooter,
  footerTxt: footerTxt,
  caseNumber: caseNumber,
  version: version,
  BAIDU_MAP_AK: baiduAK
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

