import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
// import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router/routers'

import './icons' // icon
import './router/index' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

if (process.env.NODE_ENV === 'development') {
  console.log(process.env)
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
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
