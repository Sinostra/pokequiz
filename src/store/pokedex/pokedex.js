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
            //Boucle sur le pokédex utilisé
            for (const property in state.currentDex) {
                var intersection = false;
                var usedForm = []

                //Boucle sur les types choisis
                for (var i = 0; i < chosenTypes.length; i++) {

                    //Array des types du pokémon sur lequel on est
                    var typesArray = Array.from(state.currentDex[property]["type"])

                    for(var j = 0; j < typesArray.length; j++) {
                        //Si il y a un seul type, et pas un array de types
                        if(!Array.isArray(typesArray[j])) {
                            if(typesArray[j] == chosenTypes[i]) {
                                if(!usedForm.includes('regular')) usedForm.push('regular')
                                intersection = true;
                            } 
                        }

                        else {
                            //Si il y a un array de types
                            if(typesArray[j].includes(chosenTypes[i])) {
                                if(!usedForm.includes('regular')) usedForm.push('regular')
                                intersection = true;
                            }
                        }
                    }

                    //Si le pokémon sur lequel on est a plusieurs formes et si les formes alternatives sont activées
                    if(state.currentDex[property]['forms'] && this.state.settings.useAlternateForms) {

                        //On boucle sur les différentes formes alternatives du pokémon sur lequel on est
                        for(const formName in state.currentDex[property]['forms']) {

                            //Array des types de la forme alternative sur laquelle on est du pokémon sur lequel on est
                            typesArray = Array.from(state.currentDex[property]['forms'][formName]['type'])

                            for(var k = 0; k < typesArray.length; k++) {
                                //Si il y a un seul type, et pas un array de types
                                if(!Array.isArray(typesArray[k])) {
                                    if(typesArray[k] == chosenTypes[i]) {
                                        if(!usedForm.includes(formName)) usedForm.push(formName)
                                        intersection = true;
                                    } 
                                }
        
                                else {
                                    //Si il y a un array de types
                                    if(typesArray[k].includes(chosenTypes[i])) {
                                        if(!usedForm.includes(formName)) usedForm.push(formName)
                                        intersection = true;
                                    } 
                                }
                            }

                        }
                    }
                }

                usedForm.sort()

                //S'il y a plusieurs formes utilisées, met la forme regular en première position
                if(usedForm.indexOf('regular') > 0) {
                    usedForm.splice(usedForm.indexOf('regular'), 1);
                    usedForm.unshift('regular')
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