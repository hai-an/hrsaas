<template>
  <el-dialog :title="showTitle" :visible="isShowDialog" @close="btnCancel">
    <el-form ref="deptForm" :model="formData" :rules="rules" label-width="120px">
      <!-- 表单组件 el-form label-width设置label的宽度 -->
      <!-- 匿名插槽 -->
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          style="width: 80%"
          placeholder="2-20字符"
        />
      </el-form-item>
      <el-form-item label="部门编号" prop="code">
        <el-input
          v-model="formData.code"
          style="width: 80%"
          placeholder="1-20字符"
        />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeesSimple"
        >
          <el-option
            v-for="item in people"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width: 80%"
          type="textarea"
          placeholder="10-300字符"
          :rows="3"
        >
          <!-- <el-option label="区域一" value="shanghai" /> -->
        </el-input>
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="8" style="text-align: center">
        <el-button size="small" @click="btnCancel">取 消</el-button>
        <el-button type="primary" size="small" @click="btnOk">确 定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail, updateDepartments } from '@/api/departments'
import { getEmployeesSimple } from '@/api/employees'
export default {
  // name: '',
  components: {},
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: null
    }
  },
  data() {
    // 定义一个检测 重复的部门名称
    const checkNameRepeat = async(rule, value, callback) => {
      // 先获取最新的组织架构数据
      const { depts } = await getDepartments()
      // depts 是所有的部门数据
      // 如何去找技术部所有的子节点
      let isRepeat = false
      if (this.formData.id) { // 编辑模式
      //  排除 当前 的id ,并且统计部门下不能出现重复部门名称
        isRepeat = depts.filter(item => item.pid !== this.formData.id && item.pid === this.treeNode.pid).some(item => item.name === value)
      } else { // 新增模式
        isRepeat = depts.filter(item => item.pid === this.treeNode.id).some((item) => item.name === value)
      }
      isRepeat
        ? callback(new Error(`同级部门下已经有${value}的部门了`))
        : callback()
    }
    // 检查编码重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // 先获取最新的组织架构数据
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        isRepeat = depts.filter(item => item.id !== this.formData.id).some(item => item.code === value && value)
      } else {
        isRepeat = depts.some((item) => item.code === value && value) // 防止用户不添加编码,i出现编码为空的情况
      }
      isRepeat
        ? callback(new Error(`组织架构中已经有部门使用${value}编码`))
        : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空!', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '输入的部门名称需在2-20字符之间',
            trigger: 'blur'
          },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编号不能为空!', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '输入的部门编码需在1-20字符之间',
            trigger: 'blur'
          },
          { validator: checkCodeRepeat, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '部门管理者不能为空!', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门名介绍不能为空!', trigger: 'blur' },
          {
            min: 10,
            max: 300,
            message: '输入的部门介绍需在10-300字符之间',
            trigger: 'blur'
          }
        ]
      }, // 校验规则
      people: []
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async getEmployeesSimple() {
      this.people = await getEmployeesSimple()
      console.log('this.people', this.people)
    },
    btnOk() {
      this.$refs.deptForm.validate(async isOk => {
        if (isOk) { // 表示可以提交表单数据了
          if (this.formData.id) { // 编辑模式  调用编辑接口
            await updateDepartments(this.formData)
          } else { // 新增模式  调用新增接口
            await addDepartments({ ...this.formData, pid: this.treeNode.id }) // 调用新增接口 添加父部门的id
          }
          this.$emit('addDepts') // 通知父组件关闭弹层
          this.$emit('update:isShowDialog', false) // 语法糖 update:props名称,值 ,父组件 @propos名称.async="变量接收值"
        }
      })
    },
    btnCancel() {
      this.$refs.deptForm.resetFields() // 重置校验规则
      // 重置数据  因为resetFields 只能重置 表单上的数据 非表单上的 比如 编辑中id 不能重置
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
      this.$emit('update:isShowDialog', false) // 通知父组件关闭弹层
    },
    async getDepartDetail(id) { // 获取部门详情
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style scoped></style>
