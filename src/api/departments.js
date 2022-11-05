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
    method: 'delete',
    url: `/company/department/${id}`
  })
}
/*
新增部门接口
*/
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

// 根据 id 获取部门详情
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}
