import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/terminal_info/info',
    method: 'post',
    data: query
  })
}