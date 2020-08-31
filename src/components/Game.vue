<template>
    <div class="game">

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

                <div class="timer-wrapper">
                    <div>{{$store.state.localisation.dataLang['remainingTimeText']}}</div>
                    <div>{{displayMinsAndSecs(totalTime)}}</div>
                </div>

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
                    <input v-model="enteredName" v-on:keyup="checkEnteredPokemon" type="text">
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
                <div class="block" v-for="object in displayDex" :key="object">
                    <div class="tableHead">
                        <div class="number">#</div>
                        <div class="name">Pokémon</div>
                        <div v-if="$store.state.settings.selectedDifficulty != 'hard'" class="type1">{{$store.state.localisation.dataLang['tableTypeText']}} 1</div>
                        <div v-if="$store.state.settings.selectedDifficulty != 'hard'" class="type2">{{$store.state.localisation.dataLang['tableTypeText']}} 2</div>
                    </div>
                    <div v-for="pokemon in object" :key="pokemon">
                        <div :id="'number' + index" class="pokemon-data" v-for="(data, index) in pokemon" :key="data">
                            <div class="data-number">{{index}}</div>
                            <div class="data-name"></div>

                            <div v-if="$store.state.settings.selectedDifficulty != 'hard'" class="data-type1">
                                <img :src="getUrl(data.type[0])">
                            </div>

                            <div v-if="$store.state.settings.selectedDifficulty != 'hard'" class="data-type2">
                                <img v-if="data.type[1]" :src="getUrl(data.type[1])">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Game',

    data: function(){
        return {
            gameReady: false,
            gameState: 'toStart',
            numberOfPokemons: 0,
            splitNumber: 1,
            displayDex: [],
            enteredName: '',
            score: 0,
            totalTime: 0,
            interval: undefined
        }
    },

    methods: {
        getUrl(type) {
            return require('../assets/img/languages/' + this.$store.state.localisation.chosenLang + '/types/'+ type + '.png')
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
                    var currentCell = document.querySelector('#number' + index + ' .data-name')
                    currentCell.textContent = currentName

                    currentCell.classList.add('valid-answer')

                    setTimeout(() => {
                        currentCell.classList.add('transition')
                        currentCell.classList.remove('valid-answer')
                    },1)

                    delete this.$store.state.pokedex.currentDex[index]
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
                var currentName = this.$store.state.pokedex.currentDex[index]['name']
                var currentCell = document.querySelector('#number' + index + ' .data-name')
                currentCell.classList.add('not-found')
                currentCell.textContent = currentName
            }
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

        startGame(){
            this.interval = setInterval(() => {
                this.totalTime--
                if(this.totalTime == 0) {
                    this.finishGame()
                }
            }, 1000);
            this.gameState = "playing"
        },

        finishGame(){
            clearInterval(this.interval)
            this.gameState = "finished"
            this.fillMisssing()
        },

        pauseGame(){
            clearInterval(this.interval)
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

        this.totalTime = this.$store.state.settings.secondsPerPokemon[this.$store.state.settings.selectedDifficulty] * this.numberOfPokemons

        setTimeout(() => {
            document.getElementById('quiz-wrapper').classList.remove('background')
            this.splitPokedex()
            this.gameReady = true
        }, 2000)

    }
}
</script>