<template lang="html">
  <div class="mine">
		<header>
			<div class="header_top">
				<i>&#xe665;</i>
				<span>个人中心</span>
				<i>&#xe64b;</i>
			</div>
		</header>
		<section>
			<div class="user_login" v-if="!this.$store.state.isLogin">
				<router-link to="/login" tag='span'>登录</router-link>
				<i class="line"></i>
				<router-link to="/register" tag='span'>注册</router-link>
			</div>
			<div class="user_signin" v-if="this.$store.state.isLogin">
				<div>
					<img src="https://face1.juancdn.com/face/150101/0/0/default_204x204.jpg?iopcmd=thumbnail&amp;type=11&amp;height=80&amp;width=80%7Ciopcmd=convert&amp;Q=88&amp;dst=jpg">
				</div>
				<span>{{this.$store.state.phone}}</span>
				
			</div>
			<div class="user_collect">
				<ul>
					<li>
						<i class="yo-icon">&#xe605;</i>
						<span>商品收藏</span>
					</li>
					<li>
						<i>&#xe676;</i>
						<span>店铺收藏</span>
					</li>
					<li>
						<i>&#xe69d;</i>
						<span>浏览足迹</span>
					</li>
				</ul>
			</div>
			<div class="user_order">
				<div class="order_title">
					<p>我的订单</p>
					<p><span>全部订单</span><i>&#xe6a3;</i></p>
				</div>
				<ul>
					<li>
						<i>&#xe673;</i>
						<span>待付款</span>
					</li>
					<li>
						<i>&#xe69a;</i>
						<span>待成团</span>
					</li>
					<li>
						<i>&#xe671;</i>
						<span>待收货</span>
					</li>
					<li>
						<i>&#xe649;</i>
						<span>待评价</span>
					</li>
					<li>
						<i>&#xe619;</i>
						<span>退款/售后</span>
					</li>
				</ul>
			</div>
			<div class="user_items">
				<ul>
					<li>
						<span>我的拼团</span>
						<i>&#xe6a3;</i>
					</li>
					<li>
						<span>VIP卡</span>
						<i>&#xe6a3;</i>
					</li>
					<li>
						<span>我的免费单</span>
						<i>&#xe6a3;</i>
					</li>
					<li>
						<span>话费充值</span>
						<i>&#xe6a3;</i>
					</li>
					<li>
						<span>借钱</span>
						<i>&#xe6a3;</i>
					</li>
					<li>
						<span>分享赚钱</span>
						<i>&#xe6a3;</i>
					</li>
					<li>
						<span>优惠券</span>
						<i>&#xe6a3;</i>
					</li>
					<li>
						<span>余额·积分</span>
						<i>&#xe6a3;</i>
					</li>
					<li>
						<span>客服中心</span>
						<i>&#xe6a3;</i>
					</li>
				</ul>
			</div>
		</section>
  </div>
</template>

<script type="text/javascript">
  import Index from './index.vue'
  import store from '../../vuex/store'
  export default({
  	data(){
  		return {
  			userID: this.$store.state.phone
  		}
  	},
    components: {
      
    },
    mounted(){
    	this.$store.commit('changeIndex',4)
			console.log(this.$store.state.isLogin)
    }
  })
</script>
<style lang="scss">
	@import '../../styles/yo/usage/core/reset';
	.mine{
		width: 100%;
		@include flexbox();
		@include flex-direction(column);
		/*overflow-y: scroll;*/
		header{
			width: 100%;
			color: #fff;
			/*height: 1.44rem;*/
			background: #ff464e center;
			/*background: url(https://jp.juancdn.com/jpwebapp_v1/images_v1/user/user_center_bg.png);*/
	   
	    background-size: 100% auto;
			
			.header_top{
				width: 100%;
				height: .44rem;
				@include flexbox();
				@include flex-direction(row);
				@include justify-content(space-between);
				@include align-items(center);
				padding: 0 .1rem;
				font-size: .18rem;
				
				i{
					font-family: 'yofont';
				}
			}
		}
		section{
			@include flex();
			width: 100%;
			background: #F4F4F8;
			overflow-y: scroll;
			.user_login{
				width: 100%;
				height: 1rem;
				font-size: .2rem;
				color: #fff;
				@include flexbox();
				@include justify-content(center);
				@include align-items(center);
				background: #ff464e;
				background: url(https://jp.juancdn.com/jpwebapp_v1/images_v1/user/user_center_bg.png) center bottom;
		    background-size: 100% auto;
				span{
					margin: 0 .48rem;
				}
				i{
					width: 0;
					height: .2rem;
					@include border(1px,#fff);
				}
			}
			.user_signin{
				width: 100%;
				height: 1rem;
				font-size: .2rem;
				color: #fff;
				padding: 0 .1rem;
				@include flexbox();
				/*@include justify-content(center);*/
				@include align-items(center);
				background: #ff464e;
				background: url(https://jp.juancdn.com/jpwebapp_v1/images_v1/user/user_center_bg.png) center bottom;
		    background-size: 100% auto;
		    div{
		    	@include border(2px,#eee,50%);
		    	img{
		    		width: .7rem;
		    		@include border-radius(50%);
		    	}
		    }
		  }
			.user_collect{
				width: 100%;
				height: .64rem;
				padding: .12rem 0;
				background: #fff;
				ul{
					width: 100%;
					height: 100%;
					@include flexbox();
					@include flex-direction(row);
					@include justify-content(center);
					@include align-items(center);
					li{
						@include flex();
						height: .4rem;
						@include flexbox();
						@include flex-direction(column);
						@include justify-content(center);
						@include align-items(center);
						color: #999999;
						font-size: .13rem;
						@include border(0 0 0 1px ,#999);
						&:nth-of-type(1){
							@include border(0);
						}
						i{
							font-family: 'yofont';
							font-size: .18rem;
						}
					}
				}
			}
			.user_order{
				width: 100%;
				height: 1.19rem;
				background: #fff;
				margin: .1rem 0;
				padding: 0 .18rem;
				.order_title{
					width: 100%;
					height: .48rem;
					@include border(0 0 1px 0);
					@include flexbox();
					@include flex-direction();
					@include justify-content(space-between);
					@include align-items(center);
					font-size: .15rem;
					i{
						font-family: 'yofont';
					}
				}
				>ul{
					width: 100%;
					@include flexbox();
					@include flex-direction(row);
					@include justify-content(center);
					@include align-items(center);
					padding: .12rem 0;
					li{
						@include flex();
						@include flexbox();
						@include flex-direction(column);
						@include justify-content(center);
						@include align-items(center);
						font-size: .12rem;
						i{
							font-family: 'yofont';
							font-size: .22rem;
						}
					}
				}
			}
			.user_items{
				width: 100%;
				/*height: ;*/
				background: #fff;
				ul{
					width: 100%;
					padding: 0 .18rem;
					li{
						width: 100%;
						height: .48rem;
						@include border(1px 0 0 0);
						@include flexbox();
						@include flex-direction();
						@include justify-content(space-between);
						@include align-items(center);
						font-size: .15rem;
						i{
							font-family: 'yofont';
						}
						&:nth-of-type(1){
							@include border(0);
						}
					}
				}
			}
			
		}
	}
</style>
