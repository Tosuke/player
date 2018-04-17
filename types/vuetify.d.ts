declare module 'vuetify-components/Vuetify' {
  import { PluginObject } from 'vue'
  var Vuetify: PluginObject<any>
  export default Vuetify
}

declare module 'vuetify-components/*' {
  import Vue from 'vue'
  export default Vue
}