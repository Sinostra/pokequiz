<template>
  <div
    id="quiz-wrapper"
    class="background"
    :class="getBackgroundClass()"
  >
    <Home v-if="$store.state.currentComp == 'Language'" />
    <Generation v-if="$store.state.currentComp == 'Generation'" />
    <Type v-if="$store.state.currentComp == 'Type'" />
    <Difficulty v-if="$store.state.currentComp == 'Difficulty'" />
    <Game v-if="$store.state.currentComp == 'Game'" />
    <Score v-if="$store.state.currentComp == 'Score'" />
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Generation from "./components/Generation.vue";
import Type from "./components/Type.vue";
import Difficulty from "./components/Difficulty.vue";
import Game from "./components/Game.vue";
import Score from "./components/Score.vue";

export default {
  name: "App",
  components: {
    Home,
    Generation,
    Type,
    Difficulty,
    Game,
    Score,
  },

  data:function(){
    return {
      backgroundDisplayed: true
    }
  },
  methods: {
    getBackgroundClass() {
      return {
        inGame: this.$store.state.currentComp == 'Game' || this.$store.state.currentComp == 'Score',
        noBackground: !this.$store.state.displayedBackground
      }
    }
  }
};
</script>

<style lang="scss">
@import "assets/scss/style.scss";
</style>
