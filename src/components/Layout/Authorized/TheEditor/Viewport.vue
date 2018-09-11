<template>
  <div ref="viewport" class="viewport" @click="deselectAll">
    <div :style="canvasStyles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'Viewport',
    props: {
      scale: {
        type: Number,
        default: 1
      },
      translate: {
        type: Object,
        default () {
          return {x: 0, y: 0}
        }
      },
      minScale: {
        type: Number,
        default: 0.2
      },
      maxScale: {
        type: Number,
        default: 5
      },
      minTranslate: Object,
      maxTranslate: Object
    },
    created () {
      window.addEventListener('keyup', e => {
        if (e.srcElement.tagName == 'BODY') {
          if (e.keyCode == 8 || e.keyCode == 46) {
            this.$store.dispatch('object/deleteSelected')
          }
        }
      })
    },
    data () {
      return {
        localTranslate: {...this.translate},
        localScale: this.scale
      }
    },
    mounted () {
      this.d3Viewport = d3.select(this.$refs.viewport)

      this.d3Viewport
        .call(this.zoomAction())
        .on('dblclick.zoom', null)

      this.setZoom()
    },
    computed: {
      canvasStyles () {
        return {
          transform: `translate(${this.localTranslate.x}px, ${this.localTranslate.y}px)
                      scale(${this.localScale})`,
          transformOrigin: '0 0',
        }
      }
    },
    methods: {
      deselectAll () {
        this.$store.dispatch('object/deselectAll')
      },
      setZoom () {
        this.d3Viewport
          .call(
            this.zoomAction().transform,
            d3.zoomIdentity
              .translate(this.translate.x, this.translate.y)
              .scale(this.scale)
          )
        
        this.localTranslate = {...this.translate}
        this.localScale = this.scale
      },
      zoomAction () {
        return d3.zoom()
          .scaleExtent([this.minScale, this.maxScale])
          .on('zoom', () => {
            let {x, y, k} = d3.event.transform

            this.localScale = k
            this.localTranslate = {x, y}

            this.$emit('zoom', {
              translate: this.localTranslate,
              scale: this.localScale
            })

            this.$store.dispatch('viewport/setScale', this.localScale)
            this.$store.dispatch('viewport/setTranslate', this.localTranslate)
          })
      }
    },
    watch: {
      scale () {
        this.setZoom()
      },
      translate () {
        this.setZoom()
      }
    }
    
  }
</script>

<style scoped>
  .viewport {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transform-origin: 0 0;
    overflow: hidden;
    background: #eeeeee;
    -webkit-overflow-scrolling: touch;
  }
</style>
