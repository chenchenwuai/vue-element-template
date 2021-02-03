import request from '@/utils/request'
import md5 from 'js-md5'

export function get(id) {
  return request({
    url: '/users/' + id,
    method: 'get'
  })
}

export function getUsers(params) {
  return request({
    url: '/users/actions/list',
    method: 'get',
    params
  })
}

export function add(userinfo) {
  const data = JSON.parse(JSON.stringify(userinfo))
  data.password = md5(data.password).toLocaleUpperCase()
  return request({
    url: '/users/actions/create',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: '/users/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: '/users/' + data.id,
    method: 'put',
    data
  })
}

export function editUser(data) {
  return request({
    url: 'users/actions/update',
    method: 'put',
    data
  })
}

export function updatePass(user) {
  const data = {
    oldPassword: encryptPs(user.oldPass),
    password: encryptPs(user.newPass)
  }
  return request({
    url: 'users/password/actions/update',
    method: 'put',
    data
  })
}

export function resetPass(ps, id) {
  const data = {
    password: encryptPs(ps)
  }
  return request({
    url: 'users/password/' + id,
    method: 'put',
    data
  })
}

const encryptPs = function(ps) {
  return md5(ps).toUpperCase()
}

export function kickOut(data) {
  return request({
    url: 'online/users/actions/kickOut',
    method: 'delete',
    data
  })
}

export default { add, edit, del }

