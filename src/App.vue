<template>
  <div id="app">
    <o-calendar></o-calendar>
  </div>
</template>

<script>
import OCalander from './components/OCalender'

export default {
  name: 'app',
  components: {
    'o-calendar':OCalander
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
  margin-top: 60px;
}
</style>
