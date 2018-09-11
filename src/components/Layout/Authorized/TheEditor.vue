<template>
  <div class="editor">
    <app-header
      :title="activeProject.name"
      :tabs="activeProject.charts"
      :moreMenuItems="moreMenuItems"
      :activeTab="activeTab"
      @activeTabChanged="setActiveTab">
      <template slot="tab" slot-scope="slotScope">
        {{slotScope.tab.name}}
        <v-icon class="chart-tab-action" size="14" @mousedown.stop @click.stop="chartSettings(slotScope.tab.id)">settings</v-icon>
        <v-icon class="chart-tab-action" size="16" @mousedown.stop @click.stop="deleteChart(slotScope.tab.id)">close</v-icon>
      </template>
      <template slot="afterTabs">
        <div class="v-tabs__div">
          <div class="v-tabs__item new-chart-tab" @click="newChart">+ New Chart</div>
        </div>
      </template>
    </app-header>

    <v-content class="editor-content">
      <Viewport>
        <BaseObject
          v-for="object in objects"
          :key="object.id"
          v-bind="object">
        </BaseObject>
      </Viewport>
      <ThePropertyEditor class="property-editor" />
    </v-content>
  </div>
</template>

<script>
  import Viewport from './TheEditor/Viewport.vue'
  import BaseObject from './TheEditor/BaseObject.vue'
  import AppHeader from './AppHeader'
  import ThePropertyEditor from './TheEditor/ThePropertyEditor'

  import objects from './generateObjects'
  import moreMenuItems from './TheEditor/moreMenuItems'

  export default {
    name: 'TheEditor',
    components: {
      Viewport,
      BaseObject,
      AppHeader,
      ThePropertyEditor
    },
    mounted () {
      this.objects = objects
    },
    data () {
      return {
        activeTab: 0,
        activeProject: {
          name: 'Awesome project',
          charts: [{name: 'Chart 1', id: 1}, {name: 'Chart 2', id: 2}]
        },
        moreMenuItems
      }
    },
    computed: {
      objects: {
        get () {
          return this.$store.getters['object/list']
        },
        set (objects) {
          this.$store.dispatch('object/setList', objects)
        }
      }
    },
    methods: {
      chartSettings (chartId) {
        console.log('chartSettings')
      },
      deleteChart (chartId) {
        const index = this.activeProject.charts.findIndex(chart => chart.id == chartId)
        this.activeProject.charts.splice(index, 1)
        this.$nextTick(function () {
          if (index <= this.activeTab) {
            this.activeTab = this.activeTab - 1
          }
        })
      },
      newChart () {
        this.activeProject.charts.push({name: "New Tab", id: Math.random()})
        this.$nextTick(function () {
          this.activeTab = this.activeProject.charts.length - 1
        })
      },
      mergeParams (obj1, obj2) {
        return {...obj1, ...obj2}
      },
      setActiveTab (val) {
        this.activeTab = val
      }
    }
  }
</script>

<style scoped>
  .editor {
    height: 100%;
  }

  .editor-content {
    height: 100%;
  }
</style>

<style>
  .new-chart-tab {
    background: #1976d1;
    color: white !important;
    font-weight: bold;
    cursor: pointer;
    opacity: 1 !important;
  }

  .new-chart-tab:hover {
    filter: brightness(110%);
  }

  .v-icon.chart-tab-action {
    position: relative;
    left: 5px;
    margin-left: 4px;
  }

  .v-icon.chart-tab-action:hover {
    background: #e7e7e7;
  }
</style>
