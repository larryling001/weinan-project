<template>
	<view class="content">
		<view class="header"></view>
		<view class="info">
			<view class="base-info">
				<view class="top flex flex-j-bw">
					<view class="no-box">
						<view class="no flex flex-j-c flex-a-c text-bold">
							No.{{info.dataReserveTw}}
						</view>
					</view>
					<view class="avatar">
						<image :src="info.headPortrait" mode=""></image>
					</view>
				</view>
				<view class="main">
					<view class="row flex">
						<view class="col">
							<view class="title">
								姓名
							</view>
							<view class="contnet">
								{{info.userName}}
							</view>
						</view>
						<view class="col">
							<view class="title">
								身份类别
							</view>
							<view class="contnet">
								{{info.poor?'贫困户':''}}{{info.poor&&info.criticalReform?'/':''}}{{info.criticalReform?'危改户':''}}{{info.criticalReform&&info.move?'/':''}}{{info.move?'异地搬迁户':''}}
							</view>
						</view>
					</view>
					<view class="row flex">
						<view class="col">
							<view class="title">
								市
							</view>
							<view class="contnet">
								{{info.city}}
							</view>
						</view>
						<view class="col">
							<view class="title">
								区县
							</view>
							<view class="contnet">
								{{info.county}}
							</view>
						</view>
					</view>
					<view class="row flex">
						<view class="col">
							<view class="title">
								乡镇
							</view>
							<view class="contnet">
								{{info.township}}
							</view>
						</view>
						<view class="col">
							<view class="title">
								村民委员会
							</view>
							<view class="contnet">
								{{info.villageCommittee}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="policy">
				<view class="title text-bold">
					政策依据
				</view>
				<view class="policy-content">
					{{info.dataReserveO?info.dataReserveO:'暂无依据'}}
				</view>
			</view>
			<view class="show-more flex flex-j-c flex-a-c" @click="toLogin" v-if="!isLogin">
				查看更多
			</view>
			<view class="more-info" v-if="isLogin">
				<view class="tag-bar flex flex-a-c flex-j-ba">
					<view class="item" v-for="(item,index) in tagbarList" v-if="item.show" :key="index" @click="handleChange(index)">
						<view :class="index==tagbarIndex?'color-checked':''">{{item.title}}</view>
						<view :class="['block',index==tagbarIndex?'block-checked':'']"></view>
					</view>
				</view>
				<view class="poor-critical-offsite" v-if="tagbarIndex==0">
					<view class="base-box">
						<view class="s-title">
							贫困户
						</view>
						<view class="row flex">
							<view class="col">
								<view class="title">
									贫困属性
								</view>
								<view class="contnet">
									{{moreInfo.pKpersExtendList[0].pAttribute?moreInfo.pKpersExtendList[0].pAttribute:'无'}}
								</view>
							</view>
							<view class="col">
								<view class="title">
									致贫原因
								</view>
								<view class="contnet">
									{{moreInfo.pKpersExtendList[0].pReason?moreInfo.pKpersExtendList[0].pReason:'无'}}
								</view>
							</view>
						</view>
						<view class="row flex">
							<view class="col">
								<view class="title">
									脱贫状态
								</view>
								<view class="contnet">
									{{moreInfo.pKpersExtendList[0].pStatus?moreInfo.pKpersExtendList[0].pStatus:'无'}}
								</view>
							</view>
							<view class="col">
								<view class="title">
									脱贫年度
								</view>
								<view class="contnet">
									{{moreInfo.pKpersExtendList[0].pTime?moreInfo.pKpersExtendList[0].pTime:'无'}}
								</view>
							</view>
						</view>
					</view>
					<view class="remark-box">
						<view class="s-title">说明</view>
						<view class="title">
							{{moreInfo.pKpersExtendList[0].pRemarks?moreInfo.pKpersExtendList[0].pRemarks:'无'}}
						</view>
					</view>
					<view class="img-box">
						<view class="s-title">住房</view>
						<!-- <view class="title">前</view> -->
						<image class="img" :src="baseUrl+item.url" v-if="item.type=='PK-ZF-01'" v-for="(item,index) in moreInfo.pKpersExtendList[0].persMaterialList" :key="index"></image>
						<!-- <view class="title" style="margin-top: 40upx;">后</view> -->
						<!-- <image class="img" :src="baseUrl+item.url" v-if="item.type=='PK-ZF-02'" v-for="(item,index) in moreInfo.pKpersExtendList[0].persMaterialList" :key="index"></image> -->
					</view>
					<view class="img-box">
						<view class="s-title">厨房</view>
						<!-- <view class="title">前</view> -->
						<image class="img" :src="baseUrl+item.url" v-if="item.type=='PK-CF-01'" v-for="(item,index) in moreInfo.pKpersExtendList[0].persMaterialList" :key="index"></image>
						<!-- <view class="title" style="margin-top: 40upx;">后</view> -->
						<!-- <image class="img" :src="baseUrl+item.url" v-if="item.type=='PK-CF-02'" v-for="(item,index) in moreInfo.pKpersExtendList[0].persMaterialList" :key="index"></image> -->
					</view>
					<view class="img-box">
						<view class="s-title">卫生间</view>
						<!-- <view class="title">前</view> -->
						<image class="img" :src="baseUrl+item.url" v-if="item.type=='PK-WS-01'" v-for="(item,index) in moreInfo.pKpersExtendList[0].persMaterialList" :key="index"></image>
						<!-- <view class="title" style="margin-top: 40upx;">后</view> -->
						<!-- <image class="img" :src="baseUrl+item.url" v-if="item.type=='PK-WS-02'" v-for="(item,index) in moreInfo.pKpersExtendList[0].persMaterialList" :key="index"></image> -->
					</view>
				</view>
				<view class="poor-critical-offsite" v-if="tagbarIndex==1">
					<view class="base-box">
						<view class="s-title">
							危改户
						</view>
						<view class="row flex">
							<view class="col">
								<view class="title">
									改造原因
								</view>
								<view class="contnet">
									{{moreInfo.wGpersExtendList[0].gReason?moreInfo.wGpersExtendList[0].gReason:'无'}}
								</view>
							</view>
							<view class="col">
								<view class="title">
									列入计划的年度
								</view>
								<view class="contnet">
									{{moreInfo.wGpersExtendList[0].gPlanTime?moreInfo.wGpersExtendList[0].gPlanTime:'无'}}
								</view>
							</view>
						</view>
						<view class="row flex">
							<view class="col">
								<view class="title">
									资金补助类型
								</view>
								<view class="contnet">
									{{moreInfo.wGpersExtendList[0].gCapitalType?moreInfo.wGpersExtendList[0].gCapitalType:'无'}}
								</view>
							</view>
							<view class="col">
								<view class="title">
									改造状态
								</view>
								<view class="contnet">
									{{moreInfo.wGpersExtendList[0].gTransStatus?moreInfo.wGpersExtendList[0].gTransStatus:'无'}}
								</view>
							</view>
						</view>
					</view>
					<view class="remark-box">
						<view class="s-title">说明</view>
						<view class="title">
							{{moreInfo.wGpersExtendList[0].gSRemarks?moreInfo.wGpersExtendList[0].gSRemarks:'无'}}
						</view>
					</view>
					<view class="img-box">
						<view class="s-title">住房</view>
						<!-- <view class="title">前</view> -->
						<image class="img" :src="baseUrl+item.url" v-if="item.type=='WG-ZF-01'" v-for="(item,index) in moreInfo.wGpersExtendList[0].persMaterialList" :key="index"></image>
						<!-- <view class="title" style="margin-top: 40upx;">后</view> -->
						<!-- <image class="img" :src="baseUrl+item.url" v-if="item.type=='WG-ZF-02'" v-for="(item,index) in moreInfo.wGpersExtendList[0].persMaterialList" :key="index"></image> -->
					</view>
					<view class="img-box">
						<view class="s-title">厨房</view>
						<!-- <view class="title">前</view> -->
						<image class="img" :src="baseUrl+item.url" v-if="item.type=='WG-CF-01'" v-for="(item,index) in moreInfo.wGpersExtendList[0].persMaterialList" :key="index"></image>
						<!-- <view class="title" style="margin-top: 40upx;">后</view> -->
						<!-- <image class="img" :src="baseUrl+item.url" v-if="item.type=='WG-CF-02'" v-for="(item,index) in moreInfo.wGpersExtendList[0].persMaterialList" :key="index"></image> -->
					</view>
					<view class="img-box">
						<view class="s-title">卫生间</view>
						<!-- <view class="title">前</view> -->
						<image class="img" :src="baseUrl+item.url" v-if="item.type=='WG-WS-01'" v-for="(item,index) in moreInfo.wGpersExtendList[0].persMaterialList" :key="index"></image>
						<!-- <view class="title" style="margin-top: 40upx;">后</view> -->
						<!-- <image class="img" :src="baseUrl+item.url" v-if="item.type=='WG-WS-02'" v-for="(item,index) in moreInfo.wGpersExtendList[0].persMaterialList" :key="index"></image> -->
					</view>
				</view>
				<view class="poor-critical-offsite" v-if="tagbarIndex==2">
					<view class="remark-box">
						<view class="s-title">说明</view>
						<view class="title">
							{{moreInfo.yBpersExtendList[0].bSRemarks?moreInfo.yBpersExtendList[0].bSRemarks:'无'}}
						</view>
					</view>
					<view class="img-box">
						<view class="s-title">搬迁</view>
						<image class="img" :src="baseUrl+item.url" v-if="item.type=='YB—01'" v-for="(item,index) in moreInfo.yBpersExtendList[0].persMaterialList" :key="index"></image>
					</view>
					<!-- <view class="img-box">
						<view class="s-title">搬迁后</view>
						<image class="img" :src="baseUrl+item.url" v-if="item.type=='YB—02'" v-for="(item,index) in moreInfo.yBpersExtendList[0].persMaterialList" :key="index"></image>
					</view> -->
				</view>
			</view>
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
			<view class="close-box">
				<image class="close" @click="close" src="../../static/close.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {apps} from '../../utils/services.js'
	import {baseUrl}from '../../utils/request.js'
	export default {
		data() {
			return {
				title: 'Hello',
				showLogin: false,
				isLogin: false,
				tagbarIndex: 0,
				tagbarList: [{
						title: '贫困户',
						type: 0,
						show:false
					},
					{
						title: '危改户',
						type: 1,
						show:false
					},
					{
						title: '异地搬迁户',
						type: 2,
						show:false
					}
				],
				user:'',
				password:'',
				info:{},
				moreInfo:{},
				userId:'',
				baseUrl:baseUrl
			}
		},
		onLoad() {
			uni.removeStorageSync('Authorization')
			
			let url = window.location.search;
			let theRequest = new Object();
			if (url.indexOf("?") != -1) {
			let str = url.substr(1);
			let strs = str.split("&");
			for (let i = 0; i < strs.length; i++) {
			    theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
			    }
			}
			this.userId=theRequest.id
			if(theRequest.token){
				uni.setStorageSync('Authorization',theRequest.token)
			}
			this.getBaseInfo(theRequest.id)
			// if(uni.getStorageSync('Authorization')){
			// 	this.getMoreInfo(theRequest.id)
			// }
			
		},
		methods: {
			getBaseInfo(id){
				apps.getBaseInfo(id).then(res=>{
					if(res.code==200){
						this.info=res.data
					}else{
						if(res.code==401){
							uni.showToast({
								title:'登陆超时请重新登录',
								icon:'none'
							})
							uni.removeStorageSync('Authorization')
						}else{
							uni.showToast({
								title:'加载数据失败',
								icon:'none'
							})
						}
					}
				})
			},
			getMoreInfo(id){
				apps.getMoreInfo(id).then(res=>{
					if(res.code==200){
						this.moreInfo=res.data
						if(res.data.poor){
							this.tagbarIndex=0
							this.tagbarList[0].show=true
						}
						if(res.data.criticalReform){
							if(res.data.poor){
								this.tagbarIndex=0
							}else{
								this.tagbarIndex=1
							}
							this.tagbarList[1].show=true
						}
						if(res.data.move){
							if(res.data.poor){
								this.tagbarIndex=0
							}else if(res.data.criticalReform){
								this.tagbarIndex=1
							}else{
								this.tagbarIndex=2
							}
							this.tagbarList[2].show=true
						}
						this.isLogin = true
						this.showLogin = false
					}else{
						if(res.code==401){
							uni.showToast({
								title:'登陆超时请重新登录',
								icon:'none'
							})
							uni.removeStorageSync('Authorization')
						}else{
							uni.showToast({
								title:'加载数据失败',
								icon:'none'
							})
						}
					}
				})
			},
			close() {
				this.showLogin = false
			},
			toLogin() {
				if(uni.getStorageSync('Authorization')){
					this.getMoreInfo(this.userId)
				}else{
					this.showLogin = true
				}
				// this.showLogin = true
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
						uni.setStorageSync('Authorization',res.token)
						this.getMoreInfo(this.userId)
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
			handleChange(index) {
				this.tagbarIndex = index
			},
			handlePreview(index){
				console.log('asdasd')
				// uni.previewImage({
				// 	urls:['https://img.cdn.aliyun.dcloud.net.cn/stream/plugin_screens/ba3bd980-6e3b-11ea-a5ee-4145dcff9a6e_0.png?v=1585102469']
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/stylesheet.css';

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

	.s-title {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 800;
		padding: 40upx 0;
	}

	.s-title::before {
		content: '•';
		color: rgba(45, 125, 255, 1);
		font-size: 40upx;
		position: relative;
		top: 5upx;
		margin-right: 10upx;
	}

	//私有样式
	.content {
		font-family: PingFang SC;
		background-color: rgb(46, 137, 255);
		min-height: 100vh;
		padding-bottom: 40upx;

		.header {
			width: 100%;
			height: 484upx;
			background-color: rgb(46, 137, 255);
			background-image: url(../../static/top.png);
			background-size: cover;
		}

		.info {
			padding: 0 28upx;

			.base-info {
				// height: 800upx;
				background: linear-gradient(to bottom, rgba(216, 234, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
				border-radius: 16upx;
				padding: 0 28upx 80upx 28upx;

				.top {
					.no-box {
						width: 200upx;
						height: 80upx;
						background-color: #000000;
						border-radius: 100upx;
						margin-top: 30upx;

						.no {
							width: 200upx;
							height: 80upx;
							border-radius: 100upx;
							font-size: 40upx;
							color: #C3AD87;
						}
					}

					.avatar {
						margin-top: -100upx;
						height: 200upx;
						width: 200upx;
						background-color: #FFFFFF;
						border-radius: 50%;

						image {
							height: 200upx;
							width: 200upx;
							border-radius: 50%;
							background-color: #EEEEEE;
						}
					}
				}

				.main {
					margin: 28upx 0 48upx 0;

					.row {
						.col:first-child {
							width: 50%;
						}

						.col:last-child {
							width: 48%;
							margin-left: 18upx;
						}

						.col {
							.title {
								color: #959595;
								font-size: 28upx;
							}

							.contnet {
								font-size: 40upx;
								font-weight: bold;
								min-height: 120upx;
							}
						}
					}
				}
			}

			.policy {
				padding: 0 28upx 100upx 28upx;
				background-color: #ffffff;
				border-radius: 16upx;
				margin-top: 20upx;

				.title {
					font-size: 32upx;
					padding-top: 40upx;
					// padding: 40upx 49upx;
				}

				.policy-content {
					font-size: 40upx;
					font-weight: bold;
					color: #656565;
					margin-top: 40upx;
				}
			}

			.show-more {
				height: 96upx;
				background: rgb(216, 234, 255);
				border-radius: 48upx;
				margin-top: 20upx;
				color: #2D7DFF;
				font-size: 32upx;
				font-weight: 800;
			}

			.more-info {
				.tag-bar {
					height: 96upx;
					background-color: #FFFFFF;
					border-radius: 16upx;
					margin-top: 20upx;

					.item {
						font-size: 32upx;
						font-weight: 800;

						.color-checked {
							color: #2D7DFF;
						}

						.block {
							width: 40upx;
							height: 8upx;
							border-radius: 4upx;
							background-color: #FFFFFF;
							margin: auto;
						}

						.block-checked {
							background-color: #2D7DFF;
						}
					}
				}

				.poor-critical-offsite {

					// background:rgba(255,255,255,1);
					.base-box {
						border-radius: 16upx;
						margin-top: 20upx;
						padding: 0 28upx;
						background: rgba(255, 255, 255, 1);

						.row {
							.col:first-child {
								width: 50%;
							}

							.col:last-child {
								width: 48%;
								margin-left: 18upx;
							}

							.col {
								.title {
									color: #959595;
									font-size: 28upx;
								}

								.contnet {
									font-size: 40upx;
									font-weight: bold;
									min-height: 120upx;
								}
							}
						}
					}
					.remark-box{
						padding: 0 28upx 100upx 28upx;
						background: rgba(255, 255, 255, 1);
						border-radius: 16upx;
						margin-top: 20upx;
						.title{
							font-size: 40upx;
							font-weight: bold;
							color: #656565;
						}
					}
					.img-box {
						background: rgba(255, 255, 255, 1);
						border-radius: 16upx;
						margin-top: 20upx;
						padding: 0 28upx 100upx 28upx;

						.title {
							font-size: 28upx;
							font-weight: bold;
							color: rgba(149, 149, 149, 1);
						}

						.img {
							width: 100%;
							height: 350upx;
							margin-top: 20upx;
						}
					}
				}
			}

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
					padding: 50upx;
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
	}
</style>
