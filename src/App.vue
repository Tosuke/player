<template>
  <div id="app">
    Hello World! {{ mes }}
    <LoginButton/>
    <button @click="logout">ログアウト</button>
  </div>
</template>

<script>
import firebase from '@firebase/app'
import LoginButton from '@/components/LoginButton'

export default {
  components: {
    LoginButton
  },
  data() {
    return {
      mes: firebase.auth().currentUser !== null
    }
  },
  methods: {
    async logout() {
      await firebase.auth().signOut()
    }
  }
}
</script>


<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
