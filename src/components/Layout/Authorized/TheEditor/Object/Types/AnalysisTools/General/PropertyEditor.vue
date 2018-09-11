<template>
  <div>
    General
  </div>
</template>

<script>

  export default {
    name: 'AnalysisTools_GeneralPropertyEditor',
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
