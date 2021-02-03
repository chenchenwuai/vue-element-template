import request from '@/utils/request'
import whiteApiList from './white-list'

export function login(username, password) {
  return request({
    url: whiteApiList.loginApiPath,
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/users',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: whiteApiList.logoutApiPath,
    method: 'get'
  })
}
