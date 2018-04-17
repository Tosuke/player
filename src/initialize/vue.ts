import Vue from 'vue'

import Vuetify from 'vuetify-components/Vuetify'
import VApp from 'vuetify-components/VApp'
import VGrid from 'vuetify-components/VGrid'
import VDivider from 'vuetify-components/VDivider'
import VList from 'vuetify-components/VList'
import VCard from 'vuetify-components/VCard'
import VToolbar from 'vuetify-components/VToolbar'
import VTooltip from 'vuetify-components/VTooltip'
import VMenu from 'vuetify-components/VMenu'
import VBtn from 'vuetify-components/VBtn'
import VIcon from 'vuetify-components/VIcon'
import transitions from 'vuetify-components/transitions'

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
