// 定义一个自定义指令 => 导出指令对象
export const imagerror = {
  inserted(dom, options) {
    // options是 指令中的变量的解释,其中有一个属性叫做 value
    // dom 表示当前指令作用的dom对象
    // 当图片有地址 但是地址没有加载成功的时候 会触发图片的一个事件 => onerror
    dom.onerror = function() {
      // 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
      dom.src = options.value // 这里面不能写死
    }
  }
}
