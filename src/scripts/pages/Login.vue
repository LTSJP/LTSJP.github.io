<template>
	<div class="login">
		<header>
			<router-link to='/mine' tag='i'>&#xe646;</router-link>
			<router-link to='/register' tag='span'>没有账号?注册</router-link>
		</header>
		<section>
			<div class="remind">
				<p>登录</p>
				<p>请保持你的手机通畅</p>
			</div>
			<div class="login_input">
				<div class="phone">
					<input type="number" placeholder="请输入手机号" v-model="phone" />
					<i @click="clear_phone" v-show="phone!==''">&#xe646;</i>
				</div>
				<div class="password">
					<input :type="type"  placeholder="请输入密码" v-model="psw" />
					<div>						
						<i @click="see_psw" v-if="!isSee" class="eye">&#xe7fd;</i>
						<i @click="see_psw" v-if="isSee" class="eye">&#xe64e;</i>
					</div>
				</div>
			</div>
			<button class="confirm" :class="{red:phone!==''&&psw!==''}" @click="confirm">登录</button>
			
		</section>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import axios from 'axios';
	export default{
		data(){
			return {
				phone: '',
				psw: '',
				checked_phone:false,
				checked_vCode:false,
				isConfirmed: false,
				isSee: false,
				type: 'password'
			}
		},
		methods:{
			clear_phone(){
				if(this.phone!==''){
					this.phone = '';
				}
			},
			see_psw(){
				if(this.isSee){
					this.isSee = false;
					this.type = 'password'
				}else{
					this.isSee = true;
					this.type = 'text'
				}
			},
			
			confirm(){
				axios.get('http://datainfo.duapp.com/shopdata/userinfo.php',{
					params:{
						status:'login',
						userID:this.phone,
						password:this.psw
					}
				}).then((res)=>{
					console.log(res.data)
					if(res.data === 0){
						alert('用户名不存在')
					}else if(res.data === 2){
						alert('用户名或密码错误')
					}else{
//						alert('登录成功');
						this.$store.commit('savePhone',this.phone);
						this.$store.commit('savePsw',this.psw);
						this.$store.commit('changeLoginState',true);
						MessageBox('提示', '登录成功').then(action=>{
							
							this.$router.push('/mine');
						});
						
					}
				})
			},
			
		},
		mounted(){
			console.log()
		}
	}
</script>

<style lang="scss">
	@import '../../styles/yo/usage/core/reset';
	.login{
		width: 100%;
		height: 100%;
		@include flexbox();
		@include flex-direction(column);
		header{
			width: 100%;
			height: 1.5rem;
			color: #fff;
			padding: .1rem .1rem 0;
			font-size: .16rem;
			@include flexbox();
			@include justify-content(space-between);
			background: url(https://jp.juancdn.com/jpwebapp_v1/images_v1/user/user_center_bg.png) center;
			i{
				font-family: 'yofont';
			}
		}
		section{
			@include flex();
			width: 100%;
			background: #F4F4F8;
			.remind{
				height: .56rem;
				background: #fff;				
				p{
					text-align: center;
					font-size: .14rem;
					line-height: .28rem;
					color: #666;
					&:nth-of-type(1){
						color: red;
						font-size: .2rem;;
						/*margin-top: .1rem;*/
					}
				}
			}
			input,button{
				border: none;
			}
			.login_input{
				width: 100%;
				height: .88rem;
				@include border(1px 0 1px 0);
				padding: 0 .1rem;
				background: #fff;
				.phone,.password{
					width: 100%;
					height: .44rem;
					@include flexbox();
					@include justify-content(space-between);
					@include align-items(center);
				}
				.phone{
					@include border(0 0 1px 0);
				}
				.password{
					.eye{
						font-size: .18rem;
					}
					
				}
				i{
					font-family: 'yofont';
				}
			}
			.confirm{
				width: 80%;
				height: .44rem;
				margin: .1rem 10% 0;
				@include border-radius(5px);
				font-size: .18rem;
				&.red{
					background: red;
					color: #fff;
				}
			}
		}
	}
</style>