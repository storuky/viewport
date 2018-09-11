<template>
  <div class="base-group" :style="groupStyles">
    <div class="create-group-btn">
      <v-btn v-if="!baseObject.id" @click="createGroup">Create Group</v-btn>
    </div>
    <Base_TextObject modelName="name" :placeholder="`Group ${baseObject.id}`" v-if="baseObject.id" position="bottom" :settings.sync="localSettings" :baseObject="baseObject" />
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import Base_TextObject from '../TextObject/Component'
  import { defaultProperties } from '../../index'

  export default {
    name: "Base_GroupObject",
    props: {
      settings: Object,
      baseObject: Object
    },
    components: {
      Base_TextObject
    },
    mounted () {
      this.d3BaseGroup = d3.select(this.$el)
      this.d3BaseGroup.call(this.dragHandler())
      this.groupStyles
    },
    data () {
      return {
        localSettings: {...this.settings},
        padding: 25
      }
    },
    methods: {
      createGroup () {
        this.$store.dispatch('object/create', {
          id: Math.random(),
          type: 'Base_GroupObject',
          info: {
            settings: {...this.settings}
          }
        })
      },
      dragHandler () {
        let initialPositions,
            initialGroupPosition
        const dragHandler = d3.drag()
          .on('start', () => {
            initialGroupPosition = {
              x: d3.event.x/this.scale + this.baseObject.position.x,
              y: d3.event.y/this.scale + this.baseObject.position.y,
            }
            initialPositions = {}
            this.objects.forEach(object => {
              initialPositions[object.id] = {
                x: object.position.x,
                y: object.position.y
              }
            })
          })
          .on('drag', () => {
            this.objects.forEach(object => {
              var targetPosition = {
                x: initialPositions[object.id].x + (d3.event.x/this.scale + this.baseObject.position.x - initialGroupPosition.x),
                y: initialPositions[object.id].y + (d3.event.y/this.scale + this.baseObject.position.y - initialGroupPosition.y)
              }
              this.$store.dispatch('object/update', {id: object.id, position: targetPosition})
            })
          })
        return dragHandler
      },
      getParams () {
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
          left: left[0] - this.padding,
          right: right[right.length-1] + this.padding,
          top: top[0] - this.padding,
          bottom: bottom[bottom.length-1] + this.padding
        }

        const result = {
          position: {
            x: corners.left,
            y: corners.top
          },
          size: {
            width: corners.right - corners.left,
            height: corners.bottom - corners.top
          }
        }

        return result
      }
    },
    computed: {
      scale () {
        return this.$store.getters['viewport/scale']
      },
      objects () {
        const objects = this.$store.getters['object/list'].filter(object => this.settings.objectIds.includes(object.id))
        return objects
      },
      groupStyles () {
        if (!this.objects.length) return null

        const result = this.getParams()

        if (this.baseObject.size.width != result.size.width
          || this.baseObject.size.height != result.size.height
          || this.baseObject.position.x != result.position.x
          || this.baseObject.position.y != result.position.y) {
            this.$store.dispatch('object/update', {
              id: this.baseObject.id,
              size: result.size,
              position: result.position
            })
          }

        return {
          background: this.localSettings.background
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
  .base-group {
    width: 100%;
    height: 100%;
    background: #1976d130;
  }

  .create-group-btn {
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
  }
</style>
