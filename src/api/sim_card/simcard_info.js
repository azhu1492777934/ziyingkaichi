import request from '@/utils/request'

export function modelDevice() {
  return request({
    url: '/simcard_info/info',
    method: 'get',
  })
}