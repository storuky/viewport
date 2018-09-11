<template>
  <div>
    <v-text-field class="input-color" label="Text Color" type="color" v-model="localSettings.color"></v-text-field>
    <VueEditor v-model="localSettings.content" />
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor"

  export default {
    name: "TextObjectPropertyEditor",
    props: {
      settings: Object
    },
    components: {
      VueEditor
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
