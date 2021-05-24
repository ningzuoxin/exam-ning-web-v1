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

/**
 * 添加试卷
 * @param params
 * @returns {AxiosPromise}
 */
export function add(params) {
  return request({
    url: '/xxx/exam/testPaper/add',
    method: 'post',
    data: params
  })
}
