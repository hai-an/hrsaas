/* 获取 部门负责人 */
import request from '@/utils/request'

/* 获取员工简单列表 */
export function getEmployeesSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
