<template>
  <div>
    <Home v-if="$store.state.currentComp == 'Language'"/>
    <Generation v-if="$store.state.currentComp == 'Generation'"/>
    <Type v-if="$store.state.currentComp == 'Type'"/>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Generation from './components/Generation.vue'
import Type from './components/Type.vue'

export default {
  name: 'App',
  components: {
    Home,
    Generation,
    Type
  }
}
</script>

<style lang="scss">
  @import "assets/scss/style.scss";
</style>
