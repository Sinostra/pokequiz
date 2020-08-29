<template>
    <div class="game">
        <div class="table-wrapper">
            <div class="pokemonTable">
                <div class="block" v-for="object in displayDex" :key="object">
                    <div class="tableHead">
                        <div class="number">#</div>
                        <div class="name">Pokémon</div>
                        <div class="type1">{{$store.state.localisation.dataLang['tableTypeText']}} 1</div>
                        <div class="type2">{{$store.state.localisation.dataLang['tableTypeText']}} 2</div>
                    </div>
                    <div v-for="pokemon in object" :key="pokemon">
                        <div :id="index" class="pokemon-data" v-for="(data, index) in pokemon" :key="data">
                            <div class="data-number">{{index}}</div>
                            <div class="data-name">{{data.name}}</div>

                            <div class="data-type1">
                                <img :src="getUrl(data.type[0])">
                            </div>

                            <div class="data-type2">
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
            numberOfPokemons: 0,
            splitNumber: 1,
            displayDex: [],
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
        }
    },

    mounted: function() {
        this.numberOfPokemons = Object.keys(this.$store.state.pokedex.currentDex).length

        if(this.numberOfPokemons < 20) this.splitNumber = 1

        if(this.numberOfPokemons >= 20 && this.numberOfPokemons < 100) this.splitNumber = 2

        if(this.numberOfPokemons >= 100 && this.numberOfPokemons < 200) this.splitNumber = 3

        if(this.numberOfPokemons >= 200) this.splitNumber = 4

        this.splitPokedex()
        // console.log(this.$store.state.pokedex.currentDex)
        // console.log(this.displayDex)
    }
}
</script>