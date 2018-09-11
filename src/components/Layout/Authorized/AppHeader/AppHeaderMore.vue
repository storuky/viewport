<template>
  <v-menu bottom origin="center center" transition="scale-transition" v-if="menu && menu.length">
    <v-icon slot="activator">
      more_vert
    </v-icon>

    <v-list>
      <v-list-tile v-for="(item, i) in menu" :key="i" @click="item.callback ? item.callback() : null">
        <v-list-tile-title>{{ item.name }}</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'AppHeaderMenu',
    props: {
      menu: Array
    }
  }
</script>