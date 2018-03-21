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
    // name: '客户信息管理',
    name: 'HQL一对一',
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

  {
    path: '/operation',
    component: Layout,
    redirect: 'noredirect',
    // name: '运营管理',
    name: 'HQL多对一',
    icon: 'table',
    children: [
      { path: 'country', component: () => import('@/views/operation/country/index'), name: '国家管理' },
      { path: 'country/new', component: () => import('@/views/operation/country/new'), name: '国家新增', hidden: true  },
      { path: 'country/edit/:id', component: () =>import('@/views/operation/country/edit'), name: '国家编辑', hidden: true  },

      { path: 'operator', component: () => import('@/views/operation/operator/index'), name: '运营商管理' },
      { path: 'operator/new', component: () => import('@/views/operation/operator/new'), name: '运营商新增', hidden: true  },
      { path: 'operator/edit/:id', component: () =>import('@/views/operation/operator/edit'), name: '运营商编辑', hidden: true  },

      { path: 'country_operator', component: () => import('@/views/operation/country_operator/index'), name: '运营商支持国家管理' },
      { path: 'country_operator/new', component: () => import('@/views/operation/country_operator/new'), name: '运营商支持国家新增', hidden: true  },
      { path: 'country_operator/edit/:id', component: () =>import('@/views/operation/country_operator/edit'), name: '运营商支持国家编辑', hidden: true  },

      { path: 'operator_prefer', component: () => import('@/views/operation/operator_prefer/index'), name: 'PLMN配置管理' },
      { path: 'operator_prefer/new', component: () => import('@/views/operation/operator_prefer/new'), name: 'PLMN配置新增', hidden: true  },
      { path: 'operator_prefer/edit/:id', component: () =>import('@/views/operation/operator_prefer/edit'), name: 'PLMN配置编辑', hidden: true  },

      { path: 'used_net', component: () => import('@/views/operation/used_net/index'), name: '接入网络配置管理' },
      { path: 'used_net/new', component: () => import('@/views/operation/used_net/new'), name: '接入网络配置新增', hidden: true  },
      { path: 'used_net/edit/:id', component: () =>import('@/views/operation/used_net/edit'), name: '接入网络配置编辑', hidden: true  },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
