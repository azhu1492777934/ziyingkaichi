import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/select_sim/list',
    method: 'post',
    data: query
  })
}


