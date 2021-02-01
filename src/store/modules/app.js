import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'small',
  documentHidden: false,
  imageViewerVisible: false,
  imageViewerUrlList: []
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  SET_DOCUMENT_HIDDEN: (state, flag) => {
    state.documentHidden = flag
  },
  SET_IMAGE_VIEWER_VISIBLE: (state, flag) => {
    state.imageViewerVisible = flag
  },
  SET_IMAGE_VIEWER_URL_LIST: (state, urlList) => {
    state.imageViewerUrlList = urlList
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  setDocumentHidden({ commit }, flag) {
    commit('SET_DOCUMENT_HIDDEN', flag)
  },
  showImageViewer({ commit }, urlList) {
    if (!urlList || !urlList.length) {
      return
    }
    commit('SET_IMAGE_VIEWER_VISIBLE', true)
    commit('SET_IMAGE_VIEWER_URL_LIST', urlList)
  },
  closeImageViewer({ commit }) {
    commit('SET_IMAGE_VIEWER_VISIBLE', false)
    commit('SET_IMAGE_VIEWER_URL_LIST', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
