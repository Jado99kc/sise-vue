import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VuePageTransition from 'vue-page-transition'
 

Vue.config.productionTip = false

Vue.use(VueSweetalert2);
Vue.use(VuePageTransition);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
