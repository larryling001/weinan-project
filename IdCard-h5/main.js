import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.filter('filterPeopleNumber',(value)=>{
	if(value === undefined){
		return ;
	}
	else{
		let newValue = ['', '', ''];
		    let fr = 1000;
		    const ad = 1;
		    let num = 3;
		    const fm = 1;
		    while (value / fr >= 1) {
		      fr *= 10;
		      num += 1;
		      // console.log('数字', value / fr, 'num:', num);
		    }
		    if (num <= 4) { // 千
		      newValue[1] = '千';
		      newValue[0] = parseInt(value / 1000).toFixed(2) + '';
		    } else if (num <= 8) { // 万
		      const text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万';
		      const fm = '万' === text1 ? 10000 : 10000000;
		      newValue[1] = text1;
		      newValue[0] = (value / fm).toFixed(2) + '';
		    } else if (num <= 16) {// 亿
		      let text1 = (num - 8) / 3 > 1 ? '千亿' : '亿';
		      text1 = (num - 8) / 4 > 1 ? '万亿' : text1;
		      text1 = (num - 8) / 7 > 1 ? '千万亿' : text1;
		      // tslint:disable-next-line:no-shadowed-variable
		      let fm = 1;
		      if ('亿' === text1) {
		        fm = 100000000;
		      } else if ('千亿' === text1) {
		        fm = 100000000000;
		      } else if ('万亿' === text1) {
		        fm = 1000000000000;
		      } else if ('千万亿' === text1) {
		        fm = 1000000000000000;
		      }
		      newValue[1] = text1;
		      newValue[0] = parseInt(value / fm).toFixed(2) + '';
		    }
		    if (value < 1000) {
		      newValue[1] = '';
		      newValue[0] = value + '';
		    }
		    return newValue.join('');
	}
	
	return value
})
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
