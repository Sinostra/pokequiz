import { createStore } from 'vuex'
import localisation from './localisation/localisation'
import settings from './settings/settings'

export default createStore({
  state: {
    currentComp: "Language",
    compOrder: ["Language", "Generation", "Type", "Difficulty", "Game"]
  },
  mutations: {
    changecurrentComp(state) {
      var currentIndex = state.compOrder.indexOf(state.currentComp)
      state.currentComp = state.compOrder[currentIndex + 1]
    }
  },
  actions: {
    changecurrentComp(context) {
      context.commit('changecurrentComp')
    }
  },
  modules: {
    localisation,
    settings
  }
})
