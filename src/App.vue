<template>
  <div>
    <Home v-if="$store.state.currentComp == 'Language'"/>
    <Generation v-if="$store.state.currentComp == 'Generation'"/>
    <Type v-if="$store.state.currentComp == 'Type'"/>
    <Difficulty v-if="$store.state.currentComp == 'Difficulty'"/>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Generation from './components/Generation.vue'
import Type from './components/Type.vue'
import Difficulty from './components/Difficulty.vue'

export default {
  name: 'App',
  components: {
    Home,
    Generation,
    Type,
    Difficulty
  }
}
</script>

<style lang="scss">
  @import "assets/scss/style.scss";
</style>
