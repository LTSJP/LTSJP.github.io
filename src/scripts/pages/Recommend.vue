<template lang="html">
	<!--<Index>-->
		<div class="recommend">
			<header>
				<div class="search">				
					<i>&#xe665;</i>
					<div class="search-input">
						<i>&#xe65c;</i>
						<span class="logo">卷皮</span>
						<input type="text" placeholder="秋季Top榜6.9元起"/>
					</div>
					<i>&#xe7e8;</i>
				</div>
				<div class="navbar-header">
					<ul>
						<router-link to="/recomm" tag="li">推荐</router-link>
						<router-link to="/women" tag="li">女装</router-link>
						<router-link to="/shoes" tag="li">鞋包</router-link>
						<router-link to="/globalShop" tag="li">居家</router-link>
						<router-link to="/globalShop" tag="li">母婴</router-link>
						<router-link to="/globalShop" tag="li">家电数码</router-link>
						<router-link to="/globalShop" tag="li">男士</router-link>
						<router-link to="/globalShop" tag="li">美妆</router-link>
						<router-link to="/globalShop" tag="li">美食</router-link>
						<router-link to="/globalShop" tag="li">全球购</router-link>
						<router-link to="/globalShop" tag="li">精品配饰</router-link>
						<router-link to="/globalShop" tag="li">即将上线</router-link>
					</ul>
				</div>
			</header>
			<section>
				<router-view></router-view>
			</section>
		
		</div>
	<!--</Index>-->
</template>

<script>
	import '../assets/iconfont/iconfont.ttf'
	import '../assets/iconfont/iconfont.woff'
	import axios from 'axios'
	import Vue from 'vue'
	import Index from './Index.vue'
	import mHeader from './Header.vue'	
	import GoodsList from '../components/GoodsList.vue'

	import { Swipe, SwipeItem ,Lazyload} from 'mint-ui';
	Vue.component(Swipe.name, Swipe);
	Vue.component(SwipeItem.name, SwipeItem);
	
//	import { Lazyload } from 'mint-ui';
	Vue.use(Lazyload);
	
	export default{
		data(){
			return {
				bannerlist: [],
				blocklist:[],
				adImg: '',
				timelimitedbuy:{},
				update: '',
				goodslist: [],
				sortlist: ["打底裤","居家拖鞋","打底裤袜","蔬菜罐头","生鲜蔬果","袜子","保暖内衣","打底衫"]
			}
		},
		components:{
			Index,
			GoodsList
		},
		mounted(){
			axios.get('/vip/recommend.php')
				.then((res)=>{
					this.bannerlist = res.data.data.slide_ads.config.slide;
					this.blocklist = res.data.data.block[0].multi_block[0].data[0].child;
					this.adImg = res.data.data.block[0].multi_block[1].data[0].child[0].pic;
					this.timelimitedbuy = res.data.data.block[0].multi_block[2];
					console.log()
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
	/*scoped表示样式只在该页面引用*/
</style>