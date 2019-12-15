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
export function userDel(params) {
  return request({
    url: '/user/edit/' + params.id,
    method: 'get'
  })
}
