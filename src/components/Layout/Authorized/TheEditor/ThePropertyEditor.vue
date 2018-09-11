<template>
  <v-dialog width="33%" attach=".property-editor" v-model="opened" hide-overlay persistent class="property-editor__dialog" content-class="property-editor__dialog-content" transition="property-editor-transition">
    <v-card>
      <v-toolbar class="property-editor__header" dark color="primary">
        <v-btn icon dark @click.native="opened = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Property Editor</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.native="save()">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div class="property-editor__content" v-if="activeObject">
        <component
          :is="activeObject.type + 'PropertyEditor'"
          v-bind.sync="props"
        ></component>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  import { PropertyEditor } from './Object/Types'

  export default {
    name: 'ThePropertyEditor',
    components: {
      ...PropertyEditor
    },
    methods: {
      save () {
        this.opened = false
        this.$store.dispatch('object/update', {
          id: this.activeObject.id,
          ...this.props
        })
      }
    },
    data () {
      return {
        props: null
      }
    },
    computed: {
      opened: {
        get () {
          return this.$store.getters['modals/opened']({type: 'propertyEditor'}) && this.$store.getters['object/selected'][0]
        },
        set (value) {
          this.$store.dispatch('modals/set', {value, type: 'propertyEditor'})
        }
      },
      activeObject () {
        return this.$store.getters['object/selected'][0]
      }
    },
    watch: {
      activeObject: {
        handler () {
          if (this.activeObject) {
            this.props = {settings: {...this.activeObject.info.settings}}
          }
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  .property-editor__dialog .v-dialog__content {
    position: absolute;
    right: 0;
    left: auto;
    justify-content: flex-end;
    z-index: 1;
  }
</style>

<style>
  .v-dialog.property-editor__dialog-content .v-card {
    box-shadow: none;
    height: 100%;
  }

  .property-editor__content {
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 17px;
    text-align: left;
  }

  .property-editor__header {
    position: relative;
    z-index: 1;
  }
  .v-dialog.property-editor__dialog-content {
    max-height: calc(100% - 24px) !important;
    background: white;
    margin: 15px;
    height: 100%;
    border-radius: 0;
    max-width: 450px;
    min-width: 400px;
  }

  .property-editor-transition-enter, .property-editor-transition-leave-to {
    transform: translateX(100%)
  }

  @media screen and (max-width: 680px) {
    .property-editor__dialog .v-dialog__content {
      position: fixed !important;
      top: 0;
      bottom: 0;
    }

    .v-dialog.property-editor__dialog-content {
      max-height: 100% !important;
      margin: 0;
      min-width: 100%;
    }
  }
</style>
