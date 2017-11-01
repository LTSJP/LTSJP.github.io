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
  router,
  store
})

//自定义指令 scoll
Vue.directive('scroll', {
  bind: function (el, binding) {
    //定义指令
    var func = binding.value;
    el.addEventListener('scroll', function () {
      
      if (parseInt(el.scrollTop) >= 1000) {
        func().show();
      }else{
        func().hide();
      }
    })
 
  },
//unbind: function(el,binding){
//	el.removeEventListener('scroll',function(){
//		
//	})
//}
});

Vue.directive('click', {
  bind: function (el, binding) {
    el.addEventListener('click',function(){
    	el.scrollTop = binding.value
    })
  },
//unbind: function(el,binding){
//	el.removeEventListener('scroll',function(){
//		
//	})
//}
});

