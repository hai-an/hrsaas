import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
const whiteList = ['/login', '/404']
// 全局路由前置守卫
router.beforeEach(async(to, from, next) => {
  NProgress.start() // 开启进度条
  // to和from是route对象，必须调用next（）来解析钩子
  // 思路: 判断有无token
  // 1.有token
  //   (1) 去的是登录页 ,但是跳转的是主页
  //    (2) 去的是非 登录页,直接放行
  // 2.没有token
  //   (1) 去的是白名单的页面,放行
  //    (2) 否则 跳到 登录页
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/') // 跳到主页
    } else {
      // 有token 获取用户资料
      // 如果当前vuex中有用户的资料的id 表示,已经有资料了 不需要获取了 如果没有id才需要获取
      if (!store.getters.userId) {
        // 如果没有id 才表示当前用户资料没有获取过就可以接收到
        // async 函数所return 的内容 用await就可以接收到
        const { roles } = await store.dispatch('user/getUserInfo')
        // 如果说后续 需要根据用户资料获取数据的话 这里必须改成 同步
        // 筛选用户的可用路由
        // actions中函数 默认是Promise对象 调用这个对象 想要获取返回的值话 必须 加 await 或者是then
        // actions是做异步操作的
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        // routes就是筛选得到的动态路由
        // 动态路由 添加到路由表中 默认的路由表只有静态路由 没有动态路由
        // addRoutes 必须用next(地址)不能用next()
        router.addRoutes(routes) // 添加动态路由到路由表 铺路
        next(to.path) // 相当于跳转到对应的地址相当于多做一次 跳转 为什么要多做一次跳转
        // 进门了,但是进门之后我要去的地方的路还没有铺好,直接走,掉坑里,多做一次跳转,再从门外往里进一次,跳转之前,把路铺好,再次进来的时候 ,路就铺好了
      } else {
        next() // 放行
      }
    }
  } else { // indexOf返回-1,表示未找到,既不在白名单里面
    if (whiteList.indexOf(to.path) > -1) {
      next() // 白名单的页面,无需token,直接放行
    } else {
      next('/login')
    }
  }
  NProgress.done() // 设置手动更换地址的时候,进度条的关闭
})
// 全局路由后置守卫
router.afterEach(route => {
  // 这些挂钩不会得到下一个函数，也不会影响导航
  NProgress.done() // 关闭进度条
})
