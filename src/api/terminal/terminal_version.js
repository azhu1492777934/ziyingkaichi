import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/terminal_version/list',
    method: 'post',
    data: query
  })
}

export function modelCreate(model) {
  return request({
    url: '/terminal_version/create',
    method: 'post',
    data: model
  })
}

export function modelDelete(id) {
  return request({
    url: '/terminal_version/delete/' + id,
    method: 'post'
  })
}


export function modelStop(id) {
  return request({
    url: '/terminal_version/stop/' + id,
    method: 'post'
  })
}
