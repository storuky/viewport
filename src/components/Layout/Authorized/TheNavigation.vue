<template>
  <!-- <v-navigation-drawer app class="navigation"> -->
  <div>
    <TheNavigationHeader />
    <v-divider></v-divider>
    <TheNavigationList />
  </div>
  <!-- </v-navigation-drawer> -->
</template>

<script>
  import TheNavigationHeader from './TheNavigation/TheNavigationHeader'
  import TheNavigationList from './TheNavigation/TheNavigationList'
  export default {
    name: 'TheNavigation',
    components: {
      TheNavigationHeader,
      TheNavigationList
    }
  }
</script>

<style>
  .navigation .v-list__group__items > .active {
    background: #df4e9e;
    color: white;
  }

  .user-email {
    font-size: 12px;
    color: #6b6a6a;
  }
</style>
