<template>
  <el-dialog title="新增部门" :visible="isShowDialog">
    <el-form
      :model="form"
      label-width="120px"
    >
      <!-- 表单组件 el-form label-width设置label的宽度 -->
      <!-- 匿名插槽 -->
      <el-form-item label="部门名称">
        <el-input v-model="form.name" style="width:80%" placeholder="5-10字符" />
      </el-form-item>
      <el-form-item label="部门编号">
        <el-input v-model="form.number" style="width:80%" placeholder="5-10字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select v-model="form.selected" style="width:80%" placeholder="请选择">
          <!-- <el-option label="区域一" value="shanghai" /> -->
        </el-select>
      </el-form-item>
      <el-form-item label="部门信息">
        <el-input v-model="form.message" style="width:80%" type="textarea" placeholder="1-200字符" :rows="3">
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
export default {
  name: '',
  components: {},
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        number: '',
        selected: '',
        message: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style scoped></style>
