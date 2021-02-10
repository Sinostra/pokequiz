<template>
    <div class="homepage">

      <div class="flags-wrapper">
        <div v-on:click="selectLanguage('english')" class="english flag"></div>
        <div v-on:click="selectLanguage('french')" class="french flag"></div>
        <div v-on:click="selectLanguage('german')" class="german flag"></div>
      </div>

    </div>
</template>

<script>

export default {
  name: 'Home',

  methods: {

    selectLanguage: function(language){
      this.$store.dispatch("chooseLanguage", language)
      this.$store.dispatch("pokedexLanguage", language)
      this.$store.dispatch("nextComp")
    }
  }
}
</script>