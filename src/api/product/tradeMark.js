import request from '@/utils/request'

export function reqTradeMarkList(page, limit) {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}
// export function reqTradeMarkList1(data) {
//   return request({
//     url: `/admin/product/baseTrademark/`,
//     method: 'get',
//     params: data
//   })
// }

// export function reqAddOrUpdateTradeMark(tradeMark) {
//   if (tradeMark.id) {
//     return request({
//       url: `/admin/product/baseTrademark/update`,
//       method: 'put',
//       data: tradeMark
//     })
//   } else {
//     return request({
//       url: `/admin/product/baseTrademark/save`,
//       method: 'post',
//       data: tradeMark
//     })
//   }
// }

export const reqAddOrUpdateTradeMark = (tradeMark) => {
  // 带给服务器数据携带ID---修改
  if (tradeMark.id) {
    return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark })
  } else {
    // 新增品牌
    return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark })
  }
}

export const reqDeleteTradeMark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })
