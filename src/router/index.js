import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index.vue'
import Recommend from '../pages/Recommend.vue'
import Recomm from '../viewpages/Recomm.vue'
import Women from '../viewpages/Women.vue'
import Shoes from '../viewpages/Shoes.vue'
import GlobalShop from '../viewpages/GlobalShop.vue'
import Adpage from '../viewpages/Adpage.vue'
import Page404 from '../pages/404.vue'

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
