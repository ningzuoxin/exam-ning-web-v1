import request from '@/utils/request'

/**
 * 查询角色列表
 * @param query
 * @returns {AxiosPromise}
 */
export function listRole(query) {
  return request({
    url: '/user/user/role/page',
    method: 'get',
    params: query
  })
}

/**
 * 添加角色
 * @param role
 * @returns {AxiosPromise}
 */
export function addRole(role) {
  return request({
    url: '/user/user/role/add',
    method: 'post',
    data: role
  })
}
