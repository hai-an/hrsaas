<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 顶部栏 -->
      <page-tools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template v-slot:after>
          <el-button size="small" type="success">导入execle</el-button>
          <el-button size="small" type="danger">导出execle</el-button>
          <el-button icon="plus" size="small" type="primary" @click="showDialog=true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-card v-loading="loading">
        <el-table :data="list" border>
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column prop="username" label="姓名" sortable="" />
          <el-table-column prop="workNumber" label="工号" sortable="" />
          <el-table-column prop="formOfEmployment" label="聘用形式" :formatter="formatEmployment" sortable="" />
          <el-table-column prop="departmentName" label="部门" sortable="" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable="">
            <template slot-scope="{row}">
              {{ row.timeOfEntry|formatDate }}
              <!-- 没有用,因为返回的时间格式 就是 yyyy-mm-dd -->
            </template>
          </el-table-column>
          <el-table-column prop="formOfEmployment" label="账号状态" sortable="">
            <template slot-scope="{row}">
              <el-switch
                :value="row.formOfEmployment === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template v-slot="{row}">
              <el-button type="text" size="small">参看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px;">
          <el-pagination
            :page-size="page.size"
            :total="page.total"
            :current-page="page.page"
            layout="prev, pager, next"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <!--
        放置新增组件弹层
     -->
    <add-employee :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import AddEmployee from './components/add-employee.vue'
export default {
  components: { AddEmployee },
  data() {
    return {
      list: [],
      page: {
        page: 1, // 当前页码
        size: 10, // 每页显示几条数据
        total: 0 // 总数
      },
      loading: false,
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    async getEmployeeList() {
      this.loading = true
      const { total, rows } = await getEmployeeList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
      // console.log(this.list)
    },
    changePage(newPage) {
      this.page.page = newPage // 更新页码,然后重新获取 最新页码的数据
      this.getEmployeeList()
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      // row 行数据 cellValue单元格数据
      const obj = EmployeeEnum.hireType.find(item => item.id === cellValue)
      // console.log(typeof (cellValue) + cellValue)
      return obj ? obj.value : '未知'
    },
    async  delEmployee(id) {
      try {
        await this.$confirm('确定要删除吗?')
        await delEmployee(id)
        this.$message.success('删除成功')
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style></style>
