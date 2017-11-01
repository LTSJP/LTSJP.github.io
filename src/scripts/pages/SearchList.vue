<template lang="html">
	<div class="searchlist">
		<div class="header">
			<i @click="back">&#xe679;</i>
			<div class="search-input">
				<i>&#xe65c;</i>
				<input type="text" placeholder="鞋包配饰全场2件7折" :value="changekeyword" v-model="keyword"  @click="gotoSuggestList" :key="keyword"/>
				<i v-if="keyword!==''" @click="clear">&#xe646;</i>
			</div>
			<i>&#xe6a5;</i>
		</div>
		<div class="list" v-scroll="handle" v-click="backtotop">
			<div class="listheader">
				<ul>
					<li :class="{active: index===0}" class="all" @click="changecolor_all" >
						<span>推荐</span>
					</li>
					<li :class="{active: index===1}" class="price" @click="changecolor_price">
						<span>价格</span>
						<div class="arrows">
							<i :class="{red: direction==='up'}">&#xe79c;</i>
							<i :class="{red: direction==='down'}">&#xe79b;</i>
						</div>
					</li>
					<li :class="{active: index===2}" class="sales" @click="changecolor_sales">
						<span>销量</span>
					</li>
					<li :class="{active: index===3}" class="screen" @click="changecolor_screen">
						<span>筛选</span>
						<i>&#xe69c;</i>
					</li>
				</ul>
				<mt-popup class="popright" v-model="popupVisible" popup-transition="popup-fade" position="right">
				  	<div class="filter">
				  		<p>筛选</p>
				  		<div class="filter-con">
				  			<span :class="{active:selData.filterid_zf == 1}" @click="filter_zf(selData.filterid_zf)">仅看直发</span>
				  			<span :class="{active:selData.filterid_yx == 2}" @click="filter_yx(selData.filterid_yx)">仅看优选</span>
				  		</div>
				  	</div>
				  	<div class="priceSpace">
				  		<p>价格区间(元)</p>
				  		<div class="priceInput">
				  			<input type="number" placeholder="最低价" v-model="selData.min"/>
				  			<span class="line">—</span>
				  			<input type="number" placeholder="最高价" v-model="selData.max" />
				  		</div>
				  	</div>
				  	<div class="sort">
				  		<div class="sortHeader">
				  			<span>分类</span>
				  			<span  @click="toShowMore"><b>更多</b><i ></i></span>
				  		</div>
				  		<div class="sortlist">
				  			<ul :class="{show:selData.isShow}">
				  				<li v-for="(val,i) in sortData" :class="{selected:selData.isSelected===val.id}" @click="toSelect(val.id)" >
				  					{{val.name}}
				  				</li>
				  			</ul>
				  		</div>
				  	</div>
				  	<div class="bottomBtn">
				  		<button class="reset" @click="reset">重置</button>
				  		<button class="confirm" @click="confirm">确定</button>
				  	</div>
				</mt-popup>
			</div>
			<!--list-->
			<div class="a" v-infinite-scroll="loadMore"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="30">
				<ProductsList v-if="productslist" :productsList="productslist" :isShowloading="isShowLoading"></ProductsList>
				
			</div>
			<BackToTop v-show="isShowBackToTop" @backtotop='backtotop'></BackToTop>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import axios from 'axios'
	import ProductsList from '../components/ProductsList.vue'
	import { Popup,Loadmore } from 'mint-ui';
	Vue.component(Popup.name, Popup);
	Vue.component(Loadmore.name, Loadmore);
	import BackToTop from '../components/BackToTop.vue'
	export default {
		data(){
			return {
				keyword: this.$store.state.search.keyword,
				isRed: false,
				index: 0,
				direction: '',
				productslist:[],
				popupVisible:false,
				sortData:[],
				selData:{
					filterid_zf: '',
					filterid_yx: '',
					min: '',
					max: '',
					isSelected: -1,
					cat_threeids: '',
					isShow: false,
					filterid: '',
					split_price: '',
					split_filter: ''
				},
				loading: false,
				page: 1,
				list: [],
				isShowLoading: false,
				isShowBackToTop: false,
				isBackToTop: false,
				backtotop: 0
			}
		},
		components:{
			ProductsList,
			BackToTop
		},
		methods:{
			handle(){
				var self = this;
				return {
					show: function(){
						self.isShowBackToTop = true;
					},
					hide: function(){
						self.isShowBackToTop = false;
					},
					toTop: self.isBackToTop
				}
			},
			gotoSuggestList() {
				this.$router.push('/suggest');
		   	},
		   	clear(){
		   		this.$store.commit('changeKeyword',"");
		   		this.keyword = '';
		   		this.$store.dispatch('getSuggest');
				this.$router.push('/hotsearch');
		   	},
		   	back(){
		   		this.$router.back(-1)
		   	},
		   	changecolor_all(){
		   		this.index = 0;
		   		this.direction = '';
		   		this.productslist = this.productslist.sort((x,y)=>{
					return Math.random()>0.5
				});
		   	},
		   	changecolor_price(){
		   		this.index = 1;
		   		if(this.direction == 'up'){
		   			this.direction = 'down';
		   			this.productslist = this.productslist.sort((x,y)=>{
						return y.cprice - x.cprice
					});
		   		}else{
		   			this.direction = 'up'
		   			this.productslist = this.productslist.sort((x,y)=>{
						return x.cprice - y.cprice
					});
		   		}
		   	},
		   	changecolor_sales(){
		   		this.index = 2;
		   		this.direction = '';
		   		this.productslist = this.productslist.sort((x,y)=>{
					return Math.random()>0.5
				});
		   	},
		   	changecolor_screen(){
		   		this.direction = '';
		   		this.popupVisible = true;
		   	},
			filter_zf(){
				if(this.selData.filterid_zf == 1){
					this.selData.filterid_zf = '';
				}else{					
					this.selData.filterid_zf = 1;
				}
			},
			filter_yx(){
				if(this.selData.filterid_yx == 2){
					this.selData.filterid_yx = '';
				}else{					
					this.selData.filterid_yx = 2;
				}
			},
			toShowMore(){
				if(this.selData.isShow){
					this.selData.isShow = false;
				}else{
					this.selData.isShow = true;
				}
			},
			toSelect(i){
				if(this.selData.isSelected !== i){
					this.selData.isSelected = i;
					this.selData.cat_threeids = i;
				}else if(this.selData.isSelected == i){
					this.selData.isSelected = -1;
					this.selData.cat_threeids = '';
				}
				console.log(this.selData.cat_threeids)
			},
			reset(){
				this.selData.filterid_zf = '';
				this.selData.filterid_yx = '';
				this.selData.isShow = false;
				this.selData.isSelected = -1;
				this.selData.min = '';
				this.selData.max = '';
			},
			confirm(){
				if(this.selData.min!=''||this.selData.max!=''){
					this.selData.split_price = ','
				}
				if(this.selData.filterid_zf!=''||this.selData.filterid_yx!=''){
					this.selData.split_filter = ','
				}
				axios.get(`/api/goods/search?apisign=e072ebf2d08413a66563d45383d23128&app_name=zhe&app_version=4.6.0&attr_id=&cat_threeids=${this.selData.cat_threeids}&filter_id=${this.selData.filterid_zf}${this.selData.split_filter}${this.selData.filterid_yx}&info=1&item=all&keyword=${this.$store.state.search.keyword}&msort=0&page=1&platform=Android&price_range=${this.selData.min}${this.selData.split_price}${this.selData.max}&searchsortab=searchsortab_130_430_searchSortFactor%7Clog&sxsx=&utm=101225`)
				.then((res)=>{
					this.productslist = res.data.data.goods;
				});
				this.popupVisible = false;
//				this.reset();
				if(this.index == 1){					
					this.direction = 'up';
				}
			},
			
			handleScroll(){
				var scrollTop = document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop;
				console.log(1)
			},
			loadMore() {
			  	this.isShowLoading = true;
			  	setTimeout(() => {
					axios.get(`/api/goods/search?apisign=e072ebf2d08413a66563d45383d23128&app_name=zhe&app_version=4.6.0&attr_id=&cat_threeids=${this.selData.cat_threeids}&filter_id=${this.selData.filterid_zf}${this.selData.split_filter}${this.selData.filterid_yx}&info=1&item=all&keyword=${this.$store.state.search.keyword}&msort=0&page=${this.page++}&platform=Android&price_range=${this.selData.min}${this.selData.split_price}${this.selData.max}&searchsortab=searchsortab_130_430_searchSortFactor%7Clog&sxsx=&utm=101225`)
					.then((res)=>{
						this.list = res.data.data.goods;
						this.isShowLoading = false;
					});
			  }, 2500);
			  this.productslist = this.productslist.concat(this.list);			 	
			}
		},
		computed:{
			changekeyword(){
				this.keyword = this.$store.state.search.keyword
			},
		},
		mounted(){
			axios.get(`/api/goods/search?apisign=e072ebf2d08413a66563d45383d23128&app_name=zhe&app_version=4.6.0&attr_id=&cat_threeids=&filter_id=${this.selData.filterid_zf}${this.selData.split_filter}${this.selData.filterid_yx}&info=1&item=all&keyword=${this.$store.state.search.keyword}&msort=0&page=${this.page}&platform=Android&price_range=&searchsortab=searchsortab_130_430_searchSortFactor%7Clog&sxsx=&utm=101225`)
			.then((res)=>{
				this.productslist = res.data.data.goods;
				this.sortData = res.data.data.aggs.cat_threeid;
				this.isShowLoading = false;
				console.log(res.data.data)
			});
			this.$nextTick(function () {  
     			window.addEventListener('scroll', this.handleScroll);  //滚动事件监听  
//   			console.log(window.pageYOffset)
      		});  
    		
		}
		
	}
</script>

<style lang="scss">
	@import '../../styles/yo/usage/core/reset';
	@import "../../styles/yo/usage/component/loading.scss";
	.searchlist{
		width: 100%;
		height: 100%;
		@include flexbox();
		@include flex-direction(column);
		.header{
			width: 100%;
	        height: .44rem;
	        padding: .08rem .11rem;
	        @include flexbox();
	        @include flex-direction(row);
	        @include border(0 0 1px 0);
	        /*line-height:.28rem;*/
	        .search-input{  
	            width: 100%;  
	            height: .28rem;      
	            @include flex();
	            @include flexbox();
	            margin:0  0.11rem;
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
			>i{
				font-family: 'yofont';
				font-size: .18rem;
			}
		}
		.list{
			@include flex();
			width: 100%;
			overflow-y: scroll;
			@include flexbox();
			@include flex-direction(column);
			.listheader{
				padding: .1rem 0;
				>ul{
					width:100%;
					height: .3rem;
					@include flexbox();
					@include flex-direction(row);
					@include align-items(center);
					li{
						@include flex();
						text-align: center;
						@include flexbox();
						@include flex-direction(row);
						@include justify-content(center);
						
						font-size:.14rem;
						i{
							font-family: 'yofont';
							
						}
						&:nth-child(2){
							.arrows{
								@include flexbox();
								@include flex-direction(column);
								@include justify-content(center);
								
								i{
									font-size: .1rem;
									line-height: .1rem;
									transform: scale(0.7);
									margin-top: -3px;
									&.red{
										color: #ff464e;
									}
								}
							}
						}
						&.active{
							span{								
								color: #ff464e;
							}
						}
					}
				}
			}
			
			.mint-popup{
				width: 3.22rem;
				height: 100%;
				font-family: '微软雅黑';
				padding: .32rem .16rem 0;
				font-size: .14rem;
				.filter{
					margin-bottom: .34rem;
					p{
						height: .18rem;
						margin-bottom: .18rem;
						font-size: .16rem;
					}
					.filter-con{
						@include flexbox();
						@include flex-direction();
						span{							
							width: 1.07rem;
							height: .34rem;
							line-height: .34rem;
							text-align: center;
							background: #f4f4f8;
							margin-right: .14rem;
							@include border-radius(3px);
							&.active{
								background: #fff;
								@include border(1px,#ff464e);
								color: #ff464e;
							}
						}
					}
				}
				.priceSpace{
					line-height: .28rem;
					margin-bottom: .36rem;
					p{
						font-size: .16rem;
						margin-bottom: .16rem;
					}
					.priceInput{
						@include flexbox();
						@include flex-direction();
						input{
							width: 1.22rem;
							height: .28rem;
							padding-left: .1rem;
							border: none;
							background: #f4f4f8;
							@include border-radius(3px);
						}
						.line{
							margin: 0 .1rem;
							color: #999;
						}
					}
				}
				.sort{
					.sortHeader{
						margin-bottom: .04rem;
						font-size: .16rem;
						@include flexbox();
						@include flex-direction();
						@include justify-content(space-between);
					}
					.sortlist{
						width: 100%;
						>ul{
							width: 100%;
							height: 1.28rem;
							overflow: hidden;
							@include flexbox();
							@include flex-wrap(wrap);
							&.show{
								overflow: visible;
							}
							li{
								width: .84rem;
								height: .28rem;
								line-height: .28rem;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								text-align: center;
								background: #f4f4f8;
								margin: .12rem .14rem 0 0;
								&:nth-of-type(3n){
									margin-right: 0;
								}
								&.selected{
									width: .84rem;
									height: .28rem;
									background: transparent;
									@include border(1px,#ff464e);
									color: #ff464e;
								}
							}
							
						}
					}
				}
				.bottomBtn{
					position: absolute;
					left: 0;
					bottom: 0;
					height: .44rem;
					width: 100%;
					@include flexbox();
					@include flex-direction();
					.reset,.confirm{
						@include flex();
						height: 100%;
						@include border(1px 0 0 0);
						border: none;
						background: #fff;
					}
					.confirm{
						color:#fff;
						background: red;
					}
				}
			}
			
		}
	}
</style>