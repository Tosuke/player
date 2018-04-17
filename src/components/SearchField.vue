<template>
  <v-menu
    :value="focused"
    offset-y
    :open-on-click="false"
    nudge-top="-1"
    style="width: 100%"
    content-class="hoge"
  >
    <v-spacer slot="activator">
    <v-text-field
      lot="activator"
      solo
      :flat="flat"
      prepend-icon="search"
      append-icon="clear"
      :append-icon-cb="clearText"
      placeholder="検索"
      v-model="text"
      @focus="focused = true"
      @blur="focused = false"
    />
    </v-spacer>
    <v-list>
      <v-list-tile v-for="history in histories" :key="history">
        <v-list-tile-avatar>
          <v-icon>history</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>{{ history }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import VTextField from 'vuetify-components/VTextField'
import Vue from 'vue'

export default Vue.extend({
  components: {
    VTextField
  },
  data() {
    return {
      text: '',
      focused: false,
      histories: ['蒼き鋼のアルペジオ', '魔法少女まどか☆マギカ']
    }
  },
  computed: {
    flat(): boolean {
      return !this.focused && this.text === ''
    }
  },
  methods: {
    clearText() {
      this.text = ''
    }
  }
})
</script>
