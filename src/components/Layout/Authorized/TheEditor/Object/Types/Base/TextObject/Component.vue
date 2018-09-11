<template>
  <div :class="[position ? `text-object--${position}` : '']" class="text-object" :style="textObjectStyles">
    <div class="text-object__placeholder" v-if="!localSettings[modelName]">
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
      position: String,
      modelName: {
        type: String,
        default: 'content'
      }
    },
    mounted () {
      this.$refs.content.innerHTML = this.localSettings[this.modelName] || ""
    },
    data () {
      return {
        localSettings: {...this.settings},
        contenteditable: false
      }
    },
    methods: {
      update (event) {
        this.localSettings = {...this.localSettings, [this.modelName]: event.target.innerHTML}

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
        if (this.localSettings[this.modelName] != this.$refs.content.innerHTML) {
          this.$refs.content.innerHTML = this.localSettings[this.modelName] || ""
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

  .text-object--bottom {
    position: absolute;
    left: -10%;
    right: -10%;
    top: 100%;
    height: auto !important;
    margin-top: 5px;
  }

  .text-object--top {
    position: absolute;
    bottom: calc(100% + 5px);
    height: auto !important;
    left: 50%;
    transform: translateX(-50%);
    min-width: 200px;
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
