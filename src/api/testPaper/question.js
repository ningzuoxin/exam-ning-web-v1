import request from '@/utils/request'

/**
 * 查询考题列表
 * @param query
 * @returns {AxiosPromise}
 */
export function listQuestion(query) {
  return request({
    url: '/xxx/exam/question/page',
    method: 'get',
    params: query
  })
}

/**
 * 查询所有题型
 * @returns {AxiosPromise}
 */
export function listTypes() {
  return request({
    url: '/xxx/exam/question/type',
    method: 'get'
  })
}
