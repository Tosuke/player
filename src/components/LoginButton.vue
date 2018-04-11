<template>
  <button @click="login">ログイン</button>
</template>

<script>
import { createOAuthURL } from '@/auth'

export default {
  methods: {
    login() {
      window.location.href = createOAuthURL()
    }
  }
}
</script>
