<template>
  <div class="base-group" :style="groupStyle">
    <div class="base-group-name">{{name}}</div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import { defaultProperties } from './Object/Types'

  export default {
    name: 'BaseGroup',
    props: {
      id: Number,
      objectIds: {
        type: Array,
        default () {
          return []
        }
      },
      name: {
        type: String,
        default () {
          return this.id ? `Group #${this.id}` : `New Group`
        }
      }
    },
    mounted () {
      this.d3BaseGroup = d3.select(this.$el)
      this.d3BaseGroup.call(this.dragHandler())
    },
    computed: {
      objects () {
        const objects = this.$store.getters['object/list'].filter(object => this.objectIds.includes(object.id))
        return objects
      },
      params () {
        if (!this.objects.length) return null

        const left = this.objects.map(object => object.position.x).sort((a, b) => a - b)
        const right = this.objects.map(object => {
          const width = object.size && object.size.width ? object.size.width : defaultProperties[object.type].size.width
          return object.position.x + width
        }).sort((a, b) => a - b)

        const top = this.objects.map(object => object.position.y).sort((a, b) => a - b)
        const bottom = this.objects.map(object => {
          const height = object.size && object.size.height ? object.size.height : defaultProperties[object.type].size.height
          return object.position.y + height
        }).sort((a, b) => a - b)

        const corners = {
          left: left[0] - 20,
          right: right[right.length-1] + 20,
          top: top[0] - 20,
          bottom: bottom[bottom.length-1] + 20
        }

        return {
          position: {
            x: corners.left,
            y: corners.top
          },
          size: {
            width: corners.right - corners.left,
            height: corners.bottom - corners.top
          }
        }
      },
      groupStyle () {
        if (this.params) {
          return {
            width: this.params.size.width + 'px',
            height: this.params.size.height + 'px',
            transform: `translate(${this.params.position.x}px, ${this.params.position.y}px)`
          }
        } else {
          return {

          }
        }
      },
      scale () {
        return this.$store.getters['viewport/scale']
      },
    },
    methods: {
      dragHandler () {
        let initialPositions
        const dragHandler = d3.drag()
          .on('start', () => {
            initialPositions = {}
            this.objects.forEach(object => {
              initialPositions[object.id] = {
                x: d3.event.x/this.scale - object.position.x,
                y: d3.event.y/this.scale - object.position.y
              }
            })
          })
          .on('drag', () => {
            this.objects.forEach(object => {
              var targetPosition = {
                x: d3.event.x/this.scale - initialPositions[object.id].x,
                y: d3.event.y/this.scale - initialPositions[object.id].y
              }
              this.$store.dispatch('object/update', {id: object.id, position: targetPosition})
            })
          })
        return dragHandler
      },
    }
  }
</script>

<style scoped>
  .base-group {
    background: #1976d130;
    position: absolute;
  }

  .base-group-name {
    transform: translateY(-25px);
    display: inline-block;
  }
</style>
