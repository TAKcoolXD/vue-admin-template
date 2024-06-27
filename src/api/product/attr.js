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

export function reqAddOrUpdateAttr(data) { // 添加商品属性与属性值
  return request({
    url: `/admin/product/saveAttrInfo`,
    method: 'post',
    data: data
  })
}
// {
//   "attrName": "",      属性名
//   "attrValueList": [   属性名中属性值，因为属性值可以是多个，因此需要的是数组
//     {
//       "attrId": 0,          属性的id
//       "valueName": "string"  属性值
//     }
//   ],
//   "categoryId": 0,    category3Id
//   "categoryLevel":3,
// }

export function reqDeleteAttr(attrId) { // 添加商品属性与属性值
  return request({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: 'delete'
  })
}
