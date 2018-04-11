import Vue from 'vue'
import App from '@/App.vue'

export function initializeVue() {
  new Vue({
    el: '#app',
    render: h => h(App)
  })
}
