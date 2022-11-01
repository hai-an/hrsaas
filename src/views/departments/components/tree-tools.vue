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
          <el-dropdown>
            <span class="el-dropdown-link">
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <!-- 下拉内容 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
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
  }
}
</script>

<style></style>
