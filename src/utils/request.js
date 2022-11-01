import { Message } from 'element-ui'
import axios from 'axios' // 创建一个axios的实例
import store from '@/store'
import router from '@/router'
// import { getTimeStamp } from '@/utils/auth'
const service = axios.create({
  // 如果执行 npm run dev  值为 /api 正确  /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
}) // 创建一个axios的实例

// 设置超时的时间 秒数
// const Timeout = 3600
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 判断有token
    if (store.getters.token) {
      // 判断token是否超时
      // 超时 表示token无效了,只有在token有效时,才去检查时间戳是否失效
      // 中断访问  提示错误信息  清除token,用户基本资料 跳到登录页
      /*  if (isCheckTimeout()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token超时'))
      } */
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config //  最后一定要返回 config对象
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // axios默认包了一层data
    const { data, message, success } = response.data
    // 提示成功 => 返回 data数据
    if (success) {
      return data
    } else {
      // 提示错误信息
      Message.error(message)
      // 业务已经错误 不能进入.then  应该进入 .catch
      return Promise.reject(new Error(message)) // 没有错误对象,new一个
    }
  },
  (error) => {
    if (error.response && error.response.data && error.response.data.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login')
    } else {
    // 失败的情况,提示错误信息
      Message.error(error.message)
    }
    // 返回Promise.reject 会跳过.then,直接进入到.catch => 返回执行错误
    return Promise.reject(error)
  }
)
// token超时
// 超时逻辑:
// (当前的时间戳 - 存入的时间戳) 大于 指定的时间戳

/* function isCheckTimeout() {
  var currentTimeout = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTimeout - timeStamp) / 1000 > Timeout // 时间戳为毫秒 需要除以1000转换为秒
} */
export default service // 导出axios实例
