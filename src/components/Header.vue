<template>
  <header>
    <v-toolbar app fixed color="primary">
      <v-toolbar-title>
        <v-toolbar-side-icon v-if="isLogin"/>
        <span class="text--text">Video Player</span>
      </v-toolbar-title>
      <template v-if="isLogin">
        <v-spacer class="mx-3">
          <SearchField/>
        </v-spacer>
        <AccountInfo/>
      </template>
    </v-toolbar>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import VTextField from 'vuetify-components/VTextField'
import AccountInfo from '@/components/AccountInfo.vue'
import SearchField from '@/components/SearchField.vue'
import store from '@/store'

export default Vue.extend({
  components: {
    VTextField,
    AccountInfo,
    SearchField
  },
  computed: {
    user() {
      return store.state.user
    },
    isLogin() {
      return this.user !== null
    }
  }
})
</script>
