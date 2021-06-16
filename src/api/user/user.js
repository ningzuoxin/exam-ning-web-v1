import request from '@/utils/request'

/**
 * 查询用户列表
 * @param query
 * @returns {AxiosPromise}
 */
export function listUser(query) {
  return request({
    url: '/user/user/page',
    method: 'get',
    params: query
  })
}

/**
 * 获取单个用户
 * @param id
 * @returns {AxiosPromise}
 */
export function getUser(query) {
  return request({
    url: '/user/user/get',
    method: 'get',
    params: query
  })
}

/**
 * 添加用户
 * @param user
 * @returns {AxiosPromise}
 */
export function addUser(user) {
  return request({
    url: '/user/user/add',
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
    url: '/user/user/edit',
    method: 'post',
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
    url: '/user/user/delete',
    method: 'post',
    params: { id: id }
  })
}
