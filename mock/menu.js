module.exports = [
  {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}/menus/users/trees(?!\/)`),
    type: 'get',
    response: config => {
      return {
        code: 200,
        data: []
      }
    }
  }
]
