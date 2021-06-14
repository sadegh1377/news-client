import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import vueFilePond, {setOptions} from 'vue-filepond';
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

setOptions({
    server: {
        url: 'http://localhost:4000/images'
    }
});

// Then create component
const FilePond = vueFilePond(FilePondPluginFileValidateType,
    FilePondPluginImagePreview)
import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faEye,
    faHeart,
    faUser,
    faClock,
    faTrashAlt,
    faEyeSlash,
    faTrash,
    faEdit,
    faReplyAll
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

library.add(faEye, faHeart, faUser, faClock, faTrashAlt, faEyeSlash, faTrash, faReplyAll, faEdit)

Vue.component('font-awesome-icon', FontAwesomeIcon)

const base = axios.create({
    baseURL: "http://localhost:8000/"
});
Vue.prototype.$http = base;

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
