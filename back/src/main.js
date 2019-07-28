import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/comment.css'
Vue.config.productionTip = false
Vue.use(Element)
new Vue({
  Element,
  router,
  render: h => h(App)
}).$mount('#app')
