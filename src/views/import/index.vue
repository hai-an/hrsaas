<template>
  <!-- 公共导入Excel组件 -->
  <upload-excel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  data() {
    return {
      type: this.$route.query.type
    }
  },
  methods: {
    async success({ header, results }) {
      // 导入员工
      if (this.type === 'user') {
        const userRelations = {
          '入职日期': 'timeOfEntry',
          '手机号': 'mobile',
          '姓名': 'username',
          '转正日期': 'correctionTime',
          '工号': 'workNumber'
        }
        console.log(header)
        console.log(results)
        // const arr = []
        // results.forEach(async item => {
        //   const userInfo = {}
        //   Object.keys(item).forEach(key => {
        //     userInfo[userRelations[key]] = item[key]
        //   })
        //   arr.push(userInfo)
        //   await importEmployee(arr) // 调用导入员工接口
        //   this.$router.back()
        // })

        const newArr = results.map(item => {
          const userInfo = {}
          Object.keys(item).forEach(key => {
            // 判断 是否入职时间 和 转正时间
            // 然后 把英文的key 用 formatDate函数格式化,最后用 new Date() 只有这样, 才能入库
            if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
              console.log(new Date(this.formatDate(item[key], '/')))
              userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '-'))
            } else {
              userInfo[userRelations[key]] = item[key]
            }
            // 相当于把中文的key 赋值给 英文的key
          })
          return userInfo
        })
        console.log(newArr)

        await importEmployee(newArr) // 调用导入员工接口
        this.$message.success('导入execle成功!')
        this.$router.back() // 返回上一页
      }
    },
    // 格式化时间
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style></style>
