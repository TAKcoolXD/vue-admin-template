import request from '@/utils/request'

export function reqSpuImageList(spuId) { // 获取图片数据
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}
export function reqSpuSaleAttrList(spuId) { // 获取销售属性的数据
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
  })
}

export function reqAttrInfoList(category1Id, category2Id, category3Id) { // 获取平台属性
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
}

export function reqAddSku(skuInfo) { // 添加Sku
  return request({
    url: `/admin/product/saveSkuInfo`,
    method: 'post',
    data: skuInfo
  })
}

export function reqSkuList(spuId) { // 获取SKU列表数据的接口
  return request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: 'get'
  })
}
