import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: 'users/actions/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function logout() {
  return request({
    url: 'users/actions/logout',
    method: 'get'
  })
}
