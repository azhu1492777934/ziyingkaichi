import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getUserToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: '/api', 
  timeout: 36000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // config.headers['X-Token'] = getUserToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['Auth-name'] = getUserToken().username;
    config.headers['Auth-token'] = getUserToken().token; // 让每个请求携带token--['Auth-token']
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data;
    if (res.status < 0) {
      Message({
        message: res.msg,
        type: 'error',
        duration: _const.messageDuration,
        showClose: true,
        onClose() {
          if (res.status === -8) {
            store.dispatch('FedLogOut').then(() => {
              location.href = '/'// 为了重新实例化vue-router对象 避免bug
            });
          }
        }
      });
      // return Promise.reject('error');
      return response;
    } else {
      return response;
    }
    return response;
  },
  error => {
    console.log('err' + error);// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: _const.messageDuration,
      showClose: true
    });
    return Promise.reject(error);
  }
)

export default service
