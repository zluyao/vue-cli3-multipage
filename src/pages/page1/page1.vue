<template>
	<div>
		<img src="../../assets/logo.png"/>
		<p class="red">{{msg}}</p>
		<About></About>
	</div>
</template>

<script>
	import About from '@/components/About.vue'
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: "this is page1"
			}
		},
		components: {
			About
		},
	}
</script>
