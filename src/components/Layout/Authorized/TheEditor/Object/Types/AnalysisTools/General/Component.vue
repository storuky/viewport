<template>
  <div class="at-general-object">
    <div class="at-general-object__image" :style="imageStyle"></div>
    <Base_TextObject position="bottom" placeholder="General" :settings.sync="localSettings" :baseObject="baseObject" />
  </div>
</template>

<script>
  import Base_TextObject from '../../Base/TextObject/Component'

  export default {
    name: "AnalysisTools_GeneralObject",
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
      imageStyle () {
        return {
          background: this.localSettings.backgroundImage ? `url(${this.localSettings.backgroundImage})` : null,
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
  .at-general-object {
    height: 100%;
    width: 100%;
  }

  .at-general-object__image {
    width: 100%;
    height: 100%;
    border: 1px solid #D6D5D5;
    background-color: white;
  }
</style>
