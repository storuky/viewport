<template>
  <v-list class="pa-1">
    <v-list-tile avatar>
      <v-list-tile-avatar>
        <img src="https://avatars2.githubusercontent.com/u/3216491?s=460&v=4">
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title>{{currentUser.name}}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
  export default {
    name: "TheNavigationHeader",
    data () {
      return {
        currentUser: {name: 'Pavel Kononenko'}
      }
    }
  }
</script>