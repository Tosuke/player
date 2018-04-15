import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VGrid,
  VDivider,
  VList,
  VCard,
  VToolbar,
  VTooltip,
  VMenu,
  VBtn,
  VIcon,
  transitions,
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

export function initialize() {
  Vue.use(Vuetify, {
    components: {
      VApp,
      VGrid,
      VDivider,
      VList,
      VCard,
      VToolbar,
      VTooltip,
      VMenu,
      VBtn,
      VIcon,
      transitions,
    },
    theme: {
      primary: '#2196F3',
      secondary: '#BBDEFB',
      accent: '#FF5722',
      text: '#FFFFFF',
      'primary-text': '#212121',
      'secondary-text': '#757575',
      divider: '#BDBDBD',
    }
  })
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}
