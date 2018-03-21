import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  // { path: '/', component: () => import('@/views/dashboard/index'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'route.dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/customer',
    component: Layout,
    redirect: 'noredirect',
    name: '客户信息管理',
    icon: 'table',
    children: [
      { path: 'customer', component: () => import('@/views/customer/customer/index'), name: '客户管理' },
      { path: 'customer/new', component: () => import('@/views/customer/customer/new'), name: '客户新增', hidden: true  },
      { path: 'customer/edit/:id', component: () =>import('@/views/customer/customer/edit'), name: '客户编辑', hidden: true  },

      { path: 'balance', component: () => import('@/views/customer/balance/index'), name: '客户账户管理' },
      { path: 'balance/edit/:id', component: () => import('@/views/customer/balance/edit'), name: '客户账户编辑', hidden: true  },

      { path: 'country_price', component: () => import('@/views/customer/country_price/index'), name: '价格管理' },
      { path: 'country_price/new', component: () => import('@/views/customer/country_price/new'), name: '价格新增', hidden: true  },
      { path: 'country_price/edit/:id', component: () =>import('@/views/customer/country_price/edit'), name: '价格编辑', hidden: true  },

      { path: 'order', component: () => import('@/views/customer/order/index'), name: '客户行程订单' },
      { path: 'order/show/:id', component: () =>import('@/views/customer/order/show'), name: '查看行程', hidden: true  },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
