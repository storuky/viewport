<template>
  <div class="rect-object" :style="rectObjectStyles">
    <Base_TextObject :settings.sync="localSettings" :baseObject="baseObject" />
  </div>
</template>

<script>
  import Base_TextObject from '../TextObject/Component'

  export default {
    name: "Base_RectObject",
    props: {
      settings: Object,
      baseObject: Object
    },
    components: {
      Base_TextObject
    },
    data () {
      return {
        localSettings: {...this.settings}
      }
    },
    computed: {
      rectObjectStyles () {
        return {
          background: this.localSettings.backgroundColor || '#e7e7e7',
          borderRadius: (this.localSettings.borderRadius || 0) + 'px'
        }
      }
    },
    watch: {
      localSettings () {
        this.$emit('update:settings', this.localSettings)
      },
      settings () {
        this.localSettings = this.settings
      }
    }
  }
</script>

<style scoped>
  .rect-object {
    height: 100%;
    width: 100%;
  }
</style>
