<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <!-- 宽度 百分百 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end" :span="4">
        <!-- 两个内容 -->
        <el-col>
          <span>{{ treeNode.manager }}</span>
        </el-col>
        <el-col>
          <!-- 下拉菜单  -->
          <el-dropdown trigger="click" @command="operateDepts">
            <span class="el-dropdown-link">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <!-- 下拉内容 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { deleteDepartment } from '@/api/departments'

export default {
// 该组件需要对外开放属性 外部需要提供一个对象 对象里需要有name manager
  props: {
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    operateDepts(type) {
      if (type === 'add') { // 添加子部门
        this.$message(`${type}成功!`)
      } else if (type === 'edit') { // 编辑子部门
        this.$message(`${type}成功!`)
      } else { // 删除子部门
        this.$confirm('确定要删除该部门吗?').then(() => {
        // 如果点击确定就会进入 .then,点击取消进入 .catch
          console.log(this.treeNode.id, 'id')
          return deleteDepartment(this.treeNode.id) // 返回Promise对象,再执行下一个 .then
        }).then(() => {
          this.$emit('delDepts')// 给父组件通信,触发自定义事件
          this.$message.success('删除部门成功!')
        })
      }
    }
  }
}
</script>

<style></style>
