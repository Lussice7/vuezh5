// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import swiper from 'vue-awesome-swiper'
import BScroll from 'better-scroll'
import Mint from 'mint-ui'
import { Toast } from 'mint-ui'

import '@/assets/js/public.js'
import '@/assets/css/public.css'
import '@/assets/css/swiper.min.css'
import '@/assets/fonts/iconfont.css'
import 'mint-ui/lib/style.css'

Vue.use(swiper)
Vue.use(router)
Vue.use(Mint)
Vue.config.productionTip = false
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
