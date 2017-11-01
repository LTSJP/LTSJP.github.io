<template>
	<div class="goodslist">
		<div class="listtitle">
			<router-link to="/" tag="img" :src="update"></router-link>
		</div>
		<div class="list">
			<ul  v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="10">
				<router-link to="/" tag="li" v-for="(val,i) in goodsList" :key="i" >
					<img v-lazy="val.pic_url"/>
					<p>{{val.coupon_tips}}</p>
					<p>
						<span>{{val.title}}</span>
						<i v-if="val.time_left">{{val.time_left}}</i>
					</p>
					<div class="shop_logo" v-if="val.logo_url">
						<img :src="val.logo_url"/>
					</div>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
	    props: {
	  		update:{
	  			type: String,
	  	  		required: true
	  		},
	    	goodsList: {
	      		type: Array,
	      		required: true
	    	}
	  	},
	  	data(){
	    	return {
		      	goodslist:[],
		      	loading: false
	    	}
	  	},
	    methods:{
		   	
	    	loadMore() {
				  	this.loading = true;
				  	setTimeout(() => {
//				  		this.goodsList = this.goodsList.concat(this.goodsList);
//					  	axios.get('/vip/recommlist-refresh.php')
//							.then((res)=>{
//								const data = res.data.data.goods;
//								this.goodslist = this.goodslist.concat(data);
//							});
//							this.loading = false;
				  	},1500)
				}
   
		},
	  mounted(){
//	  	console.log(this.goodsList)

	  }
	}
</script>

<style lang="scss">
	@import '../../styles/yo/usage/core/reset';
	.goodslist{
        padding-top: .1rem;
        background: #f4f4f8;
        .listtitle{
            width: 100%;
            img{
                width: 100%;
            }
        }
        .list{
            width: 100%;
            margin-top: .02rem;
            ul{
            	display: flex;
            	flex-wrap: wrap;
                li{                                
                    width: 50%;
                    height: 2.445rem;
                    background: #fff;
                    border-bottom: .02rem solid #f4f4f8;
                    position: relative;
                    >img{
                        width: 100%;
                    }
                    p{
                        &:nth-of-type(1){
                            font-size: .12rem;
                            line-height: .12rem;
                            color: #eb5655;
                            padding: .13rem 0 0 .085rem;
                        }
                        &:nth-of-type(2){
                            font-size: .11rem;
                            line-height: .12rem;
                            padding: .115rem .085rem 0;
                            display: flex;
                            span{
                            	flex: 1;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            }
                            i{
                                color: #c5c5c5;
                            }
                        }
                    }
                    .shop_logo{
                        width: .5rem;
                        height: .25rem;
                        top: 1.74rem;
                        left: 1.285rem;
                        background: #fff;
                        z-index: 100;
                        border-bottom: .01rem solid #f4f4f8;
                        position: absolute;
                        img{
                            width: .49rem;
                            height: .24rem;
                        }
                    }
                    &:nth-child(odd){
                        border-right: .01rem solid #f4f4f8;
                    }
                    &:nth-child(even){
                        border-right: .01rem solid #f4f4f8;
                    }
                }
            }
        }
    }
</style>