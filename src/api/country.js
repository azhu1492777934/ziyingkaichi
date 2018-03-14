import request from '@/utils/request'

export function countryMap() {
  return request({
    url: '/country/map',
    method: 'get'
  })
}
