<template lang="html">
	<div class="hot-search">
		<div class="search-hot">			
			<p>热搜</p>
			<ul>
				<li v-for="(val,i) in hotsearch" :key="i" :class="{red: val.is_red==='1'}" @click="doSearch(val.text)">{{val.text}}</li>

			</ul>
		</div>
		<div class="search-history">
			<p><span>搜索历史</span><i>&#xe6b4;</i></p>
			
		</div>
	</div>
</template>

<script>
	import '../../assets/iconfont/iconfont.ttf'
	import '../../assets/iconfont/iconfont.woff'
	import Vue from 'vue'
	import axios from 'axios'
	export default{
		data(){
			return {
				hotsearch: []
			}
		},
		mounted(){
			axios.get("/vip/hotsearch.php").then((res)=>{
				this.hotsearch = res.data.data.hot_keywords;
			});
		},
		methods:{
			doSearch(val){
				this.$store.commit('changeKeyword',val);
				this.$router.push('/searchlist')
			}
		}
	}
</script>

<style lang="scss">
	@import '../../styles/yo/usage/core/reset';
	.hot-search{
		width:100%;
		padding:.14rem .11rem 0;
		.search-hot{
			>p{
				color: #666;
			}
			ul{
				width: 100%;
				@include flexbox();
				@include flex-wrap(wrap);
				li{
					white-space: nowrap;
					height: .2rem;
					padding: 0 .1rem;
					background: #f4f4f4;
					font-size: .12rem;
					line-height: .2rem;
					margin: .08rem .1rem 0 0;
					@include border-radius(5px);
					color: #666;
					&.red{
						color: #ff464e;
					}
				}
			}
		}
		.search-history{
			padding-top: .1rem;
			>p{
				@include flexbox();
				@include justify-content(space-between);
				color: #666;
				i{
					font-family: 'yofont';
				}
			}
			ul{
				width: 100%;
				@include flexbox();
				@include flex-wrap(wrap);
				li{
					white-space: nowrap;
					height: .2rem;
					padding: 0 .1rem;
					background: #f4f4f4;
					font-size: .12rem;
					line-height: .2rem;
					margin: .08rem .1rem 0 0;
					@include border-radius(5px);
					color: #666;
					&.red{
						color: red;
					}
				}
			}
		}
	}
</style>