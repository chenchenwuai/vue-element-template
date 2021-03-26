import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import '@/assets/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router/routers'

import './assets/icons' // icon
import './router/index' // permission control

import * as filters from './filters' // global filters

if (process.env.NODE_ENV === 'development') {
  console.log(process.env)
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'mini' // set element-ui default size
})

import Messages from '@/utils/messages'
Vue.prototype.$messages = Messages

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// register global utility directive
// clickoutside 指令
import clickoutside from '@/directive/clickoutside'
Vue.use(clickoutside)
// 权限指令
import permission from '@/directive/permission'
Vue.use(permission)

import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
