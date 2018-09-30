<template>
	<div>
		<h2 class="home">
			<div class="home-inner">xxxxxx</div>
		</h2>
		<h3 class="red">{{msg}}</h3>
		<ul>
			<li><a href="./page1.html">to1</a></li>
			<li><a href="./page2.html">to2</a></li>
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
		console.log('baseurl: ' + baseUrl);
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
