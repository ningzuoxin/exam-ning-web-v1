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

/**
 * 查询试卷列表
 * @param query
 * @returns {AxiosPromise}
 */
export function listTestPaper(query) {
  return request({
    url: '/xxx/exam/testPaper/page',
    method: 'get',
    params: query
  })
}

/**
 * 预览试卷
 * @param query
 * @returns {AxiosPromise}
 */
export function preview(query) {
  return request({
    url: '/xxx/exam/testPaper/preview',
    method: 'get',
    params: query
  })
}

/**
 * 查询考试列表
 * @param query
 * @returns {AxiosPromise}
 */
export function listExam(query) {
  return request({
    url: '/xxx/exam/testPaper/listExam',
    method: 'get',
    params: query
  })
}

/**
 * 交卷
 * @param params
 * @returns {AxiosPromise}
 */
export function submit(params) {
  return request({
    url: '/xxx/exam/testPaper/submit',
    method: 'post',
    data: params
  })
}
