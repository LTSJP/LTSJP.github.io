import Index from '@/scripts/pages/index.vue'
import Recommend from '@/scripts/pages/Recommend.vue'
import Optimization from '@/scripts/pages/Optimization.vue'
import Vip from '@/scripts/pages/Vip.vue'
import Shoppingcart from '@/scripts/pages/Shoppingcart.vue'
import Mine from '@/scripts/pages/Mine.vue'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/recommend',
      children: [
        {
          path: '/recommend',
          component: Recommend
        },
        {
          path: '/optimization',
          component: Optimization
        },
        {
          path: '/vip',
          component: Vip
        },
        {
          path: '/shoppingcart',
          component: Shoppingcart
        },
        {
          path: '/mine',
          component: Mine
        }
      ]
    }
  ]
})
