<template lang="html">
	<div class="suggest">
		<ul>
			<li  v-for="(val,i) in this.$store.state.search.suggestlist.list" :key="i" @click="doSearch(val)" >
				{{val}}
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	import Bus from '../components/Bus.js'
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			doSearch(val){
				this.$store.commit('changeKeyword',val);
				this.$router.push('/searchlist')
			}
		},
		mounted(){
		}
	}
</script>

<style lang="scss">
	@import '../../styles/yo/usage/core/reset';
	.suggest{
		@include flex();
		width:100%;
		background:#f3f3f3;
		ul{
			li{
				height: .54rem;
				line-height: .54rem;
				padding-left: .1rem;
				@include border(0 0 1px 0);
				background:#fff;
			}
		}
	}
</style>