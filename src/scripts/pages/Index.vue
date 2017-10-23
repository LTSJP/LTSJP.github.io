<template lang="html">
	<div class="m-index">
		<div class="m-nr">
			<router-view></router-view>
		</div>
		<footer>footer</footer>
	</div>
</template>

<script>
	import '../../assets/iconfont/iconfont.ttf'
	import '../../assets/iconfont/iconfont.woff'
	import VueRouter from 'vue-router'
	export default{
		data(){
			return {
				
			}
		}
	}
</script>

<style>
	/*scoped表示样式只在该页面引用*/
</style>