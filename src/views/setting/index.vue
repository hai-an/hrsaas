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
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <!-- stripe属性可以创建带斑马纹的表格。它接受一个Boolean，默认为false，设置为true即为启用。 -->
            <!-- 可以使用border属性，它接受一个Boolean，设置为true即可启用边框. -->
            <el-table :data="list" border style="width: 100%" stripe>
              <el-table-column align="center" type="index" label="序号" width="120" />
              <el-table-column align="center" prop="name" label="名称" width="240" />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column align="center" label="操作">
                <el-button type="success" size="small" label="分配权限" />
                <el-button type="primary" size="small" label="编辑 " />
                <el-button type="danger" size="small" label="删除 " />
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
            <el-form label-position="right" label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input disabled style="width:400px" />
              </el-form-item>
              <el-form-item type="textarea" :rows="3" label="备注">
                <el-input disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getRoleList } from '@/api/setting'
export default {
  data() {
    return {
      list: [], // 接收用户列表数组
      page: {
        page: 1, // 当前页码
        pagesize: 1, // 每页多少条数据
        total: 0 // 记录总数
      }
    }
  },
  created() {
    this.getRoleList() // 获取角色列表
  },
  methods: {
    async  getRoleList() {
      const { total, rows } = await getRoleList(this.page)
      console.log(total)
      console.log(rows)

      this.page.total = total
      this.list = rows
    },
    changePage(newPage) {
      this.page.page = newPage // 将当前页码赋值给当前的最新页码
      this.getRoleList()
    }
  }
}
</script>

<style></style>
