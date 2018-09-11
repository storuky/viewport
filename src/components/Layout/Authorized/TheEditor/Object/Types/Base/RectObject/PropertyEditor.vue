<template>
  <div>
    <v-text-field label="Border Radius" type="number" v-model="localSettings.borderRadius"></v-text-field>
    <v-text-field class="input-color" label="Background Color" type="color" v-model="localSettings.backgroundColor"></v-text-field>
    <TextObjectPropertyEditor :settings.sync="localSettings" />
  </div>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  import TextObjectPropertyEditor from '../TextObject/PropertyEditor'

  export default {
    name: 'RectObjectPropertyEditor',
    props: {
      settings: Object
    },
    components: {
      VueEditor,
      TextObjectPropertyEditor
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
