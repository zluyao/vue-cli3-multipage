import Vue from 'vue'
import App from './page2.vue'
import "@/style/common.less"

console.log(222);
new Vue({
    render: h => h(App)
  }).$mount('#app')
