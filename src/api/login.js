/*
 * @Descripttion: 用户登陆相关api
 * @version: 1.0
 * @Author: JDD
 * @Date: 2019-12-14 20:00:44
 * @LastEditors: JDD
 * @LastEditTime: 2019-12-15 19:53:24
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/loginInfo',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
