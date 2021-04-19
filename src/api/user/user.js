import request from '@/utils/request'

const users = [
  {
    username: 'admin',
    email: '123456789@qq.com',
    mobile: '13301330133',
    nickname: '管理员admin',
    gender: '男',
    idCard: '400000199001011234',
    createCime: '2020-01-01'
  },
  {
    username: 'admin',
    email: '123456789@qq.com',
    mobile: '13301330133',
    nickname: '管理员admin',
    gender: '男',
    idCard: '400000199001011234',
    createCime: '2020-01-01'
  },
  {
    username: 'admin',
    email: '123456789@qq.com',
    mobile: '13301330133',
    nickname: '管理员admin',
    gender: '男',
    idCard: '400000199001011234',
    createCime: '2020-01-01'
  },
  {
    username: 'admin',
    email: '123456789@qq.com',
    mobile: '13301330133',
    nickname: '管理员admin',
    gender: '男',
    idCard: '400000199001011234',
    createCime: '2020-01-01'
  },
  {
    username: 'admin',
    email: '123456789@qq.com',
    mobile: '13301330133',
    nickname: '管理员admin',
    gender: '男',
    idCard: '400000199001011234',
    createCime: '2020-01-01'
  },
  {
    username: 'admin',
    email: '123456789@qq.com',
    mobile: '13301330133',
    nickname: '管理员admin',
    gender: '男',
    idCard: '400000199001011234',
    createCime: '2020-01-01'
  }
]

export function listUser(query) {
  return request({
    url: '/sss/user/page',
    method: 'get',
    params: query
  })
}
