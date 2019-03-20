import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueSweetalert2);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')