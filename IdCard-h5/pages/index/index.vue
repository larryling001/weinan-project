<template>
	<view class="content">
	   <view class="header"></view>
	   <view class="idcard-box">
			<view class="title">人员搜索</view>
			<view class="id-input-boxs">
				<view class="id-input-box" style="display: flex;align-items: center;">
					<image src="../../static/card.png" mode="" style="height: 40upx;width: 53upx;"></image>
					<input type="text" v-model="IdNumber" placeholder="请输入身份证号" class="IdCard" @blur="IDrules"  />
				</view>
			</view>
			<view class="IdSearch margin-30" @click="jumpDetail">
				搜索
			</view>
			 <!-- <button class="" size="mini" type="primary" ></button> -->
	   </view>
	   <view class="modle" v-if="showLogin">
	   	<view class="login-box">
	   		<view class="login-top-box">
	   			<view class="login-top-title flex flex-j-c flex-a-c" style="font-size: 40upx;">
	   				登录
	   			</view>
	   		</view>
	   		<view class="login-item flex flex-a-c">
	   			<image class="icon" src="../../static/usercenter.png" mode=""></image>
	   			<input class="input" v-model="user" placeholder-class="placeholder-input" type="text" value="" placeholder="请输入账号" />
	   		</view>
	   		<view class="login-item flex flex-a-c" style="margin-top: 60upx;">
	   			<image class="icon" src="../../static/mima.png" mode=""></image>
	   			<input class="input" v-model="password" type="password" placeholder-class="placeholder-input" value="" placeholder="请输入密码" />
	   		</view>
	   		<view class="login-btn flex flex-j-c flex-a-c" @click="login">
	   			确认登录
	   		</view>
	   	</view>
	   <!-- 	<view class="close-box">
	   		<image class="close" @click="close" src="../../static/close.png"></image>
	   	</view> -->
	   </view>
	</view>
</template>

<script>
	import {baseUrl}from '../../utils/request.js'
	import {apps}from '../../utils/services.js'
	export default {
		data() {
			return {
				IdNumber:'',
				baseUrl:baseUrl,
				isFlag:false,
				showLogin:true,
				user:'',
				password:''
			}
		},
		onLoad() {
			uni.removeStorageSync('Authorizations')
		},
		methods: {
			// 跳转h5页面
            jumpDetail(){
				apps.cardID(this.IdNumber).then(res=>{
					console.log(res.data)
					if(res.code==200){
						window.location.href = this.baseUrl +  `/h5/?id=${res.data}&token=${uni.getStorageSync('Authorizations')}`
					}else{
						uni.showToast({
							title:'未查询到数据',
							icon:'none'
						})
					}
					// http://com.dl.house.vaiwan.com/h5/?id=00048c842e504999b372acf81a2748f6#/pages/index/index
					// window.location.href = 'http://localhost:8081' +  `/h5/?id=${res.data}&token=${uni.getStorageSync('Authorizations')}`
				})
			},
			// 身份证正则
			IDrules(){
				var reg =/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
				if(!reg.test(this.IdNumber)){
				   uni.showToast({
				   	title:"请输入正确的身份证",
					icon:'none'
				   })
				    return this.isFlag;
				}else{
					return !this.isFlag
				}
			},
			login() {
				if(this.user.trim()==''){
					wx.showToast({
						title:'请输入用户名',
						icon:'none'
					})
					return
				}
				if(this.password.trim()==''){
					wx.showToast({
						title:'密码',
						icon:'none'
					})
					return
				}
				apps.login({username:this.user,password:this.password}).then(res=>{
					if(res.code==200){
						wx.showToast({
							title:'登录成功',
							icon:'none'
						})
						uni.setStorageSync('Authorizations',res.token)
						this.showLogin=false
					}else{
						wx.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				}).catch(()=>{
					wx.showToast({
						title:'登录失败',
						icon:'none'
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	//公共样式
	.flex {
		display: flex;
	}
	
	.flex-j-c {
		justify-content: center;
	}
	
	.flex-a-c {
		align-items: center;
	}
	
	.flex-j-bw {
		justify-content: space-between;
	}
	
	.flex-j-ba {
		justify-content: space-around;
	}
	
	.text-bold {
		font-weight: bold;
	}
.content{
	/* width: 100%;
	display: flex;	
	position: fixed;
	padding: 30upx;
	box-sizing: border-box;
    top: 50%;
	left: 50%;
	transform: translate(-50%,-50%); */
	width: 100%;
	height: 100vh;
	background-color: rgb(46, 137, 255);
}
.id-input-boxs{
	height: 150upx;
	align-items: center;
	justify-content: center;
}
.idcard-box{
	background-color: #FFFFFF;
	margin: 0 25upx;
	background:linear-gradient(0deg,rgba(255,255,255,1) 0%,rgba(216,234,255,1) 100%);
	border-radius:8upx;
	height: 420upx;
}
.title{
	font-size:32upx;
	font-weight:bold;
	color:rgba(0,0,0,1);
	height: 120upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.IdNumber{
	font-size:30upx;
}
.IdCard{
	width: 100%;
	font-size:30upx;
	padding-left: 25upx;
}
.id-input-box{
	height: 96upx;
	margin: 0 25upx;
	padding: 0 25upx;
	background-color: #FFFFFF;
	border:1px solid rgba(224,224,224,1);
	border-radius:48upx;
}
.IdSearch{
	margin: 0 25upx;
	font-size:32upx;
	font-weight:bold;
	height:96upx;
	display: flex;
	align-items: center;
	justify-content: center;
	background:rgba(45,126,255,1);
	border-radius:48upx;
	color: #FFFFFF;
}
.header {
			width: 100%;
			height: 484upx;
			background-color: rgb(46, 137, 255);
			background-image: url(../../static/top.png);
			background-size: cover;
		}
		.modle {
			height: 100vh;
			width: 100vw;
			background: rgba(0, 0, 0, 0.5);
			position: fixed;
			top: 0;
		
			.login-box {
				margin: 326upx 64upx 0 64upx;
				padding: 0 50upx;
				height: 640upx;
				background: linear-gradient(to bottom, rgba(215, 233, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
				border-radius: 8upx;
		
				.login-top-box {
					padding: 50upx 0;
					width: 100%;
		
					.login-top-title {
						background: url(../../static/login.png);
						background-size: contain;
						background-repeat: no-repeat;
						background-position: 0% 45%;
						font-size: 40upx;
						font-weight: bold;
					}
		
				}
		
				.login-item {
					height: 96upx;
					background: rgba(255, 255, 255, 1);
					border: 2upx solid rgba(223, 223, 223, 1);
					border-radius: 48upx;
					padding: 0 30upx;
		
					.icon {
						width: 56upx;
						height: 56upx;
						flex-shrink: 0;
					}
		
					.input {
						width: 100%;
						padding-left: 12upx;
					}
		
					.placeholder-input {
						font-size: 32upx;
						font-family: PingFang SC;
						font-weight: bold;
						color: rgba(149, 149, 149, 1);
					}
				}
		
				.login-btn {
					height: 96upx;
					margin-top: 90upx;
					background: rgba(45, 125, 255, 1);
					border-radius: 48upx;
					font-size: 32upx;
					font-weight: bold;
					color: rgba(255, 254, 254, 1);
				}
			}
		
			.close-box {
				text-align: center;
		
				.close {
					margin-top: 30upx;
					height: 78upx;
					width: 78upx;
				}
			}
		}
</style>
