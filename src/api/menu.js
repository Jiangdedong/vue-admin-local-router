/*
 * @Descripttion: 菜单管理
 * @version: 1.0
 * @Author: JDD
 * @Date: 2019-12-14 20:00:44
 * @LastEditors: JDD
 * @LastEditTime: 2019-12-17 21:32:19
 */
import request from '@/utils/request'

// 菜单查询
export function menuList(params) {
  return request({
    url: '/menu/list',
    method: 'get',
    params
  })
}

// 菜单新增/修改
export function menuAddOrEdit(url, data) {
  return request({
    url,
    method: 'post',
    data
  })
}

// 菜单删除
export function menuDel(params) {
  return request({
    url: '/menu/del/' + params.id,
    method: 'get'
  })
}
