<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 使用自定义的 数结构 -->
          <!-- slot-scope 作用域插槽 :传入两个参数node和data，分别表示当前节点的 Node 对象和当前节点的数据。 -->
          <tree-tools slot-scope="{data}" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
export default {
  components: { treeTools },
  data() {
    return {
      company: { name: '', manager: '' },
      departs: [],
      defaultProps: {
        // children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人' }
      this.departs = result.depts
    }
  }
}
</script>

<style scoped>
/* .el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
} */
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
