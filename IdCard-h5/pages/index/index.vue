<template>
	<view class="content">
		<!-- <view class="logout" @click="logout">
			<image src="../../static/logout.png" mode="" class="logout-img"></image>
		</view> -->
		<view class="header"></view>
		<view class="idcard-box browse">
			<view class="browseTitle" :class="showVillage || showName ? 'flexstyle' : ''">
				<text class="browseStye">浏览</text>
				<image src="../../static/back.png" v-if="showVillage || showName" class="browseImage" @click="goback"></image>
			</view>
			<view class="browseContent" :class="showcity?'browseContent1':'' ">
				<text @click="handleShVillage(item)" v-if="showcity" v-for="item in citylist" :key="item">{{ item.substring(0,4) }}</text>
			</view>
			<view class="browseContent" v-if="showVillage" :class="showVillage?'browseContent1':'' ">
				<text @click="handleShowName(item)" v-for="item in villagelist" :key="item">{{ item.substring(0,4) }}</text>
			</view>
			<view class="browseContent" v-if="showName" :class="showName?'browseContent1':'' ">
				<text v-for="item in peoplelist" :key="item.id" @click="handlejumpDetail(item.id)">{{ item.user_name }}</text>
			</view>
		</view>
		<view class="idcard-box statisics" :class="showSearch ? 'statisicsSearch' : ''">
			<view class="statisicsTitle" @click="searchCon">统计</view>
			<view class="statisicsContent">
				<view> 
				<text>累计改造户数：</text> 
				<text>{{staMessage.peopleNum | filterPeopleNumber}}(户)</text> 
				</view>
				<view>
					<text>累计补助资金：</text>
					<text>{{staMessage.capital | filterPeopleNumber }}(元)</text>
					
				</view>
				<view>
					<text>累计改造面积：</text>
					<text>{{staMessage.areaMeasure | filterPeopleNumber}}(平方米)</text>
				</view>
			</view>
			<view class="staSearch" v-if="showSearch">
				<view class="staSearchContent">
					<text>请选择年度:</text>
					<picker :range="yearlist" :value="index" @change="handleChangeTime">
						<view v-if="index===''? false : true">{{ yearlist[index] }}</view>
						<view v-else style="color: #C8C7CC;">请选择年度</view>
					</picker>
				</view>
				<view class="staSearchContent">
					<text>请选择贫困类型:</text>
					<picker :range="usertype" :value="typeIndex" @change="handleChangeType">
						<view v-if="typeIndex===''? false : true">{{ usertype[typeIndex] }}</view>
						<view v-else style="color: #C8C7CC;">请选择贫困类型</view>
					</picker>
				</view>
				<view class="staSearchContent">
					<text>请选择镇:</text>
					<picker :range="citylist" :value="townIndex" @change="handleChangeTown">
						<view v-if="townIndex===''? false : true">{{ citylist[townIndex] }}</view>
						<view v-else style="color: #C8C7CC;">请选择镇</view>
					</picker>
				</view>
				<view class="staSearchContent">
					<text>请选择村:</text>
					<picker :range="villagelist" :value="villageIndex" @change="handleChangeVillage">
						<view v-if="villageIndex===''? false : true">{{ villagelist[villageIndex] }}</view>
						<view v-else style="color: #C8C7CC;">请选择村</view>
					</picker>
				</view>
				<button class="statisicsBtn" @click="handleStatistics">统计</button>
			</view>
		</view>
		<view class="idcard-box">
			<view class="title">人员搜索</view>
			<view class="id-input-boxs">
				<view class="id-input-box" style="display: flex;align-items: center;">
					<image src="../../static/card.png" mode="" style="height: 40upx;width: 53upx;"></image>
					<input type="text" v-model="IdNumber" placeholder="请输入身份证号" class="IdCard" @blur="IDrules" />
				</view>
			</view>
			<view class="IdSearch margin-30" @click="jumpDetail">搜索</view>
			<!-- <button class="" size="mini" type="primary" ></button> -->
		</view>
		<view class="modle" v-if="showLogin">
			<view class="login-box">
				<view class="login-top-box"><view class="login-top-title flex flex-j-c flex-a-c" style="font-size: 40upx;">登录</view></view>
				<view class="login-item flex flex-a-c">
					<image class="icon" src="../../static/usercenter.png" mode=""></image>
					<input class="input" v-model="user" placeholder-class="placeholder-input" type="text" value="" placeholder="请输入账号" />
				</view>
				<view class="login-item flex flex-a-c" style="margin-top: 60upx;">
					<image class="icon" src="../../static/mima.png" mode=""></image>
					<input class="input" v-model="password" type="password" placeholder-class="placeholder-input" value="" placeholder="请输入密码" />
				</view>
				<view class="login-btn flex flex-j-c flex-a-c" @click="login">确认登录</view>
			</view>
			<!-- 	<view class="close-box">
	   		<image class="close" @click="close" src="../../static/close.png"></image>
	   	</view> -->
		</view>
	</view>
</template>

<script>
import { baseUrl } from '../../utils/request.js';
import { apps } from '../../utils/services.js';
import Cookies from 'js-cookie'
export default {
	data() {
		return {
			IdNumber: '',
			baseUrl: baseUrl,
			isFlag: false,
			showLogin: true,
			user: '',
			password: '',
			showSearch:false,
			index:'',
			villageIndex:'',
			townIndex:'',
			typeIndex:'',
			showVillage:false,
			showName:false,
			showcity:true,
			citylist:[],
			villagelist:[],
			peoplelist:[],
			yearlist:[],
			usertype:[],
			queryInfo:{
				year:'',
				types:'',
				villageCommittee:'',
				township:''
			},
			staMessage:{}
		};
	},
	onLoad() {
		// uni.removeStorageSync('Authorizations');
		if(Cookies.get('Authorization')){
			this.showLogin = false;
			this.getTownlist()
			this.getStatistics()
		}
	},
	methods: {
		// 获取统计数据
		getStatistics(){
			apps.statistics(this.queryInfo).then(res=>{
				if(res.code==200){
					this.staMessage = res.data
				}else if(res.code==401){
					Cookies.remove('Authorization');
					this.showLogin = true
					uni.showToast({
						title: '登陆超时请重新登录',
						icon: 'none'
					});
				}else{
					uni.showToast({
						title: '系统错误',
						icon: 'none'
					});
				}
			})
		},
		// 获取年度
		getyear(){
			apps.year().then(res=>{
				if(res.code==200){
					this.yearlist =res.data
				}else if(res.code==401){
					Cookies.remove('Authorization');
					this.showLogin = true
					uni.showToast({
						title: '登陆超时请重新登录',
						icon: 'none'
					});
				}else{
					uni.showToast({
						title: '系统错误',
						icon: 'none'
					});
				}
			})
		},
		// 获取人员类型
		getPeopleType(){
			apps.usertype().then(res=>{
				if(res.code==200){
					this.usertype = res.data
				}else if(res.code==401){
					Cookies.remove('Authorization');
					this.showLogin = true
					uni.showToast({
						title: '登陆超时请重新登录',
						icon: 'none'
					});
				}else{
					uni.showToast({
						title: '系统错误',
						icon: 'none'
					});
				}
			})
		},
		// 返回
		goback(){
			if(this.showVillage){
				this.showVillage=false
				this.showName=false
				this.showcity=true
			}else if(this.showName){
               this.showVillage=true
				this.showName=false
				this.showcity=false
			}else{
				this.showVillage=false
				this.showName=false
			   this.showcity=true
			}
		},
		// 点击人名跳转详情
		handlejumpDetail(id){
			window.location.href = this.baseUrl + `/h5/?id=${id}`;
		},
		getTownlist(){
			apps.city().then(res=>{
				this.citylist =res.data
			})
		},
		// 人名
		handleShowName(name){
			this.showName =true
			this.showcity =false
			this.showVillage=false
			this.getpeople(name)
		},
		// 显示村
		handleShVillage(name){
			this.showName =false
			this.showcity =false
			this.showVillage=true
			this.getVillage(name)
		},
		// 获取人员数据
		getpeople(name){
			apps.peopleName(name).then(res=>{
				this.peoplelist =res.data
			})
		},
		// 获取村庄数据
		getVillage(name){
			apps.village(name).then(res=>{
				this.villagelist = res.data
			})
		},
		// 统计按钮
		handleStatistics(){
            apps.statistics(this.queryInfo).then(res=>{
				this.staMessage =res.data
				this.index='',
				this.villageIndex='',
				this.townIndex='',
				this.typeIndex=''
			})
		},
		// 选择年度
		handleChangeTime(e){
             this.index = e.detail.value
			 this.queryInfo.year = this.yearlist[e.detail.value]
		},
		// 选择类型
		handleChangeType(e){
			this.typeIndex = e.detail.value
			this.queryInfo.types = this.usertype[e.detail.value]
		},
		// 选择镇
		handleChangeTown(e){
			this.townIndex = e.detail.value
			this.queryInfo.township = this.citylist[e.detail.value]
			this.villageIndex=''
			this.getVillage(this.citylist[e.detail.value])
			
		},
		// 选择村
		handleChangeVillage(e){
			if(this.townIndex===''){
				uni.showToast({
					title:'请先选择镇',
					icon:'none'
				})
			}else{
				this.villageIndex = e.detail.value
				this.queryInfo.villageCommittee =this.villagelist[e.detail.value]
			}
			
		},
		// 统计view
		searchCon(){
			this.showSearch = !this.showSearch
			this.getyear()
			this.getPeopleType()
 		},
		// 跳转h5页面
		jumpDetail() {
			apps.cardID(this.IdNumber).then(res => {
				console.log(res.data);
				if (res.code == 200) {
					window.location.href = this.baseUrl + `/h5/?id=${res.data}`;
				}else if(res.code==401){
					Cookies.remove('Authorization');
					this.showLogin = true
					uni.showToast({
						title: '登陆超时请重新登录',
						icon: 'none'
					});
				}else {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				}
				// http://com.dl.house.vaiwan.com/h5/?id=00048c842e504999b372acf81a2748f6#/pages/index/index
				// window.location.href = 'http://localhost:8081' +  `/h5/?id=${res.data}&token=${uni.getStorageSync('Authorizations')}`
			});
		},
		// 身份证正则
		IDrules() {
			var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
			if (!reg.test(this.IdNumber)) {
				uni.showToast({
					title: '请输入正确的身份证',
					icon: 'none'
				});
				return this.isFlag;
			} else {
				return !this.isFlag;
			}
		},
		login() {
			if (this.user.trim() == '') {
				wx.showToast({
					title: '请输入用户名',
					icon: 'none'
				});
				return;
			}
			if (this.password.trim() == '') {
				wx.showToast({
					title: '密码',
					icon: 'none'
				});
				return;
			}
			apps.login({ username: this.user, password: this.password })
				.then(res => {
					if (res.code == 200) {
						wx.showToast({
							title: '登录成功',
							icon: 'none'
						});
						let  in60Minutes  =  1 / 24 ;
						Cookies.set('Authorization',res.token,{ 
							expires:in60Minutes 
						})
						this.getTownlist()
						this.getStatistics()
						this.showLogin = false;
					} else {
						wx.showToast({
							title: res.msg,
							icon: 'none'
						});
					}
				})
				.catch(() => {
					wx.showToast({
						title: '登录失败',
						icon: 'none'
					});
				});
		},
		logout(){
			let that = this
			uni.showModal({
			    title: '提示',
			    content: '是否退出登录？',
			    success: function (res) {
			        if (res.confirm) {
						console.log('asdasds')
			            wx.removeStorageSync('Authorizations')
						that.citylist=[]
						that.villagelist=[]
						that.peoplelist=[]
						that.yearlist=[]
						that.usertype=[]
						that.staMessage={}
						that.user='',
						that.password='',
						that.showLogin=true
			        } else if (res.cancel) {
			            console.log('用户点击取消');
			        }
			    }
			});
		}
	}
};
</script>

<style lang="scss">
// 统计按钮
.logout{
	height: 68upx;
	width: 68upx;
	border-radius: 50%;
	background:rgba(58,123,255,1);;
	display: flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 30upx;
	right: 30upx;
	.logout-img{
		height: 44upx;
		width: 44upx;
	}
}
.statisicsBtn {
	height: 96upx;
	background: rgba(45, 125, 255, 1);
	border-radius: 48upx;
	font-size: 32upx;
	font-weight: bold;
	color: rgba(255, 254, 254, 1);
	margin-top: 40upx;
	margin-bottom: 40upx;
}
.staSearchContent {
	display: flex;
	margin-bottom: 15upx;
	justify-content: space-between;
}
// 搜索条件
.staSearch {
	margin-top: 40upx;
	opacity: 0;
}
// 统计样式
.statisics {
	overflow: hidden;
	margin-bottom: 30upx !important;
	padding: 30upx;
	box-sizing: border-box;
	height: 296upx !important;
	transition: all 1s;
	.statisicsTitle {
		margin-bottom: 15upx;
		text-align: center;
	}
	.statisicsContent {
		view{
			display: flex;
		}
		text {
			display: block;
			text-align: center;
			margin-bottom: 15upx;
			font-size: 32upx;
		}
	}
}
.statisicsSearch {
	transition: all .5s;
	height: 730upx !important;
	.staSearch{
		transition: all .5s;
		opacity: 1;
	}
}
// 浏览样式
.browse {
	margin-bottom: 30upx !important;
	padding: 0 30upx;
	box-sizing: border-box;
	overflow: hidden;
	.browseTitle {
		text-align: center;
		color: black ;
		width: 100%;
		display: block;
		overflow: hidden;
		position: relative;
		.browseStye{
			display: inline-block;
		    margin-top: 20upx;
			margin-bottom: 20upx;
		}
		.browseImage{
            display: block;
			position: absolute;
			right: 0;
			top: 20upx;
			width: 50upx;
			height: 50upx;
		}
	}
	.browseContent {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		overflow: hidden;
		overflow-y: auto;
		text {
			width: 214upx;
			text-align: center;
			margin-bottom: 15upx;
			font-size: 32upx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	.browseContent1{
		height: 286upx;
	}
}
.flexstyle {
	display: flex;
	justify-content: space-between;
}
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
.content {
	/* width: 100%;
	display: flex;	
	position: fixed;
	padding: 30upx;
	box-sizing: border-box;
    top: 50%;
	left: 50%;
	transform: translate(-50%,-50%); */
	width: 100%;
	height: auto;
	overflow: hidden;
	background-color: rgb(46, 137, 255);
	padding-bottom: 30upx;
}
.id-input-boxs {
	height: 150upx;
	align-items: center;
	justify-content: center;
}
.idcard-box {
	background-color: #ffffff;
	margin: 0 25upx;
	background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(216, 234, 255, 1) 100%);
	border-radius: 8upx;
	height: 420upx;
}
.title {
	font-size: 32upx;
	font-weight: bold;
	color: rgba(0, 0, 0, 1);
	height: 120upx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.IdNumber {
	font-size: 30upx;
}
.IdCard {
	width: 100%;
	font-size: 30upx;
	padding-left: 25upx;
}
.id-input-box {
	height: 96upx;
	margin: 0 25upx;
	padding: 0 25upx;
	background-color: #ffffff;
	border: 1px solid rgba(224, 224, 224, 1);
	border-radius: 48upx;
}
.IdSearch {
	margin: 0 25upx;
	font-size: 32upx;
	font-weight: bold;
	height: 96upx;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(45, 126, 255, 1);
	border-radius: 48upx;
	color: #ffffff;
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
