import dataDex from './data-dex';

export default {
    state: {
        fullDex: dataDex,
        currentDex: {}
    },

    mutations: {
        refillDex(state) {
            state.currentDex = state.fullDex
        },

        pokedexLanguage(state, chosenLanguage) {
            for (const property in state.fullDex) {
                state.fullDex[property]["name"] = state.fullDex[property]["name"][chosenLanguage]
            }
        },

        filterByGen(state, chosenGens) {
            for (const property in state.currentDex) {
                var intersection = false;
                for (var i = 0; i < chosenGens.length; i++) {
                    if(state.currentDex[property]["gen"] == chosenGens[i]) {
                        intersection = true;
                    }
                }

                if(!intersection) {
                    delete state.currentDex[property]
                }
            }
        },

        filterByType(state, chosenTypes) {
            for (const property in state.currentDex) {
                var intersection = false;
                for (var i = 0; i < chosenTypes.length; i++) {
                    if(Array.from(state.currentDex[property]["type"]).includes(chosenTypes[i])) {
                        intersection = true;
                    }
                }

                if(!intersection) {
                    delete state.currentDex[property]
                }
            }

            console.log(state.currentDex)
        }
    },

    actions: {
        refillDex(context) {
            context.commit('refillDex')
        },

        pokedexLanguage(context, chosenLanguage) {
            context.commit('pokedexLanguage', chosenLanguage)
            context.commit('refillDex')
        },

        filterByGen(context, chosenGens) {
            context.commit('filterByGen', chosenGens)
        },

        filterByType(context, chosenTypes) {
            context.commit('filterByType', chosenTypes)
        }
    }
}