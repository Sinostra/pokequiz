<template>
    <div v-show="numberOfPokemons > 0" class="game" :class="getGameClass()">
        
        <div v-show="gameReady" class="interface-wrapper">

            <div class="gameInfos">
                <div class="score-wrapper">
                    <div class="points">
                        <div>{{$store.state.localisation.dataLang['scoreText']}} :</div>
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

                <div v-if="gameState == 'finished'" class="regulator"></div>
            </div>

            <div class="interactive-wrapper">

                <div v-if="gameState == 'toStart'" class="btn-wrapper">
                    <div v-on:click="startGame()" class="play btn green-btn">{{$store.state.localisation.dataLang['playText']}}</div>
                    <div v-on:click="clickNext()" class="next btn green-btn">{{$store.state.localisation.dataLang['getToScoreText']}}</div>
                </div>

                <div v-show="gameState == 'playing'" class="input-wrapper">
                    <div v-if="lastFound" class="last-found">
                        {{$store.state.localisation.dataLang['lastFoundText']}} {{$store.state.pokedex.currentDex[lastFound]['name']}}
                    </div>
                    <div class="enterNamesInstruct">{{$store.state.localisation.dataLang['enterNameInstruct']}}</div>
                    <input v-model="enteredName" v-on:input="checkEnteredPokemon" ref="pokemonInput" type="text" :class="answerFound ? 'valid': ''">
                    <HintManager v-if="$store.state.settings.useHints" :lastFound="lastFound" :gameState="gameState"/>
                </div>

                <div v-if="gameState == 'playing' || gameState == 'paused'" class="btn-wrapper">
                    <div v-on:click="finishGame()" class="giveUp btn red-btn">{{$store.state.localisation.dataLang['giveUpText']}}</div>
                </div>

                <div v-if="gameState == 'finished'" class="btn-wrapper">
                    <div v-on:click="playAgain()" class="playAgain btn green-btn">{{$store.state.localisation.dataLang['playAgainText']}}</div>
                    <div v-on:click="clickNext()" class="next btn green-btn">{{$store.state.localisation.dataLang['getToScoreText']}}</div>
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
                            <div class="pokeForm">
                                <div>
                                    <div class="data-number">{{index.split("-")[0]}}</div>
                                    <div class="data-name" :class="getNameCellClass(index)">
                                        <div :class="getNameClass(index)" v-if="data.found || data.forgotten">{{data.displayName || data.name}}</div>
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
        </div>
    </div>
    <div v-if="numberOfPokemons == 0" class="empty-pokedex">
        <div class="error-img"></div>
        <div class="error-mg">{{$store.state.localisation.dataLang['noPokemonText']}}</div>
        <div class="btn-wrapper">
            <div v-on:click="playAgain()" class="playAgain btn green-btn">{{$store.state.localisation.dataLang['playAgainText']}}</div>
        </div>
        
    </div>
</template>
<script>

import Timer from './gameComponent/Timer.vue'
import HintManager from './gameComponent/HintManager.vue'

export default {
    name: 'Game',

    components: {
        Timer,
        HintManager
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
            lastFound: '',
            answerFound: false,
        }
    },

    methods: {
        getUrl(type) {
            return require('../assets/img/languages/' + this.$store.state.localisation.chosenLang + '/types/'+ type + '.png')
        },

        getGameClass() {
            return {
                playing : this.gameState == 'playing',
                hints : this.$store.state.settings.useHints
            }
        },

        getNameCellClass(index) {
            return {
                validanswer : this.$store.state.pokedex.currentDex[index]['found'],
                transition: this.$store.state.pokedex.currentDex[index]['transition']
            }
        },

        getNameClass(index) {
            return {
                forgotten : this.$store.state.pokedex.currentDex[index]['forgotten']
            }
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

        splitPokedex(numberOfPokemons) {
            //Nombre de pokémons à afficher par colonne
            var splitDex = Math.floor(numberOfPokemons / this.splitNumber)
            var lDex = this.$store.state.pokedex.currentDex

            //Méthode pour que lDex considère les formes alternatives comme des pokémon à part entière
            for(const index in lDex) {
                var currentFormsPokemon = lDex[index]['usedForm']

                if(currentFormsPokemon.length > 1 || !currentFormsPokemon.includes('regular')) {

                    for(var f = 0; f < currentFormsPokemon.length; f++) {

                        if(currentFormsPokemon[f] != 'regular') {
                            var newPokemon = {
                                name: lDex[index]['name'],
                                displayName: lDex[index]['forms'][currentFormsPokemon[f]]['name'],
                                type: lDex[index]['forms'][currentFormsPokemon[f]]['type'],
                                found: false,
                                forgotten: false
                            }

                            lDex[index + '-' + f] = newPokemon
                        }
                    }
                }

                if(!currentFormsPokemon.includes('regular')) {
                    delete lDex[index]
                }
            }

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

            //Méthode pour trier displayDex en prenant en compte les formes alternatives ajoutées
            for(var j = 0; j < this.displayDex.length; j++) {
                this.displayDex[j].sort(function(a, b) {
                    a = parseInt(Object.keys(a))
                    b = parseInt(Object.keys(b))
                    return a -b
                })
            }
        },

        checkEnteredPokemon() {
            for(const index in this.$store.state.pokedex.currentDex) {

                var currentName = this.$store.state.pokedex.currentDex[index]['name']
                if(this.replaceAllSpecialChars(this.enteredName) == this.replaceAllSpecialChars(currentName)) {

                    if(!this.$store.state.pokedex.currentDex[index]['found']) {

                        this.$store.state.pokedex.currentDex[index]['found'] = true
                        this.answerFound = true
                        
                        //Gère la transition du vert sur l'input et le nom
                        setTimeout(() => {
                            this.$store.state.pokedex.currentDex[index]['transition'] = true
                            this.answerFound = false
                        }, 200)

                        //Permet de ne pas compter deux fois le même pokémon si plusieurs formes
                        if(index.split('-')[0] != this.lastFound.split('-')[0]) {
                            this.score++
                        }

                        this.lastFound = index
    
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
            newString = newString.replace(/galarian/g, '')
            newString = newString.replace(/alolan/g, '')
            newString = newString.replace(/galar/g, '')
            newString = newString.replace(/alola/g, '')
            newString = newString.replace(/mega/g, '')
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
            this.$nextTick().then(() => {
                this.$refs.pokemonInput.focus()
            })
        },

        finishGame(){
            this.gameState = "finished"
            this.fillMisssing()
        },

        pauseGame(){
            this.gameState = "paused"
        },

        playAgain() {
            this.$store.dispatch("refillDex");
            this.$store.dispatch("rePlay");
        },

        clickNext: function(){
            if(this.gameState == "finished" && this.score > 0) {
                this.$store.dispatch("setHasBeenPlayed", true)
            }
            this.$store.dispatch("nextComp")
        }

    },

    mounted: function() {

        this.$store.dispatch("setHasBeenPlayed", false)

        this.numberOfPokemons = Object.keys(this.$store.state.pokedex.currentDex).length
        var pokemonAmount = 0;

        for(const index in this.$store.state.pokedex.currentDex) {
            pokemonAmount += this.$store.state.pokedex.currentDex[index]['usedForm'].length
            this.$store.state.pokedex.currentDex[index]['found'] = false
            this.$store.state.pokedex.currentDex[index]['forgotten'] = false
        }

        if(pokemonAmount < 20) this.splitNumber = 1

        else if(pokemonAmount >= 20 && pokemonAmount < 100) this.splitNumber = 2

        else if(pokemonAmount >= 100 && pokemonAmount < 200) this.splitNumber = 3

        else if(pokemonAmount >= 200) this.splitNumber = 4

        if(this.$store.state.displayedBackground) {
            setTimeout(() => {
                this.$store.dispatch("displayBackground", false)
                this.splitPokedex(pokemonAmount)
                this.gameReady = true
            }, 2000)
        }

        else {
            this.splitPokedex(pokemonAmount)
            this.gameReady = true
        }
    },

}
</script>