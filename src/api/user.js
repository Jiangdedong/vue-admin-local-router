/*
 * @Descripttion: 用户管理
 * @version: 1.0
 * @Author: JDD
 * @Date: 2019-12-14 20:00:44
 * @LastEditors: JDD
 * @LastEditTime: 2019-12-15 20:45:11
 */
import request from '@/utils/request'

// 用户列表查询
export function userList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

// 用户新增/修改
export function userAddOrEdit(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

// 用户删除
export function multipleUserDel(params) {
  return request({
    url: '/user/multipleDel',
    method: 'get',
    params
  })
}

// 用户密码修改
export function modifyPassword(data) {
  return request({
    url: '/user/modifyPassword',
    method: 'post',
    data
  })
}

// 用户菜单赋权
export function updateUserMenus(data) {
  return request({
    url: '/user/setMenu',
    method: 'post',
    data
  })
}
