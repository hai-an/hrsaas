<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <page-tools :show-before="true">
      <!-- slot="名称" 或者 v-slot:名称 -->
      <!-- 后者搭配 template使用,前者配合'tag标签'使用 -->
      <template v-slot:before>
        <span>你们好爱我</span>
      </template>
      <template v-slot:after>
        <el-button type="primary">导入excel</el-button>
      </template>
    </page-tools>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
