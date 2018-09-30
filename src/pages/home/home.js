import Vue from 'vue'
import App from './home.vue'
import "@/style/common.less"

console.log("home")

new Vue({
    render: h => h(App)
  }).$mount('#app')
