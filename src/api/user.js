import request from '@/utils/request'
// import axios from 'axios'
/* 封装用户登录的接口 */
export function login(data) {
  console.log('data:', data)
  // return axios.post('/sys/login', data)
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

export function getInfo(token) {

}

export function logout() {

}
