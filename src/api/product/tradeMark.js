import request from '@/utils/request'

export function reqTradeMarkList(page, limit) {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}
export function reqTradeMarkList1(data) {
  return request({
    url: `/admin/product/baseTrademark/`,
    method: 'get',
    params: data
  })
}
