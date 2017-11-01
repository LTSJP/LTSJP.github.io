<template>
	<div>
		404错误
		
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		data(){
			return {
				data: ''
			}
		},
		mounted(){
			axios.get('http://localhost:4000').then((res)=>{
				console.log(res)
			})
		}
	}
</script>

<style>
</style>