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

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.vue'

export default Vue.extend({
  components: {
    Header
  }
})
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
