<template>
  <div>
    <v-text-field label="Name" type="text" v-model="localSettings.name"></v-text-field>

    <ColorPicker v-model="localSettings.background" />
  </div>
</template>

<script>
  import { Sketch } from 'vue-color'

  export default {
    name: 'GroupObjectPropertyEditor',
    props: {
      settings: Object
    },
    data () {
      return {
        localSettings: {...this.settings}
      }
    },
    watch: {
      localSettings: {
        handler () {
          this.$emit('update:settings', this.localSettings)
        },
        deep: true
      },
      settings: {
        handler () {
          this.localSettings = this.settings
        }
      }
    }
  }
</script>

<style scoped>
  
</style>
