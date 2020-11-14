import dataDex from './data-dex';

export default {
    state: {
        fullDex: dataDex,
        currentDex: {}
    },

    mutations: {
        refillDex(state) {
            state.currentDex = {}

            Object.assign(state.currentDex, state.fullDex)
        },

        pokedexLanguage(state, chosenLanguage) {
            for (const property in state.fullDex) {
                state.fullDex[property]["name"] = state.fullDex[property]["name"][chosenLanguage]

                if(state.fullDex[property]['forms']) {
                    for(const formName in state.fullDex[property]['forms']) {
                        state.fullDex[property]['forms'][formName]["name"] = state.fullDex[property]['forms'][formName]["name"][chosenLanguage]
                    }
                }
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
                var usedForm = []
                for (var i = 0; i < chosenTypes.length; i++) {

                    var typesArray = Array.from(state.currentDex[property]["type"])

                    for(var j = 0; j < typesArray.length; j++) {
                        if(!Array.isArray(typesArray[j])) {
                            if(typesArray[j] == chosenTypes[i]) {
                                if(!usedForm.includes('regular')) usedForm.push('regular')
                                intersection = true;
                            } 
                        }

                        else {
                            if(typesArray[j].includes(chosenTypes[i])) {
                                if(!usedForm.includes('regular')) usedForm.push('regular')
                                intersection = true;
                            }
                        }
                    }

                    if(state.currentDex[property]['forms'] && this.state.settings.useAlternateForms) {

                        for(const formName in state.currentDex[property]['forms']) {

                            typesArray = Array.from(state.currentDex[property]['forms'][formName]['type'])


                            for(var k = 0; k < typesArray.length; k++) {
                                if(!Array.isArray(typesArray[k])) {
                                    if(typesArray[k] == chosenTypes[i]) {
                                        if(!usedForm.includes(formName)) usedForm.push(formName)
                                        intersection = true;
                                    } 
                                }
        
                                else {
                                    if(typesArray[k].includes(chosenTypes[i])) {
                                        if(!usedForm.includes(formName)) usedForm.push(formName)
                                        intersection = true;
                                    } 
                                }
                            }

                        }
                    }
                }

                state.currentDex[property]['usedForm'] = usedForm
                if(!intersection) {
                    delete state.currentDex[property]
                }

                
            }
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