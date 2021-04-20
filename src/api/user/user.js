import request from '@/utils/request'

/**
 * 查询用户列表
 * @param query
 * @returns {AxiosPromise}
 */
export function listUser(query) {
  return request({
    url: '/sss/user/page',
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
    url: '/sss/user/add',
    method: 'post',
    data: user
  })
}

