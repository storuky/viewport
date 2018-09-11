<template>
  <v-list class="pt-0" dense>
    <div :key="item.id" v-for="item in items">
      <div v-if="item.items">
        <NavigationListGroup :group="item" />
      </div>
      <div v-else>
        <NavigationListItem :item="item" />
      </div>
    </div>
  </v-list>
</template>

<script>
  import NavigationListGroup from './TheNavigationList/NavigationListGroup'
  import NavigationListItem from './TheNavigationList/NavigationListItem'

  import navigationItems from './navigationItems'

  export default {
    name: "TheNavigationList",
    components: {
      NavigationListGroup,
      NavigationListItem
    },
    data () {
      return {
        items: navigationItems
      }
    }
  }
</script>