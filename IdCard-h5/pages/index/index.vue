<template>
	<view class="content">
	   <text class="IdNumber">身份证号码：</text>	
	   <input type="text" v-model="IdNumber" class="IdCard" @blur="IDrules"  />
	   <button class="IdSearch" size="mini" type="primary" @click="jumpDetail">搜索</button>
	</view>
</template>

<script>
	import {baseUrl}from '../../utils/request.js'
	import {apps }from '../../utils/services.js'
	export default {
		data() {
			return {
				IdNumber:'',
				baseUrl:baseUrl,
				isFlag:false
			}
		},
		onLoad() {
		},
		methods: {
			// 跳转h5页面
            jumpDetail(){
				apps.cardID(this.IdNumber).then(res=>{
					console.log(res.data)
					window.location.href = this.baseUrl +  `/h5/?id=${res.data}`
					// http://com.dl.house.vaiwan.com/h5/?id=00048c842e504999b372acf81a2748f6#/pages/index/index
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
			}
		}
	}
</script>

<style>
.content{
	width: 100%;
	display: flex;	
	position: fixed;
	padding: 30upx;
	box-sizing: border-box;
    top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
}
.IdNumber{
	font-size:30upx;
}
.IdCard{
	width: 350upx;
	border: 2upx solid #000000;
	font-size:30upx;
}
.IdSearch{
	width: 150upx;
	height: 50upx;
	font-size:30upx;
	line-height: 50upx;
}
</style>
