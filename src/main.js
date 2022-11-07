import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import Component from '@/components' // 全局引入 组件
import * as directives from '@/directives' // 引入 自定义指令的对象
import * as filters from '@/filters' // 引入 引入工具类

// // 导入自定义指令文件
// 遍历所有的导出的指令对象 完成自定义全局注册
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})
// 注册全局过滤器
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})
Vue.use(Component) // 注册自己的插件
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
