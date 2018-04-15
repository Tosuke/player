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

<script>
import { mapState } from 'vuex'
import { VTextField } from 'vuetify'
import AccountInfo from '@/components/AccountInfo'
import SearchField from '@/components/SearchField'

export default {
  components: {
    VTextField,
    AccountInfo,
    SearchField
  },
  computed: {
    ...mapState(['user']),
    isLogin() {
      return this.user !== null
    }
  }
}
</script>
