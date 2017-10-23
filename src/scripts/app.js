import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import '../styles/app.scss'
import routes from './routes'
import 'mint-ui/lib/style.css'

Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

new Vue({
  el: '#root',
  router
})
