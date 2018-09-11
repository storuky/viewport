<template>
  <v-list-group v-bind:prepend-icon="group.icon" :value="false">
    <v-list-tile slot="activator">
      <v-list-tile-title>{{group.name}}</v-list-tile-title>
    </v-list-tile>

    <NavigationListItem v-for="item in group.items" :key="item.id" :item="item" />
  </v-list-group>
</template>

<script>
  import NavigationListItem from './NavigationListItem'
  export default {
    name: "NavigationListGroup",
    props: {
      group: Object
    },
    components: {
      NavigationListItem
    }
  }
</script>