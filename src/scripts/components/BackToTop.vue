<template>
	<div class="backToTop" :style="{bottom:bottomDis}"  @click="backtoTop">
		<i>&#xe69e;</i>
		<span>顶部</span>
	</div>
</template>

<script>
	export default{
		props:{
			bottomDis:{
				type: String,
				required: false
			}
		},
		data(){
			return {
				isBackToTop: false
			}
		},
		methods:{
			backtoTop(){
				
			}
		}
	}
</script>

<style lang="scss">
	@import '../../styles/yo/usage/core/reset';
	.backToTop{
		width: 46px;
		height: 46px;
		@include border-radius(50%);
		@include flexbox();
		@include flex-direction(column);
		@include border(2px,#ddd,solid,50%);
		@include justify-content(center);
		@include align-items(center);
		background: #fff;
		position: fixed;
		bottom: .15rem;
		right: .15rem;
		z-index:100;
		i{
			font-family: 'yofont';
			font-size: 16px;
		}
		span{
			font-size: 12px;
		}
	}
</style>