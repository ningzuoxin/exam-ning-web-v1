import request from '@/utils/request'

const client_id = 'ning168168'
const client_secret = '168668'
const grant_type = 'password'
const basicAuth = btoa(`${client_id}:${client_secret}`)

export function login(username, password) {
  return request({
    url: '/auth/oauth2/token',
    method: 'post',
    headers: {
      Authorization: `Basic ${basicAuth}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: new URLSearchParams({
      username,
      password,
      grant_type
    }).toString()
  })
}

export function getCurrentUserInfo() {
  return request({
    url: '/system/users/current-user-info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/auth/oauth/logout',
    method: 'get'
  })
}
