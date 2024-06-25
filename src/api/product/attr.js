import request from '@/utils/request'

export function getcategory1() { // 一级菜单
  return request({
    url: '/admin/product/getCategory1',
    method: 'get'
  })
}

export function getcategory2(category1Id) { // 二级菜单
  return request({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: 'get'
  })
}

export function getcategory3(category2Id) { // 三级菜单
  return request({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: 'get'
  })
}

export function getAttrInfoList(category1Id, category2Id, category3Id) { // 三级菜单
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}
