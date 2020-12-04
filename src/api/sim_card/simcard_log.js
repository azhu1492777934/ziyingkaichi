import request from '@/utils/request'

export function modelList(query) {
  return request({
    url: '/simcardlog/list',
    method: 'post',
    data: query
  })
}

export function modelRecover(imsi,afterStatus) {
  return request({
    url: '/simcardlog/recover/' + imsi,
    method: 'post',
    data: {afterStatus: afterStatus, imsi: imsi}
  })
}
