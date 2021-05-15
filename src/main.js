import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faEye, faHeart, faUser,faClock,faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faEye, faHeart, faUser,faClock,faTrashAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

const base = axios.create({
    baseURL: "http://localhost:4000/"
});
Vue.prototype.$http = base;

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
