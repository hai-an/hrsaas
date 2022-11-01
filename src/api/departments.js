import request from '@/utils/request'
/*
 组织架构
*/
// 获取 企业的部门列表
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
