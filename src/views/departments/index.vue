<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px"
        >
          <el-col>
            <span>老王羊肉有限公司</span>
          </el-col>
          <el-col :span="4">
            <el-row type="flex" justify="end" :span="4">
              <!-- 两个内容 -->
              <el-col>
                <span>负责人</span>
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
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-tree :data="departs" :props="defaultProps">
          <!-- 使用自定义的 数结构 -->
          <!-- slot-scope 作用域插槽 :传入两个参数node和data，分别表示当前节点的 Node 对象和当前节点的数据。 -->
          <el-row
            slot-scope="{ data }"
            type="flex"
            justify="space-between"
            align="middle"
            style="height: 40px; width: 100%;"
          >
            <!-- 宽度 百分百 -->
            <el-col>
              <span>{{ data.name }}</span>
            </el-col>
            <el-col :span="4">
              <el-row type="flex" justify="end" :span="4">
                <!-- 两个内容 -->
                <el-col>
                  <span>{{ data.manager }}</span>
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
                      <el-dropdown-item>编辑子部门</el-dropdown-item>
                      <el-dropdown-item>删除子部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    // handleNodeClick(data) {
    //   console.log(data)
    // }
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
