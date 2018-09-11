<template>
  <div id="app">
    <TheAuthorizedLayout />
  </div>
</template>

<script>
import TheAuthorizedLayout from './components/Layout/TheAuthorizedLayout'
import './components/Global'

export default {
  name: 'app',
  components: {TheAuthorizedLayout},
  created () {
    document.execCommand('defaultParagraphSeparator', false, 'p')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
