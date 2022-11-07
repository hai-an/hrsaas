<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <!-- 放置页签 -->
        <el-tabs>
          <!-- 左侧内容 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                type="primary"
                size="small"
                @click="showDialog=true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <!-- stripe属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。 -->
            <!-- 可以使用border属性，它接受一个Boolean，设置为true即可启用边框. -->
            <el-table :data="list" border style="width: 100%" stripe>
              <el-table-column
                align="center"
                type="index"
                label="序号"
                width="120"
              />
              <el-table-column
                align="center"
                prop="name"
                label="名称"
                width="240"
              />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <template slot-scope="{row}">
                  <el-button type="success" size="small">分配权限</el-button>
                  <el-button type="primary" size="small" @click="editRole(row.id)">编辑</el-button>
                  <el-button type="danger" size="small" @click="deleteRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <!--
              默认情况下，当总页数超过 7 页时，Pagination 会折叠多余的页码按钮。通过pager-count属性可以设置最大页码按钮数。
              total表示总条目数，
              page-size用于设置每页显示的页码数量
              current-page显示当前的页码数
              current-change事件 currentPage 改变时会触发 回调参数(当前页)
               -->
              <el-pagination
                layout="prev, pager, next"
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                :pager-count="5"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>

          <!-- 右侧内容 -->
          <el-tab-pane label="公司信息">
            <!--
          closable属性决定是否可关闭，接受boolean，默认为true。
          设置show-icon属性来显示 Alert 的 icon，这能更有效地向用户展示你的显示意图。
           -->
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              :closable="false"
              show-icon
            />
            <el-form
              label-position="right"
              label-width="120px"
              style="margin-top: 50px"
            >
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 弹层 -->
    <el-dialog
      title="编辑弹层"
      :visible.sync="showDialog"
      @close="btnCancel"
    >
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button type="primary" size="small" @click="btnOK">确认</el-button>
          </el-col>
        </el-row>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole, updateRole, getRoleDetail, addRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      formData: {},
      list: [], // 接收用户列表数组
      page: {
        page: 1, // 当前页码
        pagesize: 2, // 每页多少条数据
        total: 0 // 记录总数
      },
      showDialog: false,
      roleForm: {},
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList() // 获取角色列表
    this.getCompanyInfo() // 获取公司的信息
  },
  methods: {
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      this.page.total = total
      this.list = rows
    },
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
    },
    async deleteRole(id) {
      try {
        await this.$confirm('确定要删除吗?')
        await deleteRole(id)
        // 成功提示 重新发请求,重置页面数据
        this.getRoleList()
        this.$message.success('删除成功!')
      } catch (error) {
        console.log(error)
      }
    },
    async editRole(id) { // 编辑功能实现
      this.roleForm = await getRoleDetail(id)
      this.showDialog = true // 显示弹层
    },
    changePage(newPage) {
      this.page.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
    },
    btnCancel() {
    // 重置表单数据
      this.roleForm = {
        name: '',
        description: ''
      }
      // 重置表单校验
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    // 点击确定 触发=> close事件(绑定跟点击取消同一个方法) => 调用 btnCancel方法
    // 所以节约了代码...
    async btnOK() {
      try {
        await this.$refs.roleForm.validate() // 在点击确定按钮,进行一次提交前的校验
        if (this.roleForm.id) {
          await updateRole(this.roleForm)
        } else {
          // 新增业务
          await addRole(this.roleForm)
        }
        // 重新拉取数据
        this.getRoleList()
        // 关闭弹层
        this.showDialog = false
        // 成功提示
        this.$message.success('操作成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style></style>
