<template>
	<view class="content">
		<view class="header"></view>
		<view class="info">
			<view class="base-info">
				<view class="top flex flex-j-bw">
					<view class="no-box">
						<view class="no flex flex-j-c flex-a-c text-bold">
							NO.23
						</view>
					</view>
					<view class="avatar">
						<image src="../../static/logo.png" mode=""></image>
					</view>
				</view>
				<view class="main">
					<view class="row flex">
						<view class="col">
							<view class="title">
								姓名
							</view>
							<view class="contnet">
								张前民
							</view>
						</view>
						<view class="col">
							<view class="title">
								身份类别
							</view>
							<view class="contnet">
								贫困户/危改户/ 异地搬迁户
							</view>
						</view>
					</view>
					<view class="row flex">
						<view class="col">
							<view class="title">
								市
							</view>
							<view class="contnet">
								西安市
							</view>
						</view>
						<view class="col">
							<view class="title">
								区县
							</view>
							<view class="contnet">
								雁塔区
							</view>
						</view>
					</view>
					<view class="row flex">
						<view class="col">
							<view class="title">
								乡镇
							</view>
							<view class="contnet">
								鱼化寨
							</view>
						</view>
						<view class="col">
							<view class="title">
								村民委员会
							</view>
							<view class="contnet">
								鱼化寨村委
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
					2016年,经XXXX认定,为建档立卡贫困户；
					2017年,经XXXX认定,享受危房改造政策
				</view>
			</view>
			<view class="show-more flex flex-j-c flex-a-c" @click="toLogin" v-if="!isLogin">
				查看更多
			</view>
			<view class="more-info" v-if="isLogin">
				<view class="tag-bar flex flex-a-c flex-j-ba">
					<view class="item" v-for="(item,index) in tagbarList" :key="index" @click="handleChange(index)">
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
									特等贫困
								</view>
							</view>
							<view class="col">
								<view class="title">
									致贫原因
								</view>
								<view class="contnet">
									重大疾病
								</view>
							</view>
						</view>
						<view class="row flex">
							<view class="col">
								<view class="title">
									脱贫状态
								</view>
								<view class="contnet">
									已脱贫
								</view>
							</view>
							<view class="col">
								<view class="title">
									脱贫年度
								</view>
								<view class="contnet">
									2020年
								</view>
							</view>
						</view>
					</view>
					<view class="remark-box">
						<view class="s-title">说明</view>
						<view class="title">
							建档立卡贫困户：安全住房面积XXXX平
						</view>
					</view>
					<view class="img-box">
						<view class="s-title">住房</view>
						<view class="title">前</view>
						<image class="img" src="../../static/top.png"></image>
						<view class="title" style="margin-top: 40upx;">后</view>
						<image class="img" src="../../static/top.png"></image>
					</view>
					<view class="img-box">
						<view class="s-title">厨房</view>
						<view class="title">前</view>
						<image class="img" src="../../static/top.png"></image>
						<view class="title" style="margin-top: 40upx;">后</view>
						<image class="img" src="../../static/top.png"></image>
					</view>
					<view class="img-box">
						<view class="s-title">卫生间</view>
						<view class="title">前</view>
						<image class="img" src="../../static/top.png"></image>
						<view class="title" style="margin-top: 40upx;">后</view>
						<image class="img" src="../../static/top.png"></image>
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
									特等贫困
								</view>
							</view>
							<view class="col">
								<view class="title">
									列入计划的年度
								</view>
								<view class="contnet">
									重大疾病
								</view>
							</view>
						</view>
						<view class="row flex">
							<view class="col">
								<view class="title">
									资金补助类型
								</view>
								<view class="contnet">
									已脱贫
								</view>
							</view>
							<view class="col">
								<view class="title">
									改造状态
								</view>
								<view class="contnet">
									2020年
								</view>
							</view>
						</view>
					</view>
					<view class="remark-box">
						<view class="s-title">说明</view>
						<view class="title">
							危改户：危改房D级新建XXXX平
						</view>
					</view>
					<view class="img-box">
						<view class="s-title">住房</view>
						<view class="title">前</view>
						<image class="img" src="../../static/top.png"></image>
						<view class="title" style="margin-top: 40upx;">后</view>
						<image class="img" src="../../static/top.png"></image>
					</view>
					<view class="img-box">
						<view class="s-title">厨房</view>
						<view class="title">前</view>
						<image class="img" src="../../static/top.png" @click="handlePreview"></image>
						<view class="title" style="margin-top: 40upx;">后</view>
						<image class="img" src="../../static/top.png"></image>
					</view>
					<view class="img-box">
						<view class="s-title">卫生间</view>
						<view class="title">前</view>
						<image class="img" src="../../static/top.png"></image>
						<view class="title" style="margin-top: 40upx;">后</view>
						<image class="img" src="../../static/top.png"></image>
					</view>
				</view>
				<view class="poor-critical-offsite" v-if="tagbarIndex==2">
					<view class="remark-box">
						<view class="s-title">说明</view>
						<view class="title">
							异地搬迁户：异地搬迁户XXXX户
						</view>
					</view>
					<view class="img-box">
						<view class="s-title">搬迁前</view>
						<image class="img" src="../../static/top.png"></image>
					</view>
					<view class="img-box">
						<view class="s-title">搬迁后</view>
						<image class="img" src="../../static/top.png"></image>
					</view>
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
					<input class="input" placeholder-class="placeholder-input" type="text" value="" placeholder="请输入账号" />
				</view>
				<view class="login-item flex flex-a-c" style="margin-top: 60upx;">
					<image class="icon" src="../../static/mima.png" mode=""></image>
					<input class="input" type="password" placeholder-class="placeholder-input" value="" placeholder="请输入密码" />
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
	export default {
		data() {
			return {
				title: 'Hello',
				showLogin: false,
				isLogin: false,
				tagbarIndex: 0,
				tagbarList: [{
						title: '贫困户',
						type: 0
					},
					{
						title: '危改户',
						type: 1
					},
					{
						title: '异地搬迁户',
						type: 2
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			close() {
				this.showLogin = false
			},
			toLogin() {
				this.showLogin = true
			},
			login() {
				this.isLogin = true
				this.showLogin = false
			},
			handleChange(index) {
				this.tagbarIndex = index
			},
			handlePreview(index){
				console.log('asdasd')
				uni.previewImage({
					urls:['https://img.cdn.aliyun.dcloud.net.cn/stream/plugin_screens/ba3bd980-6e3b-11ea-a5ee-4145dcff9a6e_0.png?v=1585102469']
				})
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
