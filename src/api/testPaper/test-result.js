import request from '@/utils/request'

/**
 * 查询考试结果列表
 * @returns {AxiosPromise}
 */
export function list(query) {
  return request({
    url: '/xxx/exam/result/list',
    method: 'get',
    params: query
  })
}
