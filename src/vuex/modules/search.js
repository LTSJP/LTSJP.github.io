
import axios from 'axios'

const state = {
	keyword: '',
	suggestlist: {}
}

const actions = {
	getSuggest({commit}){
		axios.get(`/api/goods/search/suggest?keyword=${state.keyword}`)
			.then((res)=>{
				commit('changeSuggest',res.data.data);
			});
	}
}

const mutations = {
	changeKeyword(state,payload){
		state.keyword = payload;
	},
	changeSuggest(state,payload){
		state.suggestlist = payload;
	}
}


export default{
	state,
	actions,
	mutations
}


