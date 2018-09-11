<template>
  <div class="color-picker">
    <SketchPicker value="localValue" @input="updateValue" />
  </div>
</template>

<script>
  import { Sketch } from 'vue-color'
  
  export default {
    name: 'ColorPicker',
    components: {
      SketchPicker: Sketch
    },
    props: {
      value: String
    },
    data () {
      return {
        localValue: {}
      }
    },
    methods: {
      updateValue (value) {
        this.$emit('input', value.hex8)
      }
    }
  }
</script>

<style scoped>
  .color-picker {
    margin-bottom: 20px;
  }
</style>
