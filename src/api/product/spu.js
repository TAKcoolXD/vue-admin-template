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
