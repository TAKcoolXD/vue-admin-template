import request from '@/utils/request'

// export function reqSpuList(page, limit, category3Id) { // 一级菜单
//   return request({
//     url: `/admin/product/${page}/${limit}?category3Id=${category3Id}`,
//     method: 'get'
//   })
// }
export function reqSpuList(page, limit, data) { // 一级菜单   params相当于路径中query参数
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: data
  })
}

// export function reqSpuList(page, limit, category3Id) { // 一级菜单   params相当于路径中query参数
//   return request({
//     url: `/admin/product/${page}/${limit}`,
//     method: 'get',
//     params: { category3Id }
//   })
// }

export function reqSpuInfo(spuId) { // 获取SPu信息
  return request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
  })
}

export function reqTradeMarkList() { // 获取品牌
  return request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: 'get'
  })
}

export function reqSpuImageList(spuId) { // 获取SPu图标
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}

// 获取平台全部销售属性 -----整个平台销售属性
export function reqBaseSaleAttrList() { // 获取平台全部销售属性 -----整个平台销售属性
  return request({
    url: `/admin/product/baseSaleAttrList`,
    method: 'get'
  })
}
// 修改SPU||添加SPU：对于修改或者添加，携带给服务器参数大致一样的，唯一的区别就是携带的参数是否带id
export function reqAddOrUpdateSpu(spuInfo) {
  if (spuInfo.id) {
    return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo })
  } else {
    // 携带的参数不带id---添加SPU
    return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo })
  } // 获取平台全部销售属性 -----整个平台销售属性
}

export function reqDeleteSpu(spuId) { // 删除属性
  return request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
  })
}
