// 该文件负责所有的公共的组件的全局注册
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './ImageUpload'
import Print from 'vue-print-nb'
import ScreenFull from './ScreenFull'
import ThemePicker from './ThemePicker'
import lang from './lang'
import TagsView from './TagsView'

export default {
  install(Vue) {
    // 注册全局的通用栏组件对象
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel) // 注册导入execl组件
    Vue.component('ImageUpload', ImageUpload) // 注册导入照片组件
    Vue.use(Print) // 注册打印组件
    Vue.component('ScreenFull', ScreenFull) // 全屏组件
    Vue.component('ThemePicker', ThemePicker) // 主题组件
    Vue.component('lang', lang) // 主题组件
    Vue.component('TagsView', TagsView) // tab页的视图组件
  }
}
