import Cookies from 'js-cookie'

const TokenKey = 'hrsaas_token'
const TimeOutKey = 'hrsaas_TimeOutKey_token' // 设置超时的key
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(TimeOutKey)
}
// 设置时间戳
export function setTimeStamp() {
  return Cookies.set(TimeOutKey, Date.now())
}
