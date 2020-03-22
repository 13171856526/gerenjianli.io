// 入口文件
import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';



Vue.use(VueResource);
Vue.config.productionTip = false
var vm = new Vue({
    el: "#app",
    render: c => c(App),
})