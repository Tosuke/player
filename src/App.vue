<template>
  <div id="app">
    <v-app>
      <Header/>
      <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import firebase from '@firebase/app'
import Header from '@/components/Header'

export default {
  components: {
    Header
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
