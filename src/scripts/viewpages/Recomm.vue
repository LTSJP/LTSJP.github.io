<template>
	<div class="recomm">
		<!--banner-->
		<div class="banner">
			<mt-swipe :auto="4000">
			  <mt-swipe-item v-for="val in bannerlist">
			  	<router-link to="/adpage" tag="img" :src="val.pic"/></router-link>
			  </mt-swipe-item>
			</mt-swipe>
		</div>
		<div class="module-ad">
			<!--ad-nav-->
			<div class="ad-nav">
				<ul>
					<router-link to="/adpage" tag="li" v-for="(val,i) in blocklist" :key="i">
						<img :src="val.pic"/>
					</router-link>
				</ul>
			</div>
			
			<div class="adcenter">
				
				<router-link to="/adpage" tag="img" :src="adImg"></router-link>
			</div>
			<!--限时抢购-->
			<div class="timelimitedbuy">
				<div class="timelimitedbuy-left">
					<router-link to="/adpage" tag="img" :src="timelimitedbuy_img1"></router-link>
				</div>
				<div class="timelimitedbuy-right">
					<router-link to="/adpage" tag="img" :src="timelimitedbuy_img2"></router-link>
					<div class="timelimitedbuy-right-bottom">
						<router-link to="/adpage" tag="img" :src="timelimitedbuy_img3"></router-link>
						<router-link to="/adpage" tag="img" :src="timelimitedbuy_img4"></router-link>
					</div>
				</div>
			</div>
			<!--top榜-->
			<div class="ad-bottom">
				
			</div>
		</div>
		<!--商品列表-->
		<GoodsList :goodsList="'recommlist'" :upDate="update"></GoodsList>
		<!--分类-->
		<div class="sort">
			<ul>
				<router-link to="/adpage" tag="li" v-for="(val,i) in sortlist" :key="i">{{val}}</router-link>
			</ul>
		</div>
		<!--商品列表2-->
		<GoodsList :goodsList="'recommlist'" :upDate="update"></GoodsList>
	</div>
</template>

<script>
	import '../assets/iconfont/iconfont.ttf'
	import '../assets/iconfont/iconfont.woff'
	import axios from 'axios'
	import Vue from 'vue'
	
	import GoodsList from '../components/GoodsList.vue'

	import { Swipe, SwipeItem ,Lazyload} from 'mint-ui';
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	Vue.use(Lazyload);
	
	export default{
		data(){
			return {
				bannerlist: [],
				blocklist:[],
				adImg: '',
				timelimitedbuy:{},
				timelimitedbuy_img1: '',
				timelimitedbuy_img2: '',
				timelimitedbuy_img3: '',
				timelimitedbuy_img4: '',
				update: '',
				goodslist: [],
				sortlist: ["打底裤","居家拖鞋","打底裤袜","蔬菜罐头","生鲜蔬果","袜子","保暖内衣","打底衫"]
			}
		},
		components:{
			
			GoodsList
		},
		mounted(){
			axios.get('/vip/recommend.php')
				.then((res)=>{
					this.bannerlist = res.data.data.slide_ads.config.slide;
					this.blocklist = res.data.data.block[0].multi_block[0].data[0].child;
					this.adImg = res.data.data.block[0].multi_block[1].data[0].child[0].pic;
					this.timelimitedbuy = res.data.data.block[0].multi_block[2];
					this.timelimitedbuy_img1 = this.timelimitedbuy.data[0].child[0].pic;
					this.timelimitedbuy_img2 = this.timelimitedbuy.data[1].child[0].pic;
					this.timelimitedbuy_img3 = this.timelimitedbuy.data[1].child[1].pic;
					this.timelimitedbuy_img4 = this.timelimitedbuy.data[1].child[2].pic;
					this.update = res.data.data.block[0].multi_block[3].data[0].child[0].pic;
				});
			axios.get('/vip/recommlist.php')
				.then((res)=>{
					this.goodslist = res.data.data.goods;
				});
		}
	}
</script>

<style lang="scss">
	@import '../styles/yo/usage/core/reset';
	
	.recomm{
	    width: 100%;
	    .banner{
	        width: 100%;
	        height: 1.46rem;
	        img{
	            width: 100%;
	        }  
	    }
	    .module-ad{
	        width: 100%;
	        .ad-nav{
	            width: 100%;
	            ul{
	                width: 100%;                            
	                @include flexbox();
	                li{
	                    @include flex();
	                    img{
	                        width: 100%;
	                    }
	                }
	            }
	        }
	        .adcenter{
	            width: 100%;
	            img{
	                width: 100%;
	            }
	        }
	        .timelimitedbuy{
	            width: 100%;
	            @include flexbox();
	            .timelimitedbuy-left{
	                @include border(0 1px 0 0,#ebebeb);
	                img{
	                    width: 1.5rem;
	                }
	            }
	            .timelimitedbuy-right{
	                @include flex();
	                @include flexbox();
	                @include flex-direction(column);
	                img{
	                    &:first-child{
	                        width: 100%;
	                        
	                    }
	                }
	                .timelimitedbuy-right-bottom{
	                    @include flex();
	                    width: 100%;
	                    @include flexbox();
	                    @include border(1px 0 0 0,#ebebeb);
	                    img{
	                        @include flex();
	                        height: 1.16rem;
	                    }
	                }
	            }
	        }
	    }
	    .sort{
	        width: 100%;
	        padding: .04rem .07rem .06rem;
	        
	        ul{
	            width: 100%;
	            @include flexbox();
	            @include flex-wrap(wrap);
	            li{
	                width: 22%;
	                height: .3rem;
	                line-height: .3rem;
	                text-align: center;
	                margin: .1rem .05rem 0;
	                background: #fff;
	                white-space: nowrap;
	                @include border-radius(50px);
	            }
	        }
	    }
	}
</style>