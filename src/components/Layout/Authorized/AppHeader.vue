<template>
  <v-toolbar app color="white" class="the-header" extension-height="48">
    <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-toolbar-title>{{title}}</v-toolbar-title>

    <v-spacer></v-spacer>

    <AppHeaderMore :menu="moreMenuItems" v-if="moreMenuItems && moreMenuItems.length" />
    <app-header-tabs :activeTab="activeTab" :tabs="tabs" v-if="tabs && tabs.length" slot="extension" @activeTabChanged="activeTabChanged">
      <template slot="tab" slot-scope="slotScope">
        <slot name="tab" :tab="slotScope.tab">{{slotScope.tab.name}}</slot>
      </template>
      <template slot="afterTabs">
        <slot name="afterTabs"></slot>
      </template>
    </app-header-tabs>
  </v-toolbar>
</template>


<script>
  import AppHeaderMore from './AppHeader/AppHeaderMore'
  import AppHeaderTabs from './AppHeader/AppHeaderTabs'
  export default {
    name: 'AppHeader',
    props: {
      title: String,
      tabs: Array,
      moreMenuItems: Array,
      activeTab: Number
    },
    components: {
      AppHeaderMore,
      AppHeaderTabs
    },
    methods: {
      toggleDrawer () {
        this.$store.dispatch('navigation/toggleDrawer')
      },
      activeTabChanged (value) {
        this.$emit('activeTabChanged', value)
      }
    }
  }
</script>
