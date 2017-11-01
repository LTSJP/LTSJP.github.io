<template>
	<div class="register">
		<header>
			<router-link to='/mine' tag='i'>&#xe646;</router-link>
			<router-link to='/login' tag='span'>已有账号?直接登录</router-link>
		</header>
		<section>
			<div class="remind">
				<p>注册</p>
				<p>请保持你的手机通畅，用于接受验证短信</p>
			</div>
			<div class="regist_input">
				<div class="phone">
					<input type="number" placeholder="请输入手机号" v-model="phone" />
					<i @click="clear_phone" v-show="phone!==''">&#xe646;</i>
				</div>
				<div class="password">
					<input type="password" placeholder="请输入密码" v-model="psw" />
					<i @click="clear_psw" v-show="psw!==''">&#xe646;</i>
				</div>
				<div class="verificationCode">
					<input type="number" placeholder="请输入验证码" v-model="verificationCode" />
					<div>						
						<i @click="clear_vCode" v-show="verificationCode!==''">&#xe646;</i>
						<button class="getVCode" :class="{red: phone!==''}" @click="getVCode">获取验证码</button>
					</div>
				</div>
			</div>
			<button class="confirm" :class="{red:phone!==''&&verificationCode!==''}" @click="confirm">完成</button>
		</section>
	</div>
</template>

<script>
	import axios from 'axios';
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return {
				phone: '',
				psw: '',
				verificationCode: '',
				vCode: '',
				checked_phone:false,
				checked_psw: false,
				checked_vCode:false,
				isConfirmed: false,
				checked_userId: false,
				checked_password: false
			}
		},
		methods:{
			clear_phone(val){
				if(this.phone!==''){
					this.phone = '';
				}
			},
			clear_psw(){
				if(this.psw!==''){
					this.psw = '';
				}
			},
			clear_vCode(){
				if(this.verificationCode!==''){
					this.verificationCode = '';
				}
			},
			getVCode(){
				if(this.phone!==''){
					this.vCode = parseInt( Math.random()*9000+1000 );
					console.log(this.vCode);
				}
			},
			confirm(){
				axios.get('http://datainfo.duapp.com/shopdata/userinfo.php',
				{
					params: {
						status:'register',
				      	userID: this.phone,
				      	password: this.psw
			   	}
				}).then((res)=>{
					this.checked_phone = /^1[3|5|4|7|8]\d{9}$/.test(parseInt(this.phone));
					this.checked_psw = /^[a-zA-Z_0-9$%*#]\w{5,20}$/.test(this.psw);
					if(this.vCode === parseInt(this.verificationCode)){
						this.checked_vCode = true;					
					}
					console.log(this.checked_phone, res.data , res.data ===1 && this.checked_phone === true)
					if(res.data ===1 && this.checked_phone === true){
						this.checked_userId = true;
						if(this.checked_userId&&this.checked_vCode&&this.checked_psw){
							console.log('ok')
//							this.$store.commit('savePhone',this.phone);
//							this.$store.commit('savePsw',this.psw);
							console.log(this.$store.state.phone,this.$store.state.psw)
//							alert('注册成功')
							MessageBox('提示', '注册成功').then(action=>{
								this.$router.push('/login')
							});
						}else if(!this.checked_userId){
//							alert('手机号不正确');
							MessageBox('提示', '手机号不正确')
						}else if(!this.checked_psw){
//							alert("密码格式不对")
							MessageBox('提示', '密码格式不对')
						}else if(!this.vCode){
//							alert("验证码不对")
							MessageBox('提示', '验证码不对')
						}
					}
				})
				
			},
			
		}
	}
</script>

<style lang="scss">
	@import '../../styles/yo/usage/core/reset';
	.register{
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
						/*margin-top: .1rem;*/
					}
				}
			}
			input,button{
				border: none;
			}
			.regist_input{
				width: 100%;
				height: 1.32rem;
				@include border(1px 0 1px 0);
				padding: 0 .1rem;
				background: #fff;
				input{
					width: 70%;
					height: 100%;
				}
				.phone,.verificationCode,.password{
					width: 100%;
					height: .44rem;
					@include flexbox();
					@include justify-content(space-between);
					@include align-items(center);
				}
				.phone,.password{
					@include border(0 0 1px 0);
				}
				.verificationCode{
					.getVCode{
						background: #fff;
						color: #8D8D8D;
						&.red{
							color: red;
						}
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