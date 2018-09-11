<template>
  <div class="page">
    <app-header
      title="Profile"
      :tabs="tabs"
      :activeTab="activeTab"
      @activeTabChanged="setActiveTab">
    </app-header>

    <v-content class="page-content">
      <div>
        <div class="pa-3 text-xs-left">
          <h2>{{tabs[activeTab].name}}</h2>
        </div>
      </div>
    </v-content>
  </div>
</template>

<script>
  import AppHeader from './AppHeader'

  export default {
    name: 'TheProfile',
    components: {
      AppHeader
    },
    data () {
      return {
        activeTab: 0,
        tabs: [{name: 'Information'}, {name: 'Settings'}]
      }
    },
    methods: {
      setActiveTab (value) {
        this.activeTab = value
      }
    }
  }
</script>