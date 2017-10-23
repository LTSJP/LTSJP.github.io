import Vue from 'vue'
import Router from 'vue-router'
import Index from '../scripts/pages/Index.vue'
import Recommend from '../scripts/pages/Recommend.vue'
import Recomm from '../scripts/viewpages/Recomm.vue'
import Women from '../scripts/viewpages/Women.vue'
import Shoes from '../scripts/viewpages/Shoes.vue'
import GlobalShop from '../scripts/viewpages/GlobalShop.vue'
import Adpage from '../scripts/viewpages/Adpage.vue'
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
					        path: '/globalShop',
					        component: GlobalShop
					    }
					]
		  	}
			]
		},
		{
			path: '/adpage',
		  component: Adpage
		    
		},
		{
			path: '/page404',
			component: Page404
		}
	]
})
