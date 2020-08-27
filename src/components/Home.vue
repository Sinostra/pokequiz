<template>
    <div class="homepage">

      <div class="flags-wrapper">
        <div v-on:click="selectLanguage" class="english flag"></div>
        <div v-on:click="selectLanguage" class="french flag"></div>
        <div v-on:click="selectLanguage" class="german flag"></div>
      </div>


      <!-- <div>Bienvenue dans ce quiz Pokémon</div>
      <div>Pokémon préféré : {{$store.state.localisation.chosenPokemon}}</div>

      <input v-model="chosenPokemon" type="text">
      <div v-on:click="submitPoke">Entrer</div>

      <div v-if="$store.state.localisation.chosenPokemon == 'Bulbizarre'">Moi aussi mon Pokémon préféré est {{$store.state.localisation.chosenPokemon}}</div>
      <div>{{$store.state.localisation.chosenLang['genInstruct']}}</div> -->

    </div>
</template>

<script>
export default {
  name: 'Home',

  data: function() {
    return {
      //chosenPokemon
    }
  },

  methods: {
    // submitPoke: function(){
    //   //console.log(this.$store._modules.root.state.localisation.chosenPokemon)
    //   console.log(this.$store.state.localisation.chosenLang['genInstruct'])
    //   this.$store.dispatch("changePokemon", this.chosenPokemon)
    // },

    selectLanguage: function(element){
      this.$store.dispatch("chooseLanguage", element.target.classList[0])
      this.$store.dispatch("changecurrentComp")
    }
  }
}
</script>