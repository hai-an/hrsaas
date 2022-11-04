<template>
  <el-dialog title="新增部门" :visible="isShowDialog">
    <el-form
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <!-- 表单组件 el-form label-width设置label的宽度 -->
      <!-- 匿名插槽 -->
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="2-20字符" />
      </el-form-item>
      <el-form-item label="部门编号" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-20字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择">
          <!-- <el-option label="区域一" value="shanghai" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" type="textarea" placeholder="10-300字符" :rows="3">
          <!-- <el-option label="区域一" value="shanghai" /> -->
        </el-input>
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="8" style="text-align:center;">
        <el-button size="small">取 消</el-button>
        <el-button type="primary" size="small">确 定</el-button>
      </el-col>
    </el-row>

  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
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
      const isRepeat = depts.filter(item => item.pid === this.treeNode.id).some(item => item.name === value)
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    // 检查编码重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // 先获取最新的组织架构数据
      const { depts } = await getDepartments()
      const isRepeat = depts.some(item => item.code === value && value) // 防止用户不添加编码,i出现编码为空的情况
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
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
          { min: 2, max: 10, message: '输入的部门名称需在2-20字符之间', trigger: 'blur' },
          { validator: checkNameRepeat, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编号不能为空!', trigger: 'blur' },
          { min: 1, max: 10, message: '输入的部门编码需在1-20字符之间', trigger: 'blur' },
          { validator: checkCodeRepeat, trigger: 'blur' }

        ],
        manager: [
          { required: true, message: '部门管理者不能为空!', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门名介绍不能为空!', trigger: 'blur' },
          { min: 10, max: 300, message: '输入的部门介绍需在10-300字符之间', trigger: 'blur' }
        ]
      } // 校验规则
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
  },
  methods: {}
}
</script>

<style scoped></style>
