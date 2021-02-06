export default {
    state: {
        selectedGeneration: [],
        selectedTypes: [],
        selectedDifficulty: "",
        secondsPerPokemon: {
            "easy" : 12,
            "medium" : 10,
            "hard" : 8
        },

        timeUsed: 0,
        hasBeenPlayed: false,
        useAlternateForms: false
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
        },

        setTimeUsed(state, time) {
            state.timeUsed = time;
        },

        setHasBeenPlayed(state, bool) {
            state.hasBeenPlayed = bool;
        },

        setAlternateForms(state, bool) {
            state.useAlternateForms = bool;
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
        },

        setTimeUsed(context, time) {
            context.commit('setTimeUsed', time)
        },

        setHasBeenPlayed(context, bool) {
            context.commit('setHasBeenPlayed', bool)
        },

        setAlternateForms(context, bool) {
            context.commit('setAlternateForms', bool)
        }
    }
}