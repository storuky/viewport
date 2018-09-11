<template>
  <div class="color-picker">
    <div :style="{backgroundColor: value}" @click="active=!active" class="color-picker-trigger"></div>
    <div class="sketch-picker">
      <sketch-picker v-if="active" value="localValue" @input="updateValue" />
    </div>
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
        localValue: {},
        active: false
      }
    },
    methods: {
      updateValue (value) {
        this.$emit('input', value.hex8)
      },
      hide () {
        this.active = false
      }
    }
  }
</script>

<style scoped>
  .color-picker {
    margin-bottom: 20px;
  }
  .color-picker-trigger {
    height: 30px;
    width: 100px;
    background-color: #e7e7e7;
    border: 1px solid #cecece;
    cursor: pointer;
    border-radius: 3px;
    transition: .2s;
  }
  .color-picker-trigger:hover {
    filter: brightness(105%);
  }

  .sketch-picker {
    position: absolute;
    z-index: 1;
  }
</style>
