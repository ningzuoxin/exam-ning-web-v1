import request from '@/utils/request'

const client_id = 'ning666888'
const client_secret = '888666'
const grant_type = 'password'
const scope = 'ningning'

export function login(username, password) {
  return request({
    url: '/auth/oauth/token',
    method: 'post',
    params: { username, password, client_id, client_secret, grant_type, scope }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getInfo',
    method: 'get',
    params: { access_token: token }
  })
}

export function logout() {
  return request({
    url: '/auth/oauth/logout',
    method: 'get'
  })
}
