import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index'
import store from './store/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueLoading from 'vue-loading-overlay'
import vSelect from 'vue-select'
import Toaster from '@meforma/vue-toaster'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'vue-select/dist/vue-select.css'

library.add(faTrash)
library.add(faEdit)

createApp(App)
  .use(router)
  .use(store)
  .use(VueLoading)
  .use(Toaster)
  .component('v-select', vSelect)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
