export default {
    state: {
        selectedGeneration: [],
        selectedTypes: []
    },

    mutations: {
        setselectedGeneration(state, selectedGens) {
            state.selectedGeneration = selectedGens;
        },

        setselectedTypes(state, selectedTypes) {
            state.selectedTypes = selectedTypes;
        }
    },

    actions: {
        setselectedGeneration(context, selectedGens) {
            context.commit('setselectedGeneration', selectedGens)
        },

        setselectedTypes(context, selectedTypes) {
            context.commit('setselectedTypes', selectedTypes)
        }
    }
}