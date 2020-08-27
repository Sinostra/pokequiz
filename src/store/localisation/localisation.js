import dataLang from './data-lang';

export default {
  state: {
    chosenLang: 'english',
    dataLang
  },

  mutations: {
    chooseLanguage(state, chosenLanguage) {
      state.chosenLang = chosenLanguage;
      for (const property in state.dataLang) {    
        state.dataLang[property] = state.dataLang[property][chosenLanguage]
      }
    }
  },

  actions: {
    chooseLanguage(context, chosenLanguage) {
      context.commit('chooseLanguage', chosenLanguage)
    }
  }
}