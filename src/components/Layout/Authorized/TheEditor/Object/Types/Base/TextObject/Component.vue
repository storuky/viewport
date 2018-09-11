<template>
  <div :class="{'text-object-bottom': position == 'bottom'}" class="text-object" :style="textObjectStyles">
    <div class="text-object__placeholder" v-if="!localSettings.content">
      {{placeholder || 'Double click to edit...'}}
    </div>
    <div
      class="text-object__content"
      ref="content"
      v-bind="{contenteditable: contenteditable && baseObject.selected}"
      @mousedown="stopPropagationIfContenteditable"
      @dblclick.stop
      @blur="contenteditable = false"
      @click="setEditable"
      @input="update"></div>
  </div>
</template>

<script>
  export default {
    name: "Base_TextObject",
    props: {
      baseObject: Object,
      settings: Object,
      placeholder: String,
      position: String
    },
    mounted () {
      this.$refs.content.innerHTML = this.localSettings.content || ""
    },
    data () {
      return {
        localSettings: {...this.settings},
        contenteditable: false
      }
    },
    methods: {
      update (event) {
        this.localSettings = {...this.localSettings, content: event.target.innerHTML}

        this.$store.dispatch('object/update', {
          id: this.baseObject.id,
          settings: {...this.localSettings}
        })
      },
      setEditable () {
        if (!this.contenteditable) {
          this.contenteditable = true
          this.contenteditableTimeout = setTimeout(() => this.contenteditable = false, 300)
        } else {
          clearTimeout(this.contenteditableTimeout)
        }
      },
      stopPropagationIfContenteditable (event) {
        if (this.contenteditable) {
          event.stopPropagation()
        }
      }
    },
    computed: {
      textObjectStyles () {
        return {
          cursor: this.contenteditable ? '' : 'pointer',
          outline: 'none',
          color: this.settings.color || '#333',
          textAlign: this.settings.textAlign || 'center',
          justifyContent: this.settings.textAlign || 'center',
          alignItems: this.settings.verticalAlign || 'center'
        }
      },
    },
    watch: {
      localSettings () {
        this.$emit('update:settings', this.localSettings)
        if (this.localSettings.content != this.$refs.content.innerHTML) {
          this.$refs.content.innerHTML = this.localSettings.content || ""
        }
      },
      settings () {
        this.localSettings = this.settings
      }
    }
  }
</script>

<style scoped>
  .text-object {
    height: 100%;
    display: flex;
  }

  .text-object-bottom {
    position: absolute;
    left: -10%;
    right: -10%;
    height: auto !important;
  }

  .text-object__placeholder {
    position: absolute;
    color: #a2a2a2;
    font-style: italic;
  }

  .text-object__content {
    position: relative;
    min-height: 20px;
    min-width: 100%;
    outline: none;
  }

</style>

<style>
  .text-object__content p {
    margin-bottom: 0;
  }
</style>
