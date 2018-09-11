<template>
  <div class="at-organisation-object">
    <div class="at-organisation-object__logo" :style="logoStyle"></div>
    <Base_TextObject position="bottom" placeholder="Organisation" :settings.sync="localSettings" :baseObject="baseObject" />
  </div>
</template>

<script>
  import Base_TextObject from '../../Base/TextObject/Component'

  export default {
    name: "AnalysisTools_OrganisationObject",
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
      logoStyle () {
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
  .at-organisation-object {
    height: 100%;
    width: 100%;
  }

  .at-organisation-object__logo {
    width: 100%;
    height: 100%;
    border: 1px solid #D6D5D5;
    background-color: white;
  }
</style>
