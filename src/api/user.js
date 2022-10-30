import request from '@/utils/request'
// import axios from 'axios'
/* 封装用户登录的接口 */
export function login(data) {
  // return axios.post('/sys/login', data)
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
// 获取用户基本资料
// token 统一在请求拦截器中设置
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 获取用户的基本信息
export function getUserDetailById(id) {
  return request(`/sys/user/${id}`)
}
