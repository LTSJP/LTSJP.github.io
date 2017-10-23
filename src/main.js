import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import router from './router'
import 'mint-ui/lib/style.css'
import '@/styles/app.scss'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  el: '#app',
  router
})
