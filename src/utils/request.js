import { Message } from 'element-ui'
import axios from 'axios' // 创建一个axios的实例
import store from '@/store'
const service = axios.create({
  // 如果执行 npm run dev  值为 /api 正确  /api 这个代理只是给开发环境配置的代理
  // 如果执行 npm run build 值为 /prod-api  没关系  运维应该在上线的时候 给你配置上 /prod-api的代理
  baseURL: process.env.VUE_APP_BASE_API, // 设置axios请求的基础的基础地址
  timeout: 5000 // 定义5秒超时
}) // 创建一个axios的实例

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 判断有无token
    if (store.getters.token) {
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
    // 失败的情况,提示错误信息
    Message.error(error.message)
    // 返回Promise.reject 会跳过.then,直接进入到.catch => 返回执行错误
    return Promise.reject(error)
  }
)
export default service // 导出axios实例
