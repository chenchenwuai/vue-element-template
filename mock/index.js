const Mock = require('mockjs')
const { param2Obj } = require('./utils')

// you do not need `import xxx from './modules/xxx'`
// it will auto require all mock modules from module files
/* Mock Modules */
const moduleFiles = require.context('./modules', true, /\.js$/)
const modules = moduleFiles.keys().reduce((modules, modulePath) => [...modules, ...moduleFiles(modulePath)], [])

const mocks = [
  ...modules
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  console.log('[ Mock ] : Start Mock')
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      console.log(`[ Mock ] : match url:${options.url}, method:${options.type}, result:`, result)
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    console.log('[ Mock ] : mock url, ', i.url)
    Mock.mock(i.url, i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}
