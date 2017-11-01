<template lang="html">
		<div class="recommend">
			<header>
				<div class="search">				
					<router-link to="/sort" tag="i">&#xe665;</router-link>
					<div class="search-input">
						<i>&#xe65c;</i>
						<span class="logo">卷皮</span>
						<router-link to="/search" tag="input" type="text" placeholder="秋季Top榜6.9元起"></router-link>
					</div>
					<router-link to="/sort" tag="i">&#xe7e8;</router-link>
				</div>
				<div class="navbar-header">
					<ul>
						<router-link to="/recomm" tag="li">推荐</router-link>
						<router-link to="/women" tag="li">女装</router-link>
						<router-link to="/shoes" tag="li">鞋包</router-link>
						<router-link to="/stayhome" tag="li">居家</router-link>
						<router-link to="/baby" tag="li">母婴</router-link>
						<router-link to="/digital" tag="li">家电数码</router-link>
						<router-link to="/man" tag="li">男士</router-link>
						<router-link to="/beauty" tag="li">美妆</router-link>
						<router-link to="/deliciousFood" tag="li">美食</router-link>
						<router-link to="/globalShop" tag="li">全球购</router-link>
						<router-link to="/ornament" tag="li">精品配饰</router-link>
						<router-link to="/upcoming" tag="li">即将上线</router-link>
					</ul>
				</div>
			</header>
			<section >
				<router-view></router-view>
			</section>
			<!--<BackToTop  v-show="isShowBackToTop" :bottomDis="'.54rem'"></BackToTop>-->
		</div>
</template>

<script>
	import '../../assets/iconfont/iconfont.ttf'
	import '../../assets/iconfont/iconfont.woff'
	import store from '../../vuex/store'
	import BackToTop from '../components/BackToTop.vue'
	export default{
		data(){
			return {
				isShowBackToTop: false,
				backtotop: 0
			}
		},
		components:{
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
					}
				}
			}
		},
		mounted(){
			this.$store.commit('changeIndex',0)
			
		}
	}
</script>

<style lang="scss">
	/*scoped表示样式只在该页面引用*/
	@import '../../styles/yo/usage/core/reset';
	.recommend{
        @include flex();
        height: 100%;
        width: 100%;
        @include flexbox();
        @include flex-direction(column);
		header{
		    width: 100%;
		    padding-top: .08rem;
		    @include border(0 0 1px 0,#ebebeb);
		    .search{
		        width: 100%;
		        height: .28rem;
		        padding: 0 .11rem;
		        @include flexbox();
		        .search-input{  
		            width: 100%;  
		            height: .28rem;
		            line-height: .28rem;        
		            @include flex();
		            @include flexbox();
		            margin:0  0.11rem ;
		            border-radius: 5px;
		            background: #f3f3f3;
		            padding-left: .08rem;
		            i{
		                font-size: .13rem;
		            }
		            .logo{
		                font-size: .16rem;
		                font-weight: bold;
		                font-family: "黑体";
		                color: #eb5655;
		                margin-left: .08rem;
		            }
		            input{
		                @include flex();
		                border: none;
		                background: transparent;
		                padding-left: .08rem;
		                font-size: .13rem;
		            }
		        }
		        i{
		            font-family: 'yofont';
		            font-size: .21rem;
		            color: #666666;
		            font-weight: bold;
		        }
		    }
		    .navbar-header{
		        padding-top: .21rem;
		        ul{
		            height: .26rem;
		            padding-left: .07rem;
		            @include flexbox();
		            overflow-x: scroll;
		            li{
		                white-space: nowrap;
		                margin-left: .2rem;
		                padding: 0 .03rem;
		                font-size: .13rem;
		                &:first-child{
		                    margin-left: 0;
		                }
		                &.active{
		                    color: #eb5655;
		                    @include border(0 0 3px 0, #eb5655, solid, null);
		                    
		                }
		                &:last-child{
		                    margin-right: .07rem;
		                }
		            }
		        }
		    }
		}
        section{
            @include flex();
            width: 100%;
            
            @include flexbox();
            @include flex-direction(column);
            overflow-y: scroll;
            background: #F4F4F8;

        }
    }
</style>