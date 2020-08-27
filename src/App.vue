<template>
  <div :class="$store.state.currentComp == 'Game' ? 'in-game' : ''">
    <Home v-if="$store.state.currentComp == 'Language'"/>
    <Generation v-if="$store.state.currentComp == 'Generation'"/>
    <Type v-if="$store.state.currentComp == 'Type'"/>
    <Difficulty v-if="$store.state.currentComp == 'Difficulty'"/>
    <Game v-if="$store.state.currentComp == 'Game'"/>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Generation from './components/Generation.vue'
import Type from './components/Type.vue'
import Difficulty from './components/Difficulty.vue'
import Game from './components/Game.vue'

export default {
  name: 'App',
  components: {
    Home,
    Generation,
    Type,
    Difficulty,
    Game
  }
}
</script>

<style lang="scss">
  @import "assets/scss/style.scss";
</style>
