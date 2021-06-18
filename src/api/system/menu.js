import request from '@/utils/request'

/**
 * 查询菜单列表
 * @param query
 * @returns {AxiosPromise}
 */
export function listMenu(query) {
  return request({
    url: '/user/user/menu/page',
    method: 'get',
    params: query
  })
}

/**
 * 添加菜单
 * @param role
 * @returns {AxiosPromise}
 */
export function addMenu(menu) {
  return request({
    url: '/user/user/menu/add',
    method: 'post',
    data: menu
  })
}

/**
 * 查询目录和菜单
 * @param query
 * @returns {AxiosPromise}
 */
export function queryMC() {
  return request({
    url: '/user/user/menu/queryMC',
    method: 'get'
  })
}

/**
 * 查询菜单树形列表
 * @param query
 * @returns {AxiosPromise}
 */
export function listMenuTree() {
  return request({
    url: '/user/user/menu/tree',
    method: 'get'
  })
}

/**
 * 查询路由
 * @returns {AxiosPromise}
 */
export function getRouters() {
  return request({
    url: '/user/user/menu/getRouters',
    method: 'get'
  })
}
