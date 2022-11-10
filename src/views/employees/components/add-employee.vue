<template>
  <el-dialog
    title="新增员工"
    :visible.sync="showDialog"
    width="50%"
    @close="btnCancel"
  >
    <!-- 表单 -->
    <el-form
      ref="addEmployee"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width: 50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width: 50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width: 50%"
          placeholder="请输入入职时间"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model.number="formData.formOfEmployment"
          placeholder="请选择"
          style="width: 50%"
        >
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width: 50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          v-model="formData.departmentName"
          style="width: 50%"
          placeholder="请输入部门"
          @focus="getDepartments"
        />
        <!-- 树形控件 -->
        <el-tree
          v-if="showTree"
          v-loading="loading"
          :data="treeData"
          :props="{ label: 'name' }"
          :default-expand-all="true"
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width: 50%"
          placeholder="请输入转正时间"
        />
      </el-form-item>
    </el-form>
    <!-- footer 插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确认</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
import { tranListToTreeData } from '@/utils'
import { getDepartments } from '@/api/departments'
export default {
  components: {},
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployeeEnum, // 在data定义数据
      // 表单数据
      treeData: [], // 树形数据
      showTree: false, // 控制树形数据显示状态
      loading: false, // 控制加载状态
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [
          { required: true, message: '入职时间不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async getDepartments() {
      console.log('触发焦点')
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments() // depts是数组 但不是树形
      this.treeData = tranListToTreeData(depts, '')
      console.log(this.treeData)
      this.loading = false
    },
    selectNode(node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    async btnOK() {
      // 点击确定时 校验整个表单
      try {
        await this.$refs.addEmployee.validate()
        // 调用新增接口
        await addEmployee(this.formData)
        // 告诉父组件更新数据
        // this.$parent 可以直接调用到父组件的实例 实际上就是父组件this
        // this.$emit
        this.$parent.getEmployeeList && this.$parent.getEmployeeList()
        this.$parent.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    btnCancel() {
      // 重置原来的数据
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addEmployee.resetFields() // 重置校验结果
      this.$emit('update:showDialog', false)
      // 为什么可以用 update:变量名 ,因为在父组件中有 sync修饰
    }
  }
}
</script>

<style scoped></style>
