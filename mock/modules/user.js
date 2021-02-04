module.exports = [
  // get user info
  {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}/users(\/*)?`),
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: {
          id: '460343260223108',
          name: '超级管理员',
          phoneNumber: '15700084691',
          username: 'admin'
        }
      }
    }
  },

  // user login
  {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}/users/actions/login(?!\/)`),
    type: 'post',
    response: config => {
      return {
        code: 200,
        data: {
          token: 'token111',
          userInfo: {
            id: '460343260223108',
            name: '超级管理员',
            username: 'admin'
          }
        }
      }
    }
  },

  // user logout
  {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}/users/actions/logout(?!\/)`),
    type: 'get',
    response: _ => {
      return {
        code: 200,
        msg: 'success'
      }
    }
  }
]
