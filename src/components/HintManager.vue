<template>
    <div class="hint-wrapper">
        <div v-on:click="playHintedPokemonCry(hintedPokemon)" class="hint-label">Cliquez ici pour entendre un indice</div>
        <div v-on:click="getRandomLeftToFindPokemon()" :class="animRefresh ? 'anim':''" class="hint-picto"></div>
    </div>
</template>

<script>
export default {
    name: 'HintManager',
    data: function(){
        return {
            leftToFind: [],
            hintedPokemon: '',
            animRefresh: false
        }
    },

    props: {
        lastFound: String
    },

    watch: {
        lastFound: function(newVal){
            this.leftToFind.splice(this.leftToFind.indexOf(newVal), 1)
            if(newVal == this.hintedPokemon) {
                this.getRandomLeftToFindPokemon(false)
            }
        }
    },

    methods: {
        getAudioUrl(index) {
            return require('../assets/pokedex/' + index + '/' + index + '.mp3');
        },
        getRandomLeftToFindPokemon(playerTriggered = true) {
            if(!this.animRefresh || !playerTriggered) {
                this.animRefresh = true;
                for (var i = this.leftToFind.length - 1; i > 0; i--) {
                    var j = Math.floor(Math.random() * (i + 1));
                    [this.leftToFind[i], this.leftToFind[j]] = [this.leftToFind[j], this.leftToFind[i]];
                }
                if(this.leftToFind.length > 1 && this.hintedPokemon == this.leftToFind[0]) {
                    this.hintedPokemon = this.leftToFind[1]
                }
                else this.hintedPokemon = this.leftToFind[0]
                this.animRefresh = true;
                setTimeout(() => {this.animRefresh = false}, 2000)
            }
        },
        playHintedPokemonCry(index) {
            var audio = new Audio(this.getAudioUrl(index))
            audio.play()
        },
    },

    mounted: function() {
        for(const index in this.$store.state.pokedex.currentDex) {
            this.leftToFind.push(index)
        }
        this.getRandomLeftToFindPokemon(false)
    }
}
</script>