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
