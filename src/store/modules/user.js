import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
// 状态
const state = {
  token: getToken() // 设置共享状态
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
  }
}
// 执行异步
const actions = {
  // 定义 login action 也需要参数 调用action时传递过来的参数
  async login(context, data) {
    const result = await login(data) // 实际上就是一个promise result就是执行的结果
    // 表示登录接口调用成功 也就是意味着你的用户名和密码正确
    // actions 修改state 必须通过mutation
    // 不用结构 因为 已经在 request中响应拦截器中解构 data数据=== token
    context.commit('setToken', result)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
