import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI, { Form } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/theme-default/index.css'
// import './assets/theme/theme-green/index.css'
Vue.config.productionTip = false;
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routes from './routes'
// import axios from './axios'
// import Mock from './mock'
// Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'

import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'https://office.pintaihui.cn';

//POST传参序列化
axios.interceptors.request.use((config) => {
    if (config.method === 'post' && config.transformRequest[0].name == 'transformRequest') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => {
    if (!res.data.msg) {
        return Promise.reject(res);
    }
    return res;
}, (error) => {
    //404等问题可以在这里处理
    return Promise.reject(error);
});

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
    routes
})

// router.beforeEach((to, from, next) => {
//     //NProgress.start();
//     if (to.path == '/login') {
//         sessionStorage.removeItem('user');
//     }
//     let user = JSON.parse(sessionStorage.getItem('user'));
//     if (!user && to.path != '/login') {
//         next({ path: '/login' })
//     } else {
//         next()
//     }
// })

//router.afterEach(transition => {
//NProgress.done();
//});


new Vue({
    //el: '#app',
    //template: '<App/>',
    router,
    store,
    //components: { App }
    render: h => h(App)
}).$mount('#app')