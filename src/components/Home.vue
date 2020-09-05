<template>
    <div class="homepage">

      <div class="flags-wrapper">
        <div v-on:click="selectLanguage" class="english flag"></div>
        <div v-on:click="selectLanguage" class="french flag"></div>
        <div v-on:click="selectLanguage" class="german flag"></div>
      </div>

    </div>
</template>

<script>
export default {
  name: 'Home',

  methods: {

    selectLanguage: function(element){
      this.$store.dispatch("chooseLanguage", element.target.classList[0])
      this.$store.dispatch("pokedexLanguage", element.target.classList[0])
      this.$store.dispatch("nextComp")
    }
  }
}
</script>