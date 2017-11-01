import Vue from 'vue'
import Router from 'vue-router'
import Index from '../scripts/pages/Index.vue'

import Recommend from '../scripts/pages/Recommend.vue'
import Optimization from '@/scripts/pages/Optimization.vue'
import Vip from '@/scripts/pages/Vip.vue'
import Shoppingcart from '@/scripts/pages/Shoppingcart.vue'
import Mine from '@/scripts/pages/Mine.vue'

import Recomm from '../scripts/viewpages/Recomm.vue'
import Women from '../scripts/viewpages/Women.vue'
import Shoes from '../scripts/viewpages/Shoes.vue'
import Stayhome from '@/scripts/viewpages/StayHome.vue'
import Baby from '@/scripts/viewpages/Baby.vue'
import Digital from '@/scripts/viewpages/Digital.vue'
import Man from '../scripts/viewpages/Man.vue'
import Beauty from '@/scripts/viewpages/Beauty.vue'
import DeliciousFood from '@/scripts/viewpages/DeliciousFood.vue'
import GlobalShop from '../scripts/viewpages/Global.vue'
import Ornament from '@/scripts/viewpages/Ornament.vue'
import Upcoming from '@/scripts/viewpages/Upcoming.vue'


import Search from '@/scripts/pages/Search.vue'
import HotSearch from '@/scripts/viewpages/HotSearch.vue'
import Suggest from '@/scripts/viewpages/Suggest.vue'
import SearchList from '@/scripts/pages/searchlist.vue'
import Sort from '../scripts/pages/Sort.vue'
import Detail from '../scripts/pages/Detail.vue'

import Login from '../scripts/pages/Login.vue'
import Register from '../scripts/pages/Register.vue'
import Page404 from '../scripts/pages/404.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
	    path: '/',
	    component: Index,
	    redirect: '/recommend',
	    children: [
	      {
	        path: '/recommend',
	        component: Recommend,
	        redirect: '/recomm',
	        children:[
						{						
							path: '/recomm',
							component:Recomm
						},
						{
				        path: '/women',
				        component: Women
				    },					
				    {
				        path: '/shoes',
				        component: Shoes
				    },
						{
				        path: '/man',
				        component: Man
				    },	
				    {
				        path: '/globalShop',
				        component: GlobalShop
				    },
				    {
				        path: '/ornament',
				        component: Ornament
				    },
				    {
				        path: '/stayhome',
				        component: Stayhome
				    },
				    {
				    	path: '/deliciousFood',
				    	component: DeliciousFood
				    },
				    {
				    	path: '/digital',
				    	component: Digital
				    },
				    {
				        path: '/baby',
				        component: Baby
				    },
				    {
				        path: '/beauty',
				        component: Beauty
				    },
				    {
				        path: '/upcoming',
				        component: Upcoming
				    }
					]
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
		},
		{
			path: '/login',
		  component: Login
		    
		},
		{
			path: '/register',
		  component: Register
		    
		},
		{
			path: '/page404',
			component: Page404
		},
		{
			path: '/sort',
			component: Sort
		},
		{						
			path: '/search',
			component:Search,
			redirect: '/hotsearch',
			children:[
				{
					path:'/hotsearch',
					component:HotSearch
				},
				{
					path:'/suggest',
					component:Suggest
				}
			]
		},
		{
			path: '/searchlist',
			component: SearchList
		},
		{
      path: '/detail/:id',
      component: Detail,
      name: 'detail'
    }
	]
})
