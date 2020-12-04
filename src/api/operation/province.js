import request from '@/utils/request'

export function provinceMap() {
  return request({
    url: '/province/map',
    method: 'get'
  })
}

export function provinceType0Map() {
  return request({
    url: '/province/provincemap',
    method: 'get'
  })
}
  export function modelList(query) {
    return request({
      url: '/province/list',
      method: 'post',
      data: query
    })
  }

  export function modelDetail(id) {
    return request({
      url: '/province/show/' + id,
      method: 'get'
    })
  }

  export function modelDelete(id) {
    return request({
      url: '/province/delete/' + id,
      method: 'post'
    })
  }

  export function modelCreate(model) {
    return request({
      url: '/province/create',
      method: 'post',
      data: model
    })
  }

  export function modelUpdate(model) {
    return request({
      url: '/province/update',
      method: 'post',
      data: model
    })
}

