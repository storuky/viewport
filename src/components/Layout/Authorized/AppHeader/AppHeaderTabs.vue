<template>
  <v-tabs v-model="localActiveTab" color="white" align-with-title>
    <v-tabs-slider color="primary"></v-tabs-slider>

    <v-tab :ref="`tab${index}`" v-for="(tab, index) in tabs" :key="index">
      <slot name="tab" :tab="tab"></slot>
    </v-tab>

    <slot name="afterTabs"></slot>
  </v-tabs>
</template>

<script>
  export default {
    name: 'AppHeaderTabs',
    props: {
      tabs: Array,
      activeTab: Number
    },
    data () {
      return {
        localActiveTab: this.activeTab || 0
      }
    },
    watch: {
      localActiveTab () {
        this.$emit('activeTabChanged', this.localActiveTab)
      },
      activeTab (value) {
        this.localActiveTab = value
      }
    }
  }
</script>