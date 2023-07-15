import Vue from 'vue'

import App from './App.vue'
import router from './router'

import './assets/main.css'
import './style.css'

import  './directives/index.js'


new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
