import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/balance/list',
    method: 'post',
    data: query
  })
}

export function modelDetail(id) {
  return request({
    url: '/balance/show/' + id ,
    method: 'get'
  })
}


export function modelUpdate(model) {
  return request({
    url: '/balance/update',
    method: 'post',
    data: model
  })
}
