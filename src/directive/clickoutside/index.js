import Clickoutside from 'element-ui/src/utils/clickoutside'

const install = function(Vue) {
  Vue.directive('Clickoutside', Clickoutside)
}

if (window.Vue) {
  window.Clickoutside = Clickoutside
  Vue.use(install); // eslint-disable-line
}

Clickoutside.install = install
export default Clickoutside
