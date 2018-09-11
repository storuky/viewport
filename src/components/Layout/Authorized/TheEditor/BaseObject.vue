<template>
  <div
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="{selected}"
    @click.stop="setSelected"
    class="base-object"
    :style="objectStyles">
    <ObjectResizer
      @transform="resizeHandler"
      :width="localSize.width"
      :height="localSize.height"
      :position="localPosition"
      v-if="selected && resizable" />
    <ObjectActions :opened="hover || selected" @settings="openPropertyEditor" @delete="destroy"/>
    <div class="base-object__content">
      <component :is="type" v-bind.sync="info" :baseObject="baseObject"></component>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import ObjectResizer from './Object/ObjectResizer'
  import ObjectActions from './Object/ObjectActions'

  import { ObjectComponents, defaultProperties } from './Object/Types'

  export default {
    name: "BaseObject",
    props: {
      id: [Number, String],
      type: String,
      position: {
        type: Object,
        default () {
          return {x: 0, y: 0}
        }
      },
      size: {
        type: Object,
        default () {
          const {width, height} = defaultProperties[this.type].size
          return {
            width, height
          }
        }
      },

      info: Object
    },
    components: {
      ObjectResizer,
      ObjectActions,
      ...ObjectComponents
    },
    mounted () {
      this.d3BaseObject = d3.select(this.$el)

      if (defaultProperties[this.type].draggable) {
        this.d3BaseObject.call(this.dragHandler())
      }
    },
    data () {
      return {
        localPosition: {...this.position || {}},
        localSize: {...this.size || {}},
        hover: false,
        draggable: defaultProperties[this.type].draggable,
        resizable: defaultProperties[this.type].resizable
      }
    },
    watch: {
      position () {
        this.localPosition = {...this.position || {}}
      },
      size () {
        this.localSize = this.size
      }
    },
    computed: {
      objectStyles () {
        const {width, height, maxWidth, maxHeight, minWidth, minHeight} = defaultProperties[this.type].size
        return {
          transform: `translate(${this.localPosition.x}px, ${this.localPosition.y}px)`,
          width: `${this.localSize.width || width}px`,
          height: `${this.localSize.height || height}px`,
          minWidth: `${minWidth || 0}px`,
          minHeight: `${minHeight || 0}px`,
          maxWidth: `${maxWidth || 9999}px`,
          maxHeight: `${maxHeight || 9999}px`
        }
      },
      selected () {
        return this.$store.getters['object/selectedIds'].includes(this.id)
      },
      scale () {
        return this.$store.getters['viewport/scale']
      },
      baseObject () {
        return {
          id: this.id,
          selected: this.selected,
          position: this.localPosition,
          width: this.localSize.width,
          height: this.localSize.height
        }
      }
    },
    methods: {
      setSelected (event) {
        if (!event.metaKey && !event.ctrlKey && !event.shiftKey) {
          this.$store.dispatch('object/deselectAll')
          this.$store.dispatch('object/select', this.id)
        } else {
          if (this.selected) {
            this.$store.dispatch('object/deselect', this.id)
          } else {
            this.$store.dispatch('object/select', this.id)
          }
        }
      },
      destroy () {
        this.$store.dispatch('object/delete', this.id)
      },
      openPropertyEditor () {
        this.$store.dispatch('modals/open', {type: 'propertyEditor'})
      },
      dragHandler () {
        let initialPositions
        const dragHandler = d3.drag()
          .on('start', () => {
            initialPositions = {}
            if (this.selected) {
              const selected = this.$store.getters['object/selected']
              selected.forEach(object => {
                initialPositions[object.id] = {
                  x: d3.event.x/this.scale - object.position.x,
                  y: d3.event.y/this.scale - object.position.y
                }
              })
            } else {
              initialPositions[this.id] = {
                x: d3.event.x/this.scale - this.localPosition.x,
                y: d3.event.y/this.scale - this.localPosition.y
              }
            }
          })
          .on('drag', () => {
            if (this.selected) {
              const selectedIds = this.$store.getters['object/selectedIds']

              selectedIds.forEach(id => {
                var targetPosition = {
                  x: d3.event.x/this.scale - initialPositions[id].x,
                  y: d3.event.y/this.scale - initialPositions[id].y
                }
                this.$store.dispatch('object/update', {id, position: targetPosition})
              })
            } else {
              var targetPosition = {
                x: d3.event.x/this.scale - initialPositions[this.id].x,
                y: d3.event.y/this.scale - initialPositions[this.id].y
              }

              this.$store.dispatch('object/update', {id: this.id, position: targetPosition})
            }
          })
        return dragHandler
      },
      resizeHandler (transformParams) {
        const {proportion, minHeight, maxHeight, minWidth, maxWidth} = defaultProperties[this.type].size

        const transform = {...transformParams}
        const minWidthCondition = minWidth && transform.width < minWidth,
              minHeightCondition = minHeight && transform.height < minHeight,
              maxWidthCondition = maxWidth && transform.width > maxWidth,
              maxHeightCondition = maxHeight && transform.height > maxHeight

        if (minWidthCondition) {
          transform.width = minWidth
        }

        if (maxWidthCondition) {
          transform.width = maxWidth
        }

        if (minHeightCondition) {
          transform.height = minHeight
        }

        if (maxHeightCondition) {
          transform.height = maxHeight
        }

        if (proportion) {
          transform.height = transform.width * proportion
        }

        if (minWidthCondition || maxWidthCondition) {
          if (this.localPosition.x != transform.position.x) {
            transform.position.x = this.localPosition.x + (this.localSize.width - transform.width)
          } else {
            transform.position.x = this.localPosition.x
          }
        }

        if (minHeightCondition || maxHeightCondition) {
          if (this.localPosition.y != transform.position.y) {
            transform.position.y = this.localPosition.y + (this.localSize.height - transform.height)
          } else {
            transform.position.y = this.localPosition.y
          }
        }

        this.$store.dispatch('object/update', {
          id: this.id,
          size: {
            width: transform.width,
            height: transform.height
          },
          position: transform.position
        })
      }
    }
  }
</script>

<style>
  .base-object {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    border: 1px solid transparent;
  }

  .base-object:not(.selected):hover {
    border: 1px dashed #a2a2a2bf;
  }

  .base-object.selected {
    z-index: 3;
    border: 1px solid #037dfc;
  }

  .base-object__content {
    position: relative;
    height: 100%;
    /* z-index: 2; */
  }
</style>
