<template>
  <v-jumbotron color="grey lighten-3">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-2 primary-text--text">動画の管理をもっと便利に。</h3>
          <span class="subheading secondary-text--text">
            Video Playerを使うと、あなたがGoogle Photosに保存している動画を効率的に管理・試聴できます。
          </span>
          <v-divider class="my-3"/>
          <v-btn large color="accent" @click="login">
            登録
          </v-btn>
          <v-btn large color="primary" @click="login">
            ログイン
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script lang="ts">
import Vue from 'vue'
import VJumbotron from 'vuetify-components/VJumbotron'
import VAvatar from 'vuetify-components/VAvatar'
import { createOAuthURL } from '@/auth'

export default Vue.extend({
  components: {
    VJumbotron,
    VAvatar
  },
  methods: {
    login() {
      window.location.href = createOAuthURL()
    }
  }
})
</script>
