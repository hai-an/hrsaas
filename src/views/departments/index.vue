<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts" />
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 使用自定义的 数结构 -->
          <!-- slot-scope 作用域插槽 :传入两个参数node和data，分别表示当前节点的 Node 对象和当前节点的数据。 -->
          <tree-tools
            slot-scope="{data}"
            :tree-node="data"
            @addDepts="addDepts"
            @delDepts="getDepartments"
            @editDepts="editDepts"
          />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置 新增弹层组件 -->
    <add-depts
      ref="addDepts"
      :is-show-dialog.sync="isShowDialog"
      :tree-node="node"
      @addDepts="getDepartments"
    />
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDepts from './components/add-dept.vue'
export default {
  components: { treeTools, AddDepts },
  data() {
    return {
      company: { name: '', manager: '' },
      departs: [],
      defaultProps: {
        // children: 'children',
        label: 'name'
      },
      isShowDialog: false, // 默认不显示弹层
      node: null // 点击拿到的部门信息节点
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.departs = tranListToTreeData(result.depts, '')
    },
    addDepts(node) {
      this.isShowDialog = true // 显示弹层
      this.node = node // 因为node是当前的点击的部门,此时这个部门应该记录下来
    },
    editDepts(node) {
      this.isShowDialog = true // 显示弹层
      this.node = node // 因为node是当前的点击的部门,此时这个部门应该记录下来
      //  我们需要在这个位置 调用子组件的方法
      // 父组件 调用子组件的方法
      console.log(this.$refs.addDepts)
      this.$refs.addDepts.getDepartDetail(node.id) // 直接调用子组件的方法 传入一个id
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
