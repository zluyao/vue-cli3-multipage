<template>
	<div>
		<h2 class="home">
			<div class="home-inner">xxxxxx</div>
		</h2>
		<h3 class="red">{{msg}}</h3>
		<ul>
			<li><a href="./page1.html">to1</a></li>
			<li><a href="./page2.html">to2</a></li>
			<br>
			<div @click="aa">to11</div>
		</ul>
	</div>
</template>

<script>
import baseUrl from '@lib/common';

export default {
	name: 'HelloWorld',
	data() {
		return {
			msg: "this is home"
		}
	},
	created() {
		console.log('baseurl is: ' + baseUrl);
		console.log(111);
	},
	mounted() {
		console.log(22, this);
		this.$post('/admin/login', {
			account: '18258817916',
			password: 'e10adc3949ba59abbe56e057f20f883e'
		}).then((res) => {
			console.log('获取数据');
			console.log(res);
		})

	},
	methods: {
		aa() {
			window.location.href = './page1.html'
		}
	},
	components: {
	},
}
</script>
<style scoped lang="less">
.home {
  padding-bottom: 20px;
  .home-inner {
    color: green;
  }
}
</style>
