<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" app>
      <TheNavigation />
    </v-navigation-drawer>
    <router-view></router-view>
  </v-app>
</template>

<script>
  import TheNavigation from './Authorized/TheNavigation'

  export default {
    name: "AuthorizedLayout",
    components: {
      TheNavigation
    },
    methods: {
      setHeader(header) {
        this.header = header
      }
    },
    computed: {
      drawer: {
        get () {
          return this.$store.getters['navigation/drawer']
        },
        set (value) {
          this.$store.dispatch('navigation/setDrawer', value)
        }
      }
    }
  }
</script>