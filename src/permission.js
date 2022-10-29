import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
const whiteList = ['/login', '/404']
// 全局路由前置守卫
router.beforeEach((to, from, next) => {
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
      next() // 放行
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
