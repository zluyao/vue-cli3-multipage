import Vue from 'vue'
import App from './home.vue'
import "@/style/common.less"
import { post, get } from '@lib/axios';

console.log("home")
Vue.prototype.$post = post;
Vue.prototype.$get = get;
new Vue({
  render: h => h(App)
}).$mount('#app')

