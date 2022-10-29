import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
// 状态
const state = {
  token: getToken(), // 设置共享状态
  userInfo: {} // 为什么不设置为null,因为访问 null.字段属性会报错
}
// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 设置 token 只是修改 state的数据
    setToken(token) // 同步vuex 数据给本地token
  },
  // 删除缓存
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // 先删除 vuex 再清除缓存vuex 和 缓存数据的同步
  },
  // 设置 用户信息
  setUserInfo(state, userInfo) {
    // state.userInfo = userInfo // 实时更新
    state.userInfo = { ...userInfo } // 用 浅拷贝的方式去赋值对象 因为这样数据更新之后，才会触发组件的更新
  },
  // 删除 用户信息
  removeUserInfo(state) { state.userInfo = {} }
}
// 执行异步
const actions = {
  // 登录
  async login(context, data) {
    const result = await login(data) // 得到 =>token
    // actions 修改state 必须通过mutation
    // 不用解构 因为 已经在 request中响应拦截器中解构 data数据=== token
    context.commit('setToken', result) // 发送到mutation中 设置token
  },
  // 获取用户资料
  // 只需要传token即可,token已经在请求拦截器中配置好了,无需传入参数
  async getUserInfo(context) {
    const result = await getUserInfo() // 得到 => data数据
    context.commit('setUserInfo', result)
    return result // 为后面的权限做准备
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
