import request from '@/utils/request'

/**
 * 查询用户列表
 * @param query
 * @returns {AxiosPromise}
 */
export function listUser(query) {
  return request({
    url: '/system/users/page',
    method: 'get',
    params: query
  })
}

/**
 * 获取单个用户
 * @param id
 * @returns {AxiosPromise}
 */
export function getUser(id) {
  return request({
    url: `/system/users/${id}`,
    method: 'get'
  })
}

/**
 * 添加用户
 * @param user
 * @returns {AxiosPromise}
 */
export function addUser(user) {
  return request({
    url: '/system/users',
    method: 'post',
    data: user
  })
}

/**
 * 修改用户
 * @param user
 * @returns {AxiosPromise}
 */
export function editUser(user) {
  return request({
    url: '/system/users',
    method: 'put',
    data: user
  })
}

/**
 * 删除用户
 * @param id
 * @returns {AxiosPromise}
 */
export function deleteUser(id) {
  return request({
    url: `/system/users/${id}`,
    method: 'delete'
  })
}
