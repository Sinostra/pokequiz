<template>
    <div class="game">
        <div class="pokemonTable">
            <div class="block" v-for="object in displayDex" :key="object">
                <div v-for="pokemon in object" :key="pokemon">
                    <div v-for="(data, index) in pokemon" :key="data">
                        {{index}} : {{data.name}}
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
            splitNumber: 4,
            displayDex: [],
        }
    },

    methods: {
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
        if(this.numberOfPokemons >= 20) {
            this.splitPokedex()
        }
        console.log(this.displayDex)
    }
}
</script>