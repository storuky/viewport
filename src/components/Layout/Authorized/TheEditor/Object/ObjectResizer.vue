<template>
  <div class="object-resizer">
    <div v-for="point in points" :key="point">
      <div :class="['object-resizer__point', `object-resizer__${point}`]"></div>
      <div
          :ref="point"
          :class="['object-resizer__handle', `object-resizer__${point}-handle`]">
      </div>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'ObjectResizer',
    props: {
      position: Object,
      width: Number,
      height: Number
    },
    mounted () {
      this.points.forEach(point => {
        this[`d3${point}`] = d3.select(this.$refs[point][0])

        this[`d3${point}`].call(this.resizeHandler(point))
      })
    },
    data () {
      return {
        points: ['TopRight', 'TopLeft', 'BottomRight', 'BottomLeft', 'TopMiddle', 'BottomMiddle', 'LeftMiddle', 'RightMiddle']
      }
    },
    methods: {
      resizeHandler (point) {
        let initialPosition, initialSize
        const dragHandler = d3.drag()
        dragHandler
          .on('start', () => {
            initialPosition = {...this.position}
            initialSize = {width: this.width, height: this.height}
          })
          .on('drag', () => {
            const transform = this[point+'Transform']({initialPosition, initialSize})
            this.$emit('transform', transform)
          })
        return dragHandler
      },

      RightMiddleTransform ({initialSize}) {
        return {
          position: this.position,
          width: d3.event.x/this.scale,
          height: initialSize.height
        }
      },

      LeftMiddleTransform ({initialPosition, initialSize}) {
        return {
          position: {
            x: this.position.x + d3.event.x/this.scale,
            y: this.position.y
          },
          width: initialSize.width + initialPosition.x - (this.position.x + d3.event.x/this.scale),
          height: initialSize.height
        }
      },

      TopMiddleTransform ({initialPosition, initialSize}) {
        return {
          position: {
            x: initialPosition.x,
            y: this.position.y + d3.event.y/this.scale
          },
          width: initialSize.width,
          height: initialSize.height + initialPosition.y - (this.position.y + d3.event.y/this.scale)
        }
      },

      BottomMiddleTransform ({initialPosition, initialSize}) {
        return {
          position: {
            x: initialPosition.x,
            y: initialPosition.y
          },
          width: initialSize.width,
          height: d3.event.y/this.scale
        }
      },

      TopRightTransform ({initialPosition, initialSize}) {
        return {
          position: {
            x: initialPosition.x,
            y: this.position.y + d3.event.y/this.scale
          },
          width: d3.event.x/this.scale,
          height: initialSize.height + initialPosition.y - (this.position.y + d3.event.y/this.scale)
        }
      },

      TopLeftTransform ({initialPosition, initialSize}) {
        return {
          position: {
            x: this.position.x + d3.event.x/this.scale,
            y: this.position.y + d3.event.y/this.scale
          },
          width: initialSize.width + initialPosition.x - (this.position.x + d3.event.x/this.scale),
          height: initialSize.height + initialPosition.y - (this.position.y + d3.event.y/this.scale)
        }
      },

      BottomLeftTransform ({initialPosition, initialSize}) {
        return {
          position: {
            x: this.position.x + d3.event.x/this.scale,
            y: this.position.y
          },
          width: initialSize.width + initialPosition.x - (this.position.x + d3.event.x/this.scale),
          height: d3.event.y/this.scale
        }
      },

      BottomRightTransform () {
        return {
          position: this.position,
          width: d3.event.x/this.scale,
          height: d3.event.y/this.scale
        }
      }
    },
    computed: {
      scale () {
        return this.$store.getters['viewport/scale']
      }
    }
  }
</script>

<style scoped>
  .object-resizer__point {
    position: absolute;
    background: #037dfc;
    height: 8px;
    width: 8px;
    z-index: 1;
  }
  .object-resizer__TopLeft {
    transform: translateX(-50%) translateY(-50%);
    left: 0;
    top: 0;
  }
  .object-resizer__TopRight {
    transform: translateX(50%) translateY(-50%);
    right: 0;
    top: 0;
  }
  .object-resizer__BottomRight {
    transform: translateX(50%) translateY(50%);
    right: 0;
    bottom: 0;
  }
  .object-resizer__BottomLeft {
    transform: translateX(-50%) translateY(50%);
    left: 0;
    bottom: 0;
  }

  .object-resizer__TopMiddle,
  .object-resizer__BottomMiddle,
  .object-resizer__LeftMiddle,
  .object-resizer__RightMiddle {
    display: none;
  }

  .object-resizer__handle {
    position: absolute;
    width: 10px;
    height: 10px;
    box-sizing: content-box;
    z-index: 3;
  }
  .object-resizer__TopLeft-handle {
    top: 0;
    left: 0;
    width: 10%;
    height: 10%;
    transform: translateX(-50%) translateY(-50%);
  }

  .object-resizer__TopRight-handle {
    top: 0;
    right: 0;
    width: 10%;
    height: 10%;
    transform: translateX(50%) translateY(-50%);
  }

  .object-resizer__BottomRight-handle {
    right: 0;
    bottom: 0;
    width: 10%;
    height: 10%;
    transform: translateX(50%) translateY(50%);
  }

  .object-resizer__BottomLeft-handle {
    left: 0;
    bottom: 0;
    width: 10%;
    height: 10%;
    transform: translateX(-50%) translateY(50%);
  }

  .object-resizer__TopMiddle-handle {
    top: 0;
    left: 10%;
    width: 80%;
    transform: translateY(-50%);
  }

  .object-resizer__BottomMiddle-handle {
    bottom: 0;
    left: 10%;
    width: 80%;
    transform: translateY(50%);
  }

  .object-resizer__RightMiddle-handle {
    right: 0;
    top: 10%;
    height: 80%;
    transform: translateX(50%);
  }

  .object-resizer__LeftMiddle-handle {
    left: 0;
    top: 10%;
    height: 80%;
    transform: translateX(-50%);
  }

  .object-resizer__LeftMiddle-handle,
  .object-resizer__RightMiddle-handle {
    cursor: ew-resize;
  }

  .object-resizer__TopMiddle-handle,
  .object-resizer__BottomMiddle-handle {
    cursor: ns-resize;
  }

  .object-resizer__TopLeft-handle,
  .object-resizer__BottomRight-handle {
    cursor: nwse-resize;
  }

  .object-resizer__TopRight-handle,
  .object-resizer__BottomLeft-handle {
    cursor: nesw-resize;
  }
</style>
