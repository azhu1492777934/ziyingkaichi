// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css
import './utils/global.js'

import App from './App'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import '@/icons' // icon
import '@/permission'
import getters from "./store/getters"; // permission control

// 全局组件
import Pagination from './components/Pagination/index'
Vue.component('my-pagination',Pagination)

// 实例化 Echarts
// import * as echarts from 'echarts’
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
import 'echarts-liquidfill' // 引入水行图

import '../node_modules/echarts/map/js/china.js' // 引入中国地图

// import './mock'

Vue.use(ElementUI,echarts, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.prototype.getters = getters
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
