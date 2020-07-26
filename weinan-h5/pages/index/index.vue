<template>
	<view class="content">
		<!-- <view class="logout" @click="logout">
			<image src="../../static/logout.png" mode="" class="logout-img"></image>
		</view> -->
		<view class="header"></view>
		<view class="info">
			<view class="base-info">
				<view class="top flex flex-j-bw">
					<view class="no-box">
						<image class="no-pic" src="../../static/no1.png" mode=""></image>
					</view>
				</view>
				<view class="main">
					<view class="row flex">
						<view class="col" style="text-align: center;width: 100%;padding: 0;margin: 0;">
							<view class="contnet" style="color: #FF0000;font-size: 48upx;">
								{{info.userName}}
							</view>
							<view class="title">
								姓名
							</view>
						</view>
					</view>
					<view class="row flex">
						<view class="col">	
							<view class="contnet">
								{{info.poor?'贫困户':''}}{{info.poor&&info.criticalReform?'/':''}}{{info.criticalReform?'危改户':''}}{{info.criticalReform&&info.move?'/':''}}{{info.move?'异地搬迁户':''}}
							</view>
							<view class="title">
								身份类别
							</view>
						</view>
						<view class="col">		
							<view class="contnet">
								{{info.city}}
							</view>
							<view class="title">
								市
							</view>
						</view>
					</view>
					<view class="row flex">
						
						<view class="col">
							<view class="contnet">
								{{info.county}}
							</view>
							<view class="title">
								区县
							</view>
						</view>
						<view class="col">
							<view class="contnet">
								{{info.township}}
							</view>
							<view class="title">
								乡镇
							</view>
						</view>
					</view>
					<view class="row flex">		
						<view class="col">
							<view class="contnet">
								{{info.villageCommittee}}
							</view>
							<view class="title">
								村民委员会
							</view>
						</view>
						<view class="col">			
							<view class="contnet">
								{{info.peopleNum || '1'}}人
							</view>
							<view class="title">
								家庭人口数
							</view>
						</view>
					</view>
					<!-- <view class="row flex">
						
						<view class="col">
							<view class="title">
								联系方式
							</view>
							<view class="contnet">
								{{info.dataReserveFo || '--'}}
							</view>
						</view>
					</view> -->
				</view>
			</view>
			<view class="policy">
				<view class="title text-bold">
					政策依据
				</view>
				<view class="policy-content">
					{{info.dataReserveO?info.dataReserveO:''}}
					<view class="no-yj" v-if="!info.dataReserveO">
						<image src="../../static/no-yj.png" mode=""></image>
						<view class="">
							暂无依据
						</view>
					</view>
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
								<view class="contnet">
									{{moreInfo.pKpersExtendList[0].pAttribute?moreInfo.pKpersExtendList[0].pAttribute:'无'}}
								</view>
								<view class="title">
									贫困属性
								</view>
							</view>
							<view class="col">
								<view class="contnet">
									{{moreInfo.pKpersExtendList[0].pReason?moreInfo.pKpersExtendList[0].pReason:'无'}}
								</view>
								<view class="title">
									致贫原因
								</view>
							</view>
						</view>
						<view class="row flex">
							<view class="col">
								<view class="contnet">
									{{moreInfo.pKpersExtendList[0].pStatus?moreInfo.pKpersExtendList[0].pStatus:'无'}}
								</view>
								<view class="title">
									脱贫状态
								</view>
							</view>
							<view class="col">
								<view class="contnet">
									{{moreInfo.pKpersExtendList[0].pTime?moreInfo.pKpersExtendList[0].pTime:'无'}}
								</view>
								<view class="title">
									脱贫年度
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
						<view class="" @click.stop="funPreviewImg(moreInfo.pKpersExtendList[0].persMaterialList, index)" v-if="item.type=='PK-ZF-01'"
						 v-for="(item,index) in moreInfo.pKpersExtendList[0].persMaterialList" :key="index">
							<image class="img" :src="baseUrl+item.url"></image>
							<view @tap.stop="handleDelImgOne(item.id)" class="cuIcon-roundclosefill" style="position: relative;top: -365upx;text-align: right;font-size: 40upx;color: red;"></view>
						</view>
						<!-- <view class="del-img" @click.stop="handleDelImg('zf')">删除</view> -->
						<view class="upload-img" @click.stop="funLoad('zf')">上传</view>
						<!-- <view class="title" style="margin-top: 40upx;">后</view> -->
						<!-- <image class="img" :src="baseUrl+item.url" v-if="item.type=='PK-ZF-02'" v-for="(item,index) in moreInfo.pKpersExtendList[0].persMaterialList" :key="index"></image> -->
					</view>
					<view class="img-box">
						<view class="s-title">厨房</view>
						<!-- <view class="title">前</view> -->
						<view class="" @click.stop="funPreviewImg(moreInfo.pKpersExtendList[0].persMaterialList, index)" v-if="item.type=='PK-CF-01'"
						 v-for="(item,index) in moreInfo.pKpersExtendList[0].persMaterialList" :key="index">
							<image class="img" :src="baseUrl+item.url"></image>
							<view @tap.stop="handleDelImgOne(item.id)" class="cuIcon-roundclosefill" style="position: relative;top: -365upx;text-align: right;font-size: 40upx;color: red;"></view>
						</view>
						<!-- <view class="del-img" @click.stop="handleDelImg('cf')">删除</view> -->
						<view class="upload-img" @click.stop="funLoad('cf')">上传</view>
						<!-- <view class="title" style="margin-top: 40upx;">后</view> -->
						<!-- <image class="img" :src="baseUrl+item.url" v-if="item.type=='PK-CF-02'" v-for="(item,index) in moreInfo.pKpersExtendList[0].persMaterialList" :key="index"></image> -->
					</view>
					<view class="img-box">
						<view class="s-title">卫生间</view>
						<!-- <view class="title">前</view> -->
						<view class="" @click.stop="funPreviewImg(moreInfo.pKpersExtendList[0].persMaterialList, index)" v-if="item.type=='PK-WS-01'"
						 v-for="(item,index) in moreInfo.pKpersExtendList[0].persMaterialList" :key="index">
							<image class="img" :src="baseUrl+item.url"></image>
							<view @tap.stop="handleDelImgOne(item.id)" class="cuIcon-roundclosefill" style="position: relative;top: -365upx;text-align: right;font-size: 40upx;color: red;"></view>
						</view>
						<!-- <view class="del-img" @click.stop="handleDelImg('wsj')">删除</view> -->
						<view class="upload-img" @click.stop="funLoad('wsj')">上传</view>
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
								<view class="contnet">
									{{moreInfo.wGpersExtendList[0].gReason?moreInfo.wGpersExtendList[0].gReason:'无'}}
								</view>
								<view class="title">
									改造原因
								</view>
							</view>
							<view class="col">
								<view class="contnet">
									{{moreInfo.wGpersExtendList[0].gPlanTime?moreInfo.wGpersExtendList[0].gPlanTime:'无'}}
								</view>
								<view class="title">
									列入计划的年度
								</view>
							</view>
						</view>
						<view class="row flex">
							<view class="col">
								<view class="contnet">
									{{moreInfo.wGpersExtendList[0].gCapitalType?moreInfo.wGpersExtendList[0].gCapitalType:'无'}}
								</view>
								<view class="title">
									资金补助类型
								</view>
							</view>
							<view class="col">
								
								<view class="contnet">
									{{moreInfo.wGpersExtendList[0].gTransStatus?moreInfo.wGpersExtendList[0].gTransStatus:'无'}}
								</view>
								<view class="title">
									改造状态
								</view>
							</view>
						</view>
						<view class="row flex">
							<view class="col">
								
								<view class="contnet">
									{{moreInfo.renovated?moreInfo.renovated:'无'}}
								</view>
								<view class="title">
									危改类型
								</view>
							</view>
							<view class="col">		
								<view class="contnet">
									{{moreInfo.area?moreInfo.area:'无'}}
								</view>
								<view class="title">
									面积
								</view>
							</view>
						</view>
						<view class="row flex">
							<view class="col">
								
								<view class="contnet">
									{{moreInfo.otherRenovatedArea ?moreInfo.otherRenovatedArea :'无'}}
								</view>
								<view class="title">
									其他危改房面积
								</view>
							</view>
							<view class="col">
								
								<view class="contnet">
									{{moreInfo.kitchen ?moreInfo.kitchen:'无'}}
								</view>
								<view class="title">
									卫生间类型
								</view>
							</view>
						</view>
						<view class="row flex">
							<view class="col">				
								<view class="contnet">
									{{moreInfo.toilet?moreInfo.toilet:'无'}}
								</view>
								<view class="title">
									卫生间类型
								</view>
							</view>
							<view class="col">
								<view class="contnet">
								</view>
								<view class="title">
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
						<view class="" @click.stop="funPreviewImg(moreInfo.wGpersExtendList[0].persMaterialList, index)" v-if="item.type=='WG-ZF-01'"
						 v-for="(item,index) in moreInfo.wGpersExtendList[0].persMaterialList" :key="index">
							<image class="img" :src="baseUrl+item.url"></image>
							<view @tap.stop="handleDelImgOne(item.id)" class="cuIcon-roundclosefill" style="position: relative;top: -365upx;text-align: right;font-size: 40upx;color: red;"></view>
						</view>
						<!-- <view class="del-img" @click.stop="handleDelImg('zf')">删除</view> -->
						<view class="upload-img" @click.stop="funLoad('zf')">上传</view>
						<!-- <view class="title" style="margin-top: 40upx;">后</view> -->
						<!-- <image class="img" :src="baseUrl+item.url" v-if="item.type=='WG-ZF-02'" v-for="(item,index) in moreInfo.wGpersExtendList[0].persMaterialList" :key="index"></image> -->
					</view>
					<view class="img-box">
						<view class="s-title">厨房</view>
						<!-- <view class="title">前</view> -->
						<view class="" @click.stop="funPreviewImg(moreInfo.wGpersExtendList[0].persMaterialList, index)" v-if="item.type=='WG-CF-01'"
						 v-for="(item,index) in moreInfo.wGpersExtendList[0].persMaterialList" :key="index">
							<image class="img" :src="baseUrl+item.url"></image>
							<view @tap.stop="handleDelImgOne(item.id)" class="cuIcon-roundclosefill" style="position: relative;top: -365upx;text-align: right;font-size: 40upx;color: red;"></view>
						</view>

						<!-- <view class="del-img" @click.stop="handleDelImg('cf')">删除</view> -->
						<view class="upload-img" @click.stop="funLoad('cf')">上传</view>
						<!-- <view class="title" style="margin-top: 40upx;">后</view> -->
						<!-- <image class="img" :src="baseUrl+item.url" v-if="item.type=='WG-CF-02'" v-for="(item,index) in moreInfo.wGpersExtendList[0].persMaterialList" :key="index"></image> -->
					</view>
					<view class="img-box">
						<view class="s-title">卫生间</view>
						<!-- <view class="title">前</view> -->
						<view class="" @click.stop="funPreviewImg(moreInfo.wGpersExtendList[0].persMaterialList, index)" v-if="item.type=='WG-WS-01'"
						 v-for="(item,index) in moreInfo.wGpersExtendList[0].persMaterialList" :key="index">
							<image class="img" :src="baseUrl+item.url"></image>
							<view @tap.stop="handleDelImgOne(item.id)" class="cuIcon-roundclosefill" style="position: relative;top: -365upx;text-align: right;font-size: 40upx;color: red;"></view>
						</view>
						<!-- <view class="del-img" @click.stop="handleDelImg('wsj')">删除</view> -->
						<view class="upload-img" @click.stop="funLoad('wsj')">上传</view>
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
						<view class="" @click.stop="funPreviewImg(moreInfo.yBpersExtendList[0].persMaterialList, index)" v-if="item.type=='YB—01'"
						 v-for="(item,index) in moreInfo.yBpersExtendList[0].persMaterialList" :key="index">
							<image class="img" :src="baseUrl+item.url"></image>
							<view @tap.stop="handleDelImgOne(item.id)" class="cuIcon-roundclosefill" style="position: relative;top: -365upx;text-align: right;font-size: 40upx;color: red;"></view>
						</view>
						<!-- <view class="del-img" @click.stop="handleDelImg('bq')">删除</view> -->
						<view class="upload-img" @click.stop="funLoad('bq')">上传</view>
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
		<kd-preview-image v-model="show" :images="urlstring" :current="urlIndex"></kd-preview-image>
	</view>
</template>

<script>
	import Cookies from 'js-cookie'
	import {
		apps
	} from '../../utils/services.js'
	import {
		baseUrl,
		uploadUrl
	} from '../../utils/request.js'
	import KdPreviewImage from "@/components/kd-preview-image/kd-preview-image" // 将文件引入项目中
	export default {
		components: {
			KdPreviewImage
		},
		data() {
			return {
				title: 'Hello',
				showLogin: false,
				isLogin: false,
				tagbarIndex: 0,
				tagbarList: [{
						title: '贫困户',
						type: 0,
						show: false
					},
					{
						title: '危改户',
						type: 1,
						show: false
					},
					{
						title: '异地搬迁户',
						type: 2,
						show: false
					}
				],
				user: '',
				password: '',
				info: {},
				moreInfo: {},
				userId: '',
				baseUrl: baseUrl,
				uploadUrl: uploadUrl,
				// 图片上传暂时的数组长度
				imgNumList: [],
				urlObj: {},
				urlId: '',
				show: false,
				urlstring: [],
				urlIndex: 0
			}
		},
		onLoad() {

			// uni.removeStorageSync('Authorization')
			let url = window.location.search;
			this.urlObj = window.location
			console.log(this.urlObj, 'this.urlObj.origin')
			let theRequest = new Object();
			if (url.indexOf("?") != -1) {
				let str = url.substr(1);
				let strs = str.split("&");
				for (let i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
				}
			}
			this.userId = theRequest.id;
			// this.userId = '322a9d4d45a147a080e257e6b87754cf';
			// if(theRequest.token){
			// 	let  in60Minutes  =  1 / 24 ;
			// 	Cookies.set('Authorization',theRequest.token,{ 
			// 		expires:in60Minutes 
			// 	})
			// 	window.close(); 
			// 	window.location.href=this.urlObj.origin+this.urlObj.pathname+'?id='+this.urlId+this.urlObj.hash
			// 	uni.setStorageSync('Authorization',theRequest.token)
			// }
			this.urlId = theRequest.id
			this.getBaseInfo(theRequest.id)
			// this.getBaseInfo('322a9d4d45a147a080e257e6b87754cf')
			// if(uni.getStorageSync('Authorization')){
			// 	this.getMoreInfo(theRequest.id)
			// }

		},
		methods: {
			getBaseInfo(id) {
				console.log('id:', id);
				apps.getBaseInfo(id).then(res => {
					if (res.code == 200) {
						this.info = res.data;
						console.log('info', res);
					} else {
						if (res.code == 401) {
							uni.showToast({
								title: '登陆超时请重新登录',
								icon: 'none'
							})
							Cookies.remove('Authorization');
							// uni.removeStorageSync('Authorization')
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}
				})
			},
			getMoreInfo(id) {
				apps.getMoreInfo(id).then(res => {
					if (res.code == 200) {
						this.moreInfo = res.data;
						if (res.data.poor) {
							this.tagbarIndex = 0
							this.tagbarList[0].show = true
						}
						if (res.data.criticalReform) {
							if (res.data.poor) {
								this.tagbarIndex = 0
							} else {
								this.tagbarIndex = 1
							}
							this.tagbarList[1].show = true
						}
						if (res.data.move) {
							if (res.data.poor) {
								this.tagbarIndex = 0
							} else if (res.data.criticalReform) {
								this.tagbarIndex = 1
							} else {
								this.tagbarIndex = 2
							}
							this.tagbarList[2].show = true
						}
						this.isLogin = true
						this.showLogin = false
					} else {
						if (res.code == 401) {
							uni.showToast({
								title: '登陆超时请重新登录',
								icon: 'none'
							})
							Cookies.remove('Authorization');
							this.showLogin = true
							// uni.removeStorageSync('Authorization')
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					}
				})
			},
			close() {
				this.showLogin = false
			},
			toLogin() {
				if (Cookies.get('Authorization')) {
					this.getMoreInfo(this.userId)
				} else {
					this.showLogin = true
				}
			},
			login() {
				if (this.user.trim() == '') {
					uni.showToast({
						title: '请输入用户名',
						icon: 'none'
					})
					return
				}

				if (this.password.trim() == '') {
					uni.showToast({
						title: '密码',
						icon: 'none'
					})
					return
				}
				apps.login({
					username: this.user,
					password: this.password
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: '登录成功',
							icon: 'none'
						})
						let in60Minutes = 1 / 24;
						Cookies.set('Authorization', res.token, {
							expires: in60Minutes
						})
						// uni.setStorageSync('Authorization',res.token)
						this.getMoreInfo(this.userId)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch(() => {
					uni.showToast({
						title: '登录失败',
						icon: 'none'
					})
				})
			},
			// 切换类型： 贫困 危改 搬迁
			handleChange(index) {
				this.tagbarIndex = index
			},
			// 预览头像
			handleImgAvator(url) {
				uni.previewImage({
					urls: [url],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			/**
			 * 预览图片
			 * @param {String} urlList  图片地址  
			 * @param {Number} index 当前图片index
			 */
			funPreviewImg(urlList, index) {
				console.log(urlList);
				let urls = [];
				urlList.map(item => {
					urls.push(this.baseUrl + item.url);
				});
				this.urlIndex = index
				this.urlstring = urls
				this.show = true
				// uni.previewImage({
				// 	current: index,
				//             urls: urls,
				//             longPressActions: {
				//                 itemList: ['发送给朋友', '保存图片', '收藏'],
				//                 success: function(data) {
				//                     console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				//                 },
				//                 fail: function(err) {
				//                     console.log(err.errMsg);
				//                 }
				//             }
				//         });
			},
			// 删除图片
			handleDelImg(type) {
				let info = this.tagbarList[this.tagbarIndex];
				let pType = '';
				console.log(info, type);
				if (info.type == 0) { //贫困户
					switch (type) {
						case 'zf':
							pType = 'PK-ZF-01';
							break;
						case 'cf':
							pType = 'PK-CF-01';
							break;
						case 'wsj':
							pType = 'PK-WS-01';
							break;
					}
				}
				if (info.type == 1) { //危改户
					switch (type) {
						case 'zf':
							pType = 'WG-ZF-01';
							break;
						case 'cf':
							pType = 'WG-CF-01';
							break;
						case 'wsj':
							pType = 'WG-WS-01';
							break;
					}
				}
				if (info.type == 2) { //异地搬迁户
					pType = 'YB—01';
				}
				apps.delpictures({
					type: pType,
					subject: this.moreInfo.wGpersExtendList[0].id
				}).then(res => {
					this.getMoreInfo(this.userId)
					uni.showToast({
						title: '操作成功',
						icon: 'none'
					})
				}).catch(() => {
					uni.showToast({
						title: '操作失败',
						icon: 'none'
					})
				})
			},
			//删除图片-单删
			handleDelImgOne(id) {
				apps.delImgOne(id).then(res => {
					if (res.code == 200) {
						this.getMoreInfo(this.userId);
						uni.showToast({
							title: '操作成功',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '操作失败',
							icon: 'none'
						})
					}
				}).catch(() => {
					uni.showToast({
						title: '操作失败',
						icon: 'none'
					})
				})
			},
			/**
			 * 上传图片
			 * @param {String} type 类型  厨房 住房 卫生间 搬迁
			 */
			funLoad(type) {
				let that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: function(res) {
						this.imgNumList = [];
						res.tempFilePaths.map(url => {
							that.funUploadImgToServer(url, res.tempFilePaths.length, type);
						});
					}
				});
			},
			// 上传到服务器
			funUploadImgToServer(url, num, type) {
				let that = this;
				uni.uploadFile({
					url: this.uploadUrl, //上传接口地址
					filePath: url,
					name: 'file',
					formData: {
						'user': 'test'
					},
					success: (uploadFileRes) => {
						this.imgNumList.push(uploadFileRes.data);
						// 为了防止图片上传延迟，所以用上传完成的个数进行判断
						// if(num == this.imgNumList.length){
						// 此时图片上传已全部完成
						that.funLoadToDataBase(type, JSON.parse(uploadFileRes.data));
						// }
					},
					fail: (e) => {
						console.log('error:', e);
					}
				});
			},
			// 更新图片数据
			funLoadToDataBase(type, url) {
				let info = this.tagbarList[this.tagbarIndex];
				// {{info.poor?'贫困户':''}}{{info.poor&&info.criticalReform?'/':''}}{{info.criticalReform?'危改户':''}}{{info.criticalReform&&info.move?'/':''}}{{info.move?'异地搬迁户':''}}
				// PK-ZF-01 贫困户住房   PK-CF-01 贫困户厨房  PK-WS-01 贫困户卫生间
				// YB—01 搬迁户
				// WG-ZF-01 危改户住房 WG-CF-01 危改户厨房 WG-WS-01 危改户卫生间
				let pType = '';
				console.log(info, type);
				if (info.type == 0) { //贫困户
					switch (type) {
						case 'zf':
							pType = 'PK-ZF-01';
							break;
						case 'cf':
							pType = 'PK-CF-01';
							break;
						case 'wsj':
							pType = 'PK-WS-01';
							break;
					}
				}
				if (info.type == 1) { //危改户
					switch (type) {
						case 'zf':
							pType = 'WG-ZF-01';
							break;
						case 'cf':
							pType = 'WG-CF-01';
							break;
						case 'wsj':
							pType = 'WG-WS-01';
							break;
					}
				}
				if (info.type == 2) { //异地搬迁户
					pType = 'YB—01';
				}

				let params = [];
				// this.imgNumList.map( e => {
				// 	let ele = JSON.parse(e);
				params.push({
					fileName: url.fileName,
					subject: this.moreInfo.wGpersExtendList[0].id,
					type: pType,
					url: url.fileName
				});
				// });
				apps.uploadpictures({
					subject: this.moreInfo.wGpersExtendList[0].id,
					type: pType,
					persMaterialList: params
				}).then(res => {
					this.imgNumList = [];
					this.getMoreInfo(this.userId);
				}).catch(() => {
					uni.showToast({
						title: '操作失败',
						icon: 'none'
					})
				})
			},
			logout() {
				let that = this
				uni.showModal({
					title: '提示',
					content: '是否退出登录？',
					success: function(res) {
						if (res.confirm) {
							wx.removeStorageSync('Authorization')
							that.user = '',
								that.password = '',
								that.moreInfo = {},
								// 图片上传暂时的数组长度
								that.imgNumList = [],
								that.isLogin = false,
								window.location.href = that.urlObj.origin + that.urlObj.pathname + '?id=' + that.urlId + that.urlObj.hash
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/stylesheet.css';

	.logout {
		height: 68upx;
		width: 68upx;
		border-radius: 50%;
		background: rgba(58, 123, 255, 1);
		;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 30upx;
		right: 30upx;

		.logout-img {
			height: 44upx;
			width: 44upx;
		}
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
		background-color: #FF0000;
		min-height: 100vh;
		padding-bottom: 40upx;

		.header {
			width: 100%;
			height: 484upx;
			background-color: #FF0000;
			background-image: url(../../static/top.png);
			background-size: 100% 100%;
		}

		.info {
			padding: 0 28upx;

			.base-info {
				// height: 800upx;
				background: linear-gradient(to bottom, rgba(216, 234, 255, 1) 0%, rgba(255, 255, 255, 1) 100%);
				border-radius: 16upx;
				padding: 0 28upx 0upx 28upx;

				.top {
					.no-box {
						width: 200upx;
						height: 80upx;
						border-radius: 100upx;
						margin-top: 30upx;
						margin-left: -28upx;
						.no {
							width: 200upx;
							height: 80upx;
							border-radius: 100upx;
							font-size: 40upx;
							color: #C3AD87;
							
						}
						.no-pic{
							height: 52upx;
							width: 102upx;
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
					margin: 0upx 0 20upx 0;

					.row {
						min-height: 150upx;
						
						.col:first-child {
							width: 40%;
							margin-left: 10%;
						}

						.col:last-child {
							width: 40%;
							padding-left: 5%;
							margin-left: 18%;
						}

						.col {
							.title {
								color: #959595;
								font-size: 26upx;
							}

							.contnet {
								font-size: 32upx;
								font-weight: bold;
							}
						}
					}
				}
			}

			.policy {
				background-color: #ffffff;
				border-radius: 16upx;
				margin-top: 20upx;

				.title {
					font-size: 32upx;
					padding: 20upx 40upx 20upx 28upx;
					font-weight: 600;
					border-bottom: 1px solid rgba(0,0,0,0.2);
				}

				.policy-content {
					padding: 0 28upx 100upx 28upx;
					font-size: 40upx;
					font-weight: bold;
					color: #656565;
					margin-top: 40upx;
					.no-yj{
						text-align: center;
						image{
							width: 200upx;
							height: 126upx;
						}
						view{
							font-size: 24upx;
							color: #9da8c4;
						}
					}
				}
			}

			.show-more {
				height: 96upx;
				background: #FFFFFF;
				border-radius: 48upx;
				margin-top: 20upx;
				color: #000000;
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
							min-height: 120upx;
							.col:first-child {
								width: 40%;
								padding-left: 5%;
							}

							.col:last-child {
								width: 40%;
								margin-left: 30%;
							}

							.col {
								.title {
									color: #959595;
									font-size: 26upx;
								}

								.contnet {
									font-size: 32upx;
									font-weight: bold;
								}
							}
						}
					}

					.remark-box {
						padding: 0 28upx 100upx 28upx;
						background: rgba(255, 255, 255, 1);
						border-radius: 16upx;
						margin-top: 20upx;
						.title {
							font-size: 40upx;
							font-weight: bold;
							color: #656565;
							margin-left: 28upx;
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
							position: relative;
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
					background: #FF0000;
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

	.del-img {
		width: 100%;
		height: 58upx;
		background-color: #FF0000;
		text-align: center;
		line-height: 58upx;
		font-size: 24upx;
		color: #fff;
		margin: 0 auto;
		margin-top: 10upx;
		border-radius: 8upx;
	}

	.upload-img {
		width: 100%;
		height: 58upx;
		background-color: #FF0000;
		text-align: center;
		line-height: 58upx;
		font-size: 24upx;
		color: #fff;
		margin: 0 auto;
		margin-top: 10upx;
		border-radius: 8upx;
	}
</style>
