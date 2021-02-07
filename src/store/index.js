import { createStore } from 'vuex'
import localisation from './localisation/localisation'
import settings from './settings/settings'
import pokedex from './pokedex/pokedex'

export default createStore({
  state: {
    currentComp: "Language",
    compOrder: ["Language", "Generation", "Type", "Difficulty", "Game", "Score"],
    displayedBackground: true
  },
  mutations: {
    nextComp(state) {
      var currentIndex = state.compOrder.indexOf(state.currentComp)
      state.currentComp = state.compOrder[currentIndex + 1]
    },
    previousComp(state) {
      var currentIndex = state.compOrder.indexOf(state.currentComp)
      state.currentComp = state.compOrder[currentIndex - 1]
    },
    rePlay(state) {
      state.currentComp = "Generation"
    },
    displayBackground(state, bool) {
      state.displayedBackground = bool;
    }
  },
  actions: {
    nextComp(context) {
      context.commit('nextComp')
    },
    previousComp(context) {
      context.commit('previousComp')
    },
    rePlay(context) {
      context.commit('rePlay')
    },
    displayBackground(context, bool) {
      context.commit('displayBackground', bool)
    }
  },
  modules: {
    localisation,
    settings,
    pokedex
  }
})
