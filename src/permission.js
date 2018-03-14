import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getUserToken, setUserToken } from '@/utils/auth' // 验权

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()

  let {query: {token, username}} = to;
  if (token && username) { // 判断路由携带了用户授权信息
    debugger
    if (!getUserToken().token && !getUserToken().username) {
      setUserToken(username, token);
      store.dispatch('saveAuthInfo', {token: token, username: username});
    }
  }

  if (getUserToken().token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // store.dispatch('GetInfo').then(res => { // 拉取用户信息
      //   next()
      // }).catch(() => {
      //   store.dispatch('FedLogOut').then(() => {
      //     Message.error('验证失败,请重新登录')
      //     next({ path: '/login' })
      //   })
      // })
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
