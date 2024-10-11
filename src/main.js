import Vue from 'vue'
import App from './App.vue'
import pinia from './store'
import vuetify from './plugins/vuetify'
Vue.config.productionTip = false

new Vue({
  pinia,
  vuetify,
  render: h => h(App)
}).$mount('#app')
