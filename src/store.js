import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: [],
    gameStarted: false,
    info: null,
    error: null
  },
  mutations: {
    addMessage (state, payload) {
      state.messages.push(payload)
    },
    setMessages (state, payload) {
      state.messages = payload
    },
    setInfo (state, payload) {
      state.info = payload
    },
    setError (state, payload) {
      state.error = payload
    }
  },
  actions: {
    SOCKET_new_message ({ commit }, payload) {
      commit('addMessage', JSON.parse(payload))
    },
    SOCKET_info ({ commit }, payload) {
      commit('setInfo', payload)
    },
    SOCKET_error ({ commit }, payload) {
      commit('setError', payload)
    },
    clearMessages ({ commit }) {
      commit('setMessages', [])
    },
    enterLobby ({ commit }, payload) {
      this._vm.$socket.emit('enter', payload)
    },
    sendMessage ({ commit }, payload) {
      this._vm.$socket.emit('send_message', payload)
    }
  },
  getters: {
    messages (state) {
      return state.messages
    },
    info (state) {
      return state.info
    },
    error (state) {
      return state.error
    }
  }
})
