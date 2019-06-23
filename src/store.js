import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: []
  },
  mutations: {
    addMessage (state, payload) {
      state.messages.push(payload)
    },
    setMessages (state, payload) {
      state.messages = payload
    }
  },
  actions: {
    pushMessage ({ commit }, payload) {
      commit('addMessage', payload)
    },
    clearMessages ({ commit }) {
      commit('setMessages', [])
    }
  },
  getters: {
    messages (state) {
      return state.messages
    }
  }
})
