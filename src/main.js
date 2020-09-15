import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Firebase from 'firebase'
import { firestorePlugin } from 'vuefire'
//import VueFire from 'vuefire'

Vue.use(Firebase)
Vue.use(firestorePlugin)

//Vue.use(VueFire)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


