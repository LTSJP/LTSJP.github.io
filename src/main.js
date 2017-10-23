// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './styles/app.scss'
import Vue from 'vue'
import Router from 'vue-router'
import router from './router'
import 'mint-ui/lib/style.css'
import store from './vuex/store'

Vue.use(Router)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router
})
