<template>
    <div class="hint-wrapper">
        <div v-if="availableHint" class="hint-ready">
            <div v-on:click="playHintedPokemonCry(hintedPokemon)" class="hint-label">{{$store.state.localisation.dataLang['clickHintText']}}</div>
            <div v-if="leftToFind.length > 1" v-on:click="getRandomLeftToFindPokemon()" :class="animRefresh ? 'anim':''" class="hint-picto"></div>
        </div>
        <div v-if="!availableHint" class="hint-not-ready">{{$store.state.localisation.dataLang['nextHintText']}}{{hintCoolDownLeft}}s</div>
    </div>
</template>

<script>
export default {
    name: 'HintManager',
    data: function(){
        return {
            leftToFind: [],
            hintedPokemon: '',
            animRefresh: false,
            availableHint: false,
            hintTimer: undefined,
            hintCoolDown: 30,
            hintCoolDownLeft: 60,
            hintedSuccession: [],
            hintCoolDownPerPokemon: 1,
            hintCoolDownStartPerPokemon: 2,
            hintAudio: null
        }
    },

    props: {
        lastFound: String,
        gameState: String,
        input: Object
    },

    watch: {
        lastFound: function(newVal){
            newVal = newVal.split('-')[0]
            this.leftToFind.splice(this.leftToFind.indexOf(newVal), 1)
            if(this.hintedSuccession.includes(newVal)) {
                this.startCoolDown();
                this.availableHint = false;
                this.hintedSuccession = []
                this.getRandomLeftToFindPokemon(false)
            }
        },

        gameState: function(newVal) {
            if(newVal == "playing") {
                this.startCoolDown();
            }

            else clearInterval(this.hintTimer)
        }
    },

    methods: {
        getAudioUrl(index) {
            return require('../../assets/pokedex/' + index + '/' + index + '.mp3');
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
                this.hintedSuccession.push(this.hintedPokemon)
                setTimeout(() => {this.animRefresh = false}, 2000)
            }
        },
        playHintedPokemonCry(index) {
            if(this.audio != null) this.audio.pause()
            this.audio = new Audio(this.getAudioUrl(index))
            this.audio.play()
            // this.$nextTick().then(() => {
            //     console.log(this.input)
            //     this.input.focus()
            // })
        },
        startCoolDown(){
            this.hintTimer = setInterval(() => {
                this.hintCoolDownLeft--
                if(this.hintCoolDownLeft == 0) {
                    this.availableHint = true;
                    this.hintCoolDownLeft = this.hintCoolDown
                    clearInterval(this.hintTimer)
                }
            }, 1000)
        }
    },

    mounted: function() {
        var numberOfPokemons = Object.keys(this.$store.state.pokedex.currentDex).length

        if(numberOfPokemons < 30) {
            this.hintCoolDown = this.hintCoolDownPerPokemon * numberOfPokemons
            this.hintCoolDownLeft = this.hintCoolDownStartPerPokemon * numberOfPokemons
        }

        for(const index in this.$store.state.pokedex.currentDex) {
            this.leftToFind.push(index)
        }
        this.getRandomLeftToFindPokemon(false)
    }
}
</script>