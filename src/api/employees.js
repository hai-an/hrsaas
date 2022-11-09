/* 获取 部门负责人 */
import request from '@/utils/request'

/* 获取员工简单列表 */
export function getEmployeesSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

/* 获取员工列表 */
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params
  })
}
/* 删除员工接口 */
export function delEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
/* 新增员工接口 */
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
/*
  封装一个导入员工的接口
*/
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
