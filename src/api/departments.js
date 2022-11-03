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

/*
 根据id 删除部门
*/
export function deleteDepartment(id) {
  return request({
    method: 'DELETE',
    url: `/company/department${id}`
  })
}
