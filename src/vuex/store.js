import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search' 

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tabIndex: 0,
    goods_id: 0,
    phone: '',
    psw: '',
    isLogin: false,
    prod: [],
    judge: []
  },
  modules:{
  	search
  },
  mutations: {
    changeIndex(state,playload) {
      state.tabIndex = playload
    },
    savePhone(state,playload) {
      state.phone = playload
    },
    savePsw(state,playload) {
      state.psw = playload
    },
    changeLoginState(state,payload){
    	state.isLogin = payload;
    },
    addtocart(state,playload){
      state.prod.push(playload)
    },
    chandeJudge(state,arr){
    	state.judge = [];
      state.prod.forEach(function(item,index){
        state.judge.push(index)
      })
    }
  }
})

export default store
