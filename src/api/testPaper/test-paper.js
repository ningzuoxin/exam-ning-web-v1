import request from '@/utils/request'

/**
 * 查询所有试卷类型
 * @returns {AxiosPromise}
 */
export function listTypes() {
  return request({
    url: '/xxx/exam/testPaper/type',
    method: 'get'
  })
}
