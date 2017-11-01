<template lang="html">
	<div class="m-search">
		<div class="header-search">
			<div class="search-input">
				<i>&#xe65c;</i>
				<input type="text" placeholder="鞋包配饰全场2件7折" :value="changekeyword" v-model="keyword" @keyup="showSuggestList" @keyup.enter="doSearch"/>
				<i v-if="keyword!==''" @click="clear">&#xe646;</i>
			</div>
			<i @click="back">取消</i>
		</div>
		<router-view></router-view>
		
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	export default {
		data(){
			return {
				keyword: this.$store.state.search.keyword
			}
		},
		methods:{
			showSuggestList() {
				this.$store.commit('changeKeyword',this.keyword);
				if(this.$store.state.search.keyword !==""){	
					this.$store.dispatch('getSuggest');
					this.$router.push('/suggest');
				}else{
					this.$router.push('/hotsearch');
				}
				
		   	},
		   	clear(){
		   		this.$store.commit('changeKeyword',"");
		   		this.keyword = '';
		   		this.$store.dispatch('getSuggest');
				this.$router.push('/hotsearch');
		   	},
		   	doSearch(){
		   		this.$router.push('/searchlist');
		   	},
		   	back(){
		   		this.$router.push('/');
		   	}
		},
		computed:{
			changekeyword(){
				this.keyword = this.$store.state.search.keyword
			}
		},
		mounted(){

		}
	}
</script>

<style lang="scss">
	@import '../../styles/yo/usage/core/reset';
	.m-search{
		height:100%;
		width:100%;
		@include flexbox();
		@include flex-direction(column);
		position:relative;
		.header-search{
	        width: 100%;
	        height: .44rem;
	        padding: .08rem .11rem;
	        @include border(0 0 1px 0);
	        @include flexbox();
	        line-height:.28rem;
	        .search-input{  
	            width: 100%;  
	            height: .28rem;      
	            @include flex();
	            @include flexbox();
	            margin:0  0.11rem 0 0;
	            border-radius: 5px;
	            background: #f3f3f3;
	            padding:0 .08rem;
	            i{
	            	font-family: 'yofont';
	                font-size: .13rem;
	                line-height: .28rem;
	            }
	            input{
	                @include flex();
	                border: none;
	                background: transparent;
	                padding-left: .08rem;
	                font-size: .13rem;
	            }
	        }
	        i{
	           
	            font-size: .14rem;
	            color: #333;
	        
	        }
	    }
	}
</style>