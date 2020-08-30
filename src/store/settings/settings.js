export default {
    state: {
        selectedGeneration: [],
        selectedTypes: [],
        selectedDifficulty: "",
        secondsPerPokemon: {
            "easy" : 12,
            "medium" : 10,
            "hard" : 8
        }
    },

    mutations: {
        setselectedGeneration(state, selectedGens) {
            state.selectedGeneration = selectedGens;
        },

        setselectedTypes(state, selectedTypes) {
            state.selectedTypes = selectedTypes;
        },

        setselectedDifficulty(state, selectedDifficulty) {
            state.selectedDifficulty = selectedDifficulty;
        }
    },

    actions: {
        setselectedGeneration(context, selectedGens) {
            context.commit('setselectedGeneration', selectedGens)
        },

        setselectedTypes(context, selectedTypes) {
            context.commit('setselectedTypes', selectedTypes)
        },

        setselectedDifficulty(context, selectedDifficulty) {
            context.commit('setselectedDifficulty', selectedDifficulty)
        }
    }
}