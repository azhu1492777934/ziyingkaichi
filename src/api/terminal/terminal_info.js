import request from '@/utils/request'

export function modelDevice() {
  return request({
    url: '/terminal_info/info',
    method: 'get',
  })
}