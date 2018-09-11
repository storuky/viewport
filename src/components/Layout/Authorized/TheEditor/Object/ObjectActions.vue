<template>
  <transition name="object-actions">
    <div v-if="opened" class="object-actions">
      <div class="object-actions-left">
      </div>
      <div class="object-actions-right">
        <v-icon size="18" class="object-action" @click="$emit('settings')">code</v-icon>
        <v-icon size="18" class="object-action" @click="$emit('delete')">delete</v-icon>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ObjectActions',
    props: {
      opened: Boolean
    }
  }  
</script>

<style>
  .object-actions {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transform: translateY(-100%);
    opacity: 1;
    transition: all .2s ease;
    height: 30px;
    z-index: 0;
    white-space: nowrap;
  }

  .object-actions-left {
    position: absolute;
    left: 0;
  }
  .object-actions-right {
    position: absolute;
    right: 0;
  }

  .object-action {
    cursor: pointer;
    margin-left: 10px !important;
    background: #1976d1;
    color: white !important;
    border-radius: 100px;
    width: 24px;
    height: 24px;
    line-height: 25px !important;
    text-align: center;
  }
  .object-actions-left .object-action {
    margin-right: 10px;
  }
  .object-actions-right .object-action {
    margin-left: 10px;
  }

  .object-action:hover {
    filter: brightness(115%);
  }

  .object-actions-enter, .object-actions-leave-to {
    transform: translateY(0);
    opacity: 0;
  }
</style>
