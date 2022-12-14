import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'
// 状态
const state = {
  token: getToken(), // 设置共享状态
  userInfo: {} // 为什么不设置为null,因为访问 null.字段属性会报错
}
// 修改状态
const mutations = {
  // 设置token之后, 添加当前时间戳
  setToken(state, token) {
    state.token = token // 设置 token 只是修改 state的数据
    setToken(token) // 同步vuex 数据给本地token
    setTimeStamp() // 设置当前的时间戳存到 本地
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
    const baseInfo = await getUserDetailById(result.userId) // 得到 用户基本资料
    context.commit('setUserInfo', { ...result, ...baseInfo }) //  此时已经获取到了用户的基本资料 迫不得已 为了头像再次调用一个接口 合并到一起
    return result // 为后面的权限做准备
  },
  // 退出登录 => 清除 token ,清除 用户基本资料
  logout(context) {
    context.commit('removeToken') // 清除token
    context.commit('removeUserInfo') // 清除 用户基本资料
    // 退出登录时,清空路由(恢复静态路由,清空动态路由)对象
    /* 要清空permission模块下的state数据
        vuex中 user子模块 permission子模块
        子模块调用子模块的actions 默认情况下 子模块的context是子模块的actions  默认情况下 子模块的context是子模块的
        父模块 调用 子模块的action
    */
    context.commit('permission/setRoutes', [], { root: true })
    // 子模块调用子模块的actions 可以将 commit的第三个参数 设置成 {root: true} 就表示当前的context不是子模块了 而是父模块
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
