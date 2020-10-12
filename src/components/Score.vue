<template>
  <div class="score">
    <div>Mon score affiché ici</div>
    <div v-if="hasError">Une erreur est survenue, veuillez réessayer plus tard.</div>
  </div>
</template>

<script>

export default {
  name: "Score",

  data: function(){
    return {
      playerName: "Sino",
      gameSettings: this.$store.state.settings.selectedGeneration + " " + this.$store.state.settings.selectedTypes + " " + this.$store.state.settings.selectedDifficulty,
      numberOfFound: 0,
      totalNumber: Object.keys(this.$store.state.pokedex.currentDex).length,
      timeUsed: this.$store.state.settings.timeUsed,
      hasError: false
    }
  },

  methods: {
    getScore() {

      let payload = {
        hasBeenPlayed: this.$store.state.settings.hasBeenPlayed,
        settings: this.gameSettings
      }

      if(this.$store.state.settings.hasBeenPlayed) {
        payload.name = this.playerName,
        payload.score = this.numberOfFound,
        payload.time = this.timeUsed
      }

      var formData = new FormData();
      formData.append('payload', JSON.stringify(payload))

      fetch("http://localhost:8081/", {
        method: 'POST',
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch(() => this.hasError = true)
    },

    playAgain() {
      this.$store.dispatch("refillDex");
      this.$store.dispatch("rePlay");
    },

  },

  mounted: function(){

    console.clear()

    if(this.$store.state.settings.hasBeenPlayed) {

      for(const index in this.$store.state.pokedex.currentDex){
        if(this.$store.state.pokedex.currentDex[index]['found']) this.numberOfFound++
      }

      this.getScore()
    }

    else {

      try {
        this.getScore()
      }
  
      catch(error) {
        console.log(error)
        this.hasError = true;
      }
    }
    
  }

};
</script>