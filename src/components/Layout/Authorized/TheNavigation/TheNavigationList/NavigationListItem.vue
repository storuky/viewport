<template>
  <v-list-tile @click="callback()">
    <v-list-tile-action v-if="item.icon">
      <v-icon>{{item.icon}}</v-icon>
    </v-list-tile-action>

    <v-list-tile-content>
      <v-list-tile-title>{{item.name}}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  export default {
    name: "NavigationListItem",
    props: {
      item: Object
    },
    methods: {
      callback () {
        if (this.item.callback) {
          this.item.callback()
          this.$store.dispatch('navigation/setDrawer', false)
        }
      }
    }
  }
</script>