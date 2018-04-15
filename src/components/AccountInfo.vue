<template>
  <div>
    <v-tooltip bottom>
      <v-menu offset-y slot="activator">
        <v-avatar size="40" slot="activator">
          <img :src="user.photoURL"/>
        </v-avatar>
        <v-list>
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="user.photoURL">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ user.displayName }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider/>
          <v-list-tile @click.stop="dialog = true">
            <v-list-tile-title>
              <v-icon>settings</v-icon>
              アカウント
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile @click="signOut">
            <v-list-tile-title>
              <v-icon>power_settings_new</v-icon>
              ログアウト
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <span>{{ user.displayName }} ({{ user.email }})</span>
    </v-tooltip>
    <v-dialog v-model="dialog">
      <v-card>
        <v-toolbar card color="primary">
          <v-btn icon @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title class="text--text">アカウント</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-list>
            <v-list-tile v-for="prop in userProps" :key="prop.propName">
               <v-list-tile-title>{{ prop.name }}</v-list-tile-title>
               <v-list-tile-sub-title>{{ user[prop.propName] }}</v-list-tile-sub-title>
            </v-list-tile>
          </v-list>
          <v-divider/>
          <v-btn color="error" @click.stop="confirmDialog = true">アカウントを削除する</v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDialog" max-width="400px">
      <v-card>
        <v-card-title><span class="title">本当にアカウントを削除しますか？</span></v-card-title>
        <v-card-actions>
          <v-btn color="error" @click="deleteAccount" :loading="accountDeleting">はい</v-btn>
          <v-btn color="primary" @click="confirmDialog = false">いいえ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from '@/firebase'
import store from '@/store'
import { mapState } from 'vuex'
import { VAvatar, VDialog } from 'vuetify'

export default {
  components: {
    VAvatar,
    VDialog
  },
  data() {
    return {
      dialog: false,
      confirmDialog: false,
      accountDeleting: false,
      userProps: [
        {
          name: '名前',
          propName: 'displayName'
        },
        {
          name: 'メール',
          propName: 'email'
        }
      ]
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async signOut() {
      await store.dispatch('signOut')
      this.$router.push('/login')
    },
    async deleteAccount() {
      this.accountDeleting = true
      await store.dispatch('deleteUser')
      this.accountDeleting = false
      this.$router.push('/login')
    }
  }
}
</script>
