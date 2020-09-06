<template>
    <div class="game" :class="gameState == 'playing' ? 'playing' : ''">
        
        <div v-if="gameReady" class="interface-wrapper">

            <div class="gameInfos">
                <div class="score-wrapper">
                    <div class="points">
                        <div>{{$store.state.localisation.dataLang['scoreText']}} </div>
                        <div>{{score}}/{{numberOfPokemons}}</div>
                    </div>
                    <div v-if="gameState == 'finished'" class="percentage">
                        ({{parseInt((score / numberOfPokemons) * 100)}}%)
                    </div>
                    
                </div>

                <Timer v-on:time-up="finishGame()" :gameState="gameState"/>

                <div class="timer-btn-wrapper">
                    <div v-if="gameState == 'playing'" v-on:click="pauseGame()" class="pauseBtn"></div>
                    <div v-if="gameState == 'paused'" v-on:click="startGame()" class="resumeBtn"></div>
                </div>
            </div>

            <div class="interactive-wrapper">

                <div v-if="gameState == 'toStart'" class="btn-wrapper">
                    <div v-on:click="startGame()" class="play btn">{{$store.state.localisation.dataLang['playText']}}</div>
                </div>

                <div v-if="gameState == 'playing'" class="input-wrapper">
                    <div class="enterNamesInstruct">{{$store.state.localisation.dataLang['enterNameInstruct']}}</div>
                    <input v-model="enteredName" v-on:input="checkEnteredPokemon" type="text">
                </div>

                <div v-if="gameState == 'playing' || gameState == 'paused'" class="btn-wrapper middleBtn">
                    <div v-on:click="finishGame()" class="giveUp btn">{{$store.state.localisation.dataLang['giveUpText']}}</div>
                </div>

                <div v-if="gameState == 'finished'" class="btn-wrapper">
                    <div v-on:click="playAgain()" class="playAgain btn">{{$store.state.localisation.dataLang['playAgainText']}}</div>
                </div>
            </div>

        </div>

        <div class="table-wrapper">
            <div class="pokemonTable">
                <div class="block" v-for="(object, cutObject) in displayDex" :key="cutObject">
                    <div class="tableHead">
                        <div class="number">#</div>
                        <div class="name">Pokémon</div>
                        <div v-if="$store.state.settings.selectedDifficulty != 'hard'" class="type1">{{$store.state.localisation.dataLang['tableTypeText']}} 1</div>
                        <div v-if="$store.state.settings.selectedDifficulty != 'hard'" class="type2">{{$store.state.localisation.dataLang['tableTypeText']}} 2</div>
                    </div>
                    <div v-for="(pokemon, dexNumber) in object" :key="dexNumber">
                        <div :id="'number' + index" class="pokemon-data" v-for="(data, index) in pokemon" :key="index">
                            <div class="data-number">{{index}}</div>
                            <div class="data-name">
                                <div :class="data.forgotten ? 'forgotten' : ''" v-if="data.found || data.forgotten">{{data.name}}</div>
                            </div>

                            <div v-if="$store.state.settings.selectedDifficulty != 'hard'" class="data-type1">
                                <div>
                                    <div class="typeImg-wrapper" v-for="(type, index) in displayTypes(data.type[0])" :key="index">
                                        <img :src="getUrl(type)">
                                    </div>
                                </div>
                            </div>

                            <div v-if="$store.state.settings.selectedDifficulty != 'hard'" class="data-type2">
                                <div v-if="data.type[1]">
                                    <div class="typeImg-wrapper" v-for="(type, index) in displayTypes(data.type[1])" :key="index">
                                        <img :src="getUrl(type)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

import Timer from './Timer.vue'

export default {
    name: 'Game',

    components: {
        Timer,
    },

    data: function(){
        return {
            gameReady: false,
            gameState: 'toStart',
            numberOfPokemons: 0,
            splitNumber: 1,
            displayDex: [],
            enteredName: '',
            score: 0,
        }
    },

    methods: {
        getUrl(type) {
            return require('../assets/img/languages/' + this.$store.state.localisation.chosenLang + '/types/'+ type + '.png')
        },

        displayTypes(types) {
            var typesArray
            if(Array.isArray(types)) {
                typesArray = Array.from(types)
            }

            else {
                typesArray = []
                typesArray.push(types)
            }

            return typesArray
        },

        splitPokedex() {
            //Nombre de pokémons à afficher par colonne
            var splitDex = Math.floor(this.numberOfPokemons / this.splitNumber)
            var lDex = this.$store.state.pokedex.currentDex
            this.displayDex = []
            var startSlice = 0
            var endSlice = splitDex
            for(var i = 0; i < this.splitNumber; i++) {
                //dernière itération de la boucle
                if(i == this.splitNumber -1) {
                    this.displayDex.push(Object.keys(lDex).slice(startSlice).map(key => ({[key]:lDex[key]})))
                }

                else {
                    this.displayDex.push(Object.keys(lDex).slice(startSlice, endSlice).map(key => ({[key]:lDex[key]})))
                    startSlice += splitDex
                    endSlice += splitDex
                }
            }
        },

        checkEnteredPokemon() {
            for(const index in this.$store.state.pokedex.currentDex) {

                var currentName = this.$store.state.pokedex.currentDex[index]['name']
                if(this.replaceAllSpecialChars(currentName) == this.replaceAllSpecialChars(this.enteredName)) {

                    if(!this.$store.state.pokedex.currentDex[index]['found']) {

                        var currentCell = document.querySelector('#number' + index + ' .data-name')
    
                        currentCell.classList.add('valid-answer')
    
                        setTimeout(() => {
                            currentCell.classList.add('transition')
                            currentCell.classList.remove('valid-answer')
                        },1)
    
                        this.$store.state.pokedex.currentDex[index]['found'] = true
                        this.score++
    
                        //Check victoire
                        if(this.score == this.numberOfPokemons) {
                            this.finishGame()
                        }
                        //Rappel de la fonction au cas où un autre Pokémon porte le même nom
                        this.checkEnteredPokemon()
                        this.enteredName = ''
                    }
                }
                
            }
        },

        replaceAllSpecialChars(string) {
            var newString = string.toLowerCase()
            newString = newString.replace(/[é,è,ê,ë]/g, 'e')
            newString = newString.replace(/[î,ï]/g, 'i')
            newString = newString.replace(/[â,ä,à]/g, 'a')
            newString = newString.replace(/[û,ü,ù]/g, 'u')
            newString = newString.replace(/[ô,ö]/g, 'o')
            newString = newString.replace(/[œ]/g, 'oe')
            newString = newString.replace(/[ç]/g, 'c')
            newString = newString.replace(/[ß]/g, 'ss')
            newString = newString.replace(/[' ','.',':','♀','♂']/g, '')
            newString = newString.replace(/-/g, '')
            return newString
        },

        fillMisssing() {

            for(const index in this.$store.state.pokedex.currentDex) {

                if(!this.$store.state.pokedex.currentDex[index]['found']) {
                    this.$store.state.pokedex.currentDex[index]['forgotten'] = true
                }
            }
        },

        startGame(){
            this.gameState = "playing"
        },

        finishGame(){
            this.gameState = "finished"
            this.fillMisssing()
        },

        pauseGame(){
            this.gameState = "paused"
        },

        playAgain(){
            this.$store.dispatch("refillDex")
            this.$store.dispatch("rePlay")
        }
    },

    mounted: function() {

        this.numberOfPokemons = Object.keys(this.$store.state.pokedex.currentDex).length

        if(this.numberOfPokemons < 20) this.splitNumber = 1

        else if(this.numberOfPokemons >= 20 && this.numberOfPokemons < 100) this.splitNumber = 2

        else if(this.numberOfPokemons >= 100 && this.numberOfPokemons < 200) this.splitNumber = 3

        else if(this.numberOfPokemons >= 200) this.splitNumber = 4

        for(const index in this.$store.state.pokedex.currentDex) {
            this.$store.state.pokedex.currentDex[index]['found'] = false
            this.$store.state.pokedex.currentDex[index]['forgotten'] = false
        }

        setTimeout(() => {
            document.getElementById('quiz-wrapper').classList.remove('background')
            this.splitPokedex()
            this.gameReady = true
        }, 2000)

    },

}
</script>