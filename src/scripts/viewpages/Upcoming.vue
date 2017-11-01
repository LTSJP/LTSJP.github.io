<template>
	<div class="upcoming">
		<GoodsList :goodsList="goodslist" :update="ad" ></GoodsList>
	</div>
</template>

<script>
	import GoodsList from '../components/GoodsList.vue'
	import axios from 'axios'
	export default({
    data(){
      return{
        goodslist: [],
        ad:''
      }
    },
    components: {
      GoodsList
    },
    mounted(){
      axios.get('./vip/womengoods.php')
        .then((res)=>{
          this.goodslist = res.data.data.goods
        })
    }
  })
</script>

<style lang="scss">
	.upcoming{
		.goodslist{
			padding-top:0;
			.listtitle{
				display: none;
			}
		}
	}
</style>