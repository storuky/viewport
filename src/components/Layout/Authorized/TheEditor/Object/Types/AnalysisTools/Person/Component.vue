<template>
  <div class="at-person-object">
    <div class="at-person-object__avatar" :style="avatarStyle"></div>
    <Base_TextObject position="bottom" placeholder="Person" :settings.sync="localSettings" :baseObject="baseObject" />
  </div>
</template>

<script>
  import Base_TextObject from '../../Base/TextObject/Component'

  export default {
    name: "AnalysisTools_PersonObject",
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
      avatarStyle () {
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
  .at-person-object {
    height: 100%;
    width: 100%;
  }

  .at-person-object__avatar {
    width: 100%;
    height: 100%;
    border: 1px solid #D6D5D5;
    border-radius: 9999px;
    background-color: white;
  }
</style>
