import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index'
import store from './store/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueLoading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

library.add(faTrash)
library.add(faEdit)

createApp(App)
  .use(router)
  .use(store)
  .use(VueLoading)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
