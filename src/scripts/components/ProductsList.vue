<template>
	<div class="productslist" >
		<ul  >
			<router-link :to="{name: 'detail', params: { id: val.goods_id}}" tag="li"  v-for="(val,i) in productsList" >
				<dl>
					<dt>
						<img v-lazy="val.pic_url"/>
						<div class="corner" v-if="val.corner"><img :src="val.corner"/></div>
						<span class="inventory_status" v-if="val.status_txt">{{val.status_txt}}</span>
					</dt>
					<dd>
						<div class="price">							
							<span class="cprice"><i>¥</i>{{val.cprice}}</span>
							<span class="oprice">¥{{val.oprice}}</span>
						</div>
						<span class="time_left" v-if="val.time_left">{{val.time_left}}</span>
					</dd>
					<dd>
						<i v-if="val.delivery_name" class="delivery_name">{{val.delivery_name}}</i>
						<span>{{val.title}}</span>
					</dd>
				</dl>
			</router-link>
		</ul>
		<div class="yo-loading yo-loading-a loadmore" v-if="isShowloading">
		  	<i class="yo-ico"></i>
		    <div class="text">加载中...</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	import { Lazyload ,InfiniteScroll} from 'mint-ui';
	Vue.use(Lazyload);
	Vue.use(InfiniteScroll);
	export default{
		props:{
			productsList: {
	      		type: Array,
	      		required: true
	    	},
	    	isShowloading: {
	      		type: Boolean,
	      		required: true
	    	}
		},
		data(){
			return {
				loading: false,
				productslist:[],
				page:1,
			}
		},
		watch:{
			
		},
		methods:{			
			loadMore() {
			  	this.loading = true;
			  	this.page++;
			  	console.log(this.page)
			  	setTimeout(() => {
					axios.get(`/api/goods/search?apisign=e072ebf2d08413a66563d45383d23128&app_name=zhe&app_version=4.6.0&attr_id=&cat_threeids=&filter_id=&info=1&item=all&keyword=${this.$store.state.search.keyword}&msort=0&page=${this.page}&platform=Android&price_range=&searchsortab=searchsortab_130_430_searchSortFactor%7Clog&sxsx=&utm=101225`)
					.then((res)=>{
						this.productslist = res.data.data.goods;
//						this.sortData = res.data.data.aggs.cat_threeid;
						
					});
			    
			    this.loading = false;
			  }, 2500);
			  this.productsList = this.productsList.concat(this.productslist)
			 	console.log(this.productsList)
			 	
			}
			
		},
		computed:{
			load(){
//				this.productsList = this.productslist;
			}
		},
		mounted(){
		}
	}
</script>

<style lang="scss">
	@import '../../styles/yo/usage/core/reset';
	@import "../../styles/yo/usage/component/loading.scss";
	.productslist{
		@include flex();
		width: 100%;
		/*height: 100%;*/
		@include border(8px 0 0 0, #f4f4f8);
		ul{
			@include flexbox();
			@include flex-direction(row);
			@include flex-wrap(wrap);
			li{
				width: 50%;
				height: 2.44rem;
				background: #fff;
				&:nth-child(odd){
					@include border(0 1px 2px 0,#f4f4f8);
				}
				&:nth-child(even){
					@include border(0 0 2px 1px,#f4f4f8);
				}
				dl{
					width: 100%;
					height: 100%;
					dt{
						position:relative;
						>img{
							width: 100%;
						}
						.corner{
							position: absolute;
							top: 0;
							img{
								width: .4rem;
								
							}
						}
						.inventory_status{
							background: rgba(0 ,0, 0, 0.5);
							padding: .02rem;
							color: #fff;
							font-size: .1rem;
							position:absolute;
							bottom: 0;
							left: 0;
						}
					}
					dd{
						padding: 0 .08rem;
						&:nth-of-type(1){
							height: .24rem;
							margin-top: .06rem;
							@include flexbox();
							@include flex-direction();
							@include justify-content(space-between);
							@include align-items(center);
							.price{								
								.cprice{
									font-size: .15rem;
									color: #ff464e;
								}
								.oprice{
									font-size: .11rem;
									color: #bbb;
									text-decoration: line-through;
								}
							}
							.time_left{
								font-size: .11rem;
								color: #bbb;
							}
							
						}
						&:nth-of-type(2){
							width: 100%;
							height: .2rem;
							line-height: .2rem;
							font-size: .12rem;
							@include flexbox();
							@include flex-direction();
							>span{
								width: 100%;
								white-space: nowrap;
								text-overflow: ellipsis;
								overflow: hidden;
							}
							.delivery_name{
								height: .2rem;
								line-height: .2rem;
								margin-right: .04rem;
								padding: 0 .02rem;
								white-space: nowrap;
								display: block;
								color: #ff464e;
								font-size: .1rem;
								@include border(1px,#ff464e);
								@include border-radius(20%);
							}
						}
					}
				}
			}
		}
	}
</style>