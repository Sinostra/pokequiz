<template>
    <div class="timer">
        <div>{{$store.state.localisation.dataLang['remainingTimeText']}}</div>
        <div>{{displayMinsAndSecs(timeRemaining)}}</div>
    </div>
</template>

<script>
export default {
    name: 'Timer',

    data: function() {
        return {
            numberOfPokemons: 0,
            totalTime: 0,
            timeRemaining: 0,
            interval: undefined,
        }
    },

    props: ['gameState'],

    watch: {
        gameState: function(newVal) {
            if(newVal == "playing") {
                this.startTimer();
            }

            else if(newVal == "finished") {
                this.pauseTimer();
                this.$store.dispatch("setTimeUsed", this.totalTime - this.timeRemaining)
            }

            else {
                this.pauseTimer();
            }
        }
    },

    methods: {
        startTimer(){
            this.interval = setInterval(() => {
                this.timeRemaining--
                if(this.timeRemaining == 0) {
                    this.$emit('time-up')
                }
            }, 1000);
        },

        pauseTimer(){
            clearInterval(this.interval)
        },

        displayMinsAndSecs(secs){
            var remainSecs
            var remainMinutes

            if(secs > 59) {
                remainSecs = secs % 60
                remainMinutes = (secs - remainSecs)/60
            }

            else {
                remainSecs = secs
                remainMinutes = 0
            }

            if(remainSecs < 10) remainSecs = "0"+ remainSecs
            if(remainMinutes < 10) remainMinutes = "0"+ remainMinutes

            return remainMinutes + ':' + remainSecs
        },
    },

    mounted: function(){
        this.numberOfPokemons = Object.keys(this.$store.state.pokedex.currentDex).length
        this.totalTime = this.$store.state.settings.secondsPerPokemon[this.$store.state.settings.selectedDifficulty] * this.numberOfPokemons
        this.timeRemaining = this.totalTime
    }
}
</script>