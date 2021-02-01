import Cookies from 'js-cookie'
import Config from '@/settings'

import { removeServerWSURI } from '@/components/WCSVideo/utils/auth' // 清空websocket的uri

const TokenKey = Config.TokenKey

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeUserCache() {
  removeServerWSURI()
  return true
}
