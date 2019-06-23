import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messages: [],
    gameStarted: false,
    players: [],
    player: null,
    info: null,
    messageWaiting: null
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
    setMessageWaiting (state, payload) {
      state.messageWaiting = payload
    },
    setGameStarted (state, payload) {
      state.gameStarted = payload
    },
    setPlayer (state, payload) {
      state.player = payload
    },
    setPlayers (state, payload) {
      state.players = payload
    }
  },
  actions: {
    SOCKET_new_message ({ commit }, payload) {
      commit('addMessage', JSON.parse(payload))
    },
    SOCKET_info ({ commit }, payload) {
      commit('setInfo', payload)
    },
    SOCKET_players ({ commit }, payload) {
      commit('setMessageWaiting', payload)
    },
    SOCKET_start_game ({ commit }) {
      commit('setGameStarted', true)
    },
    SOCKET_send_info ({ commit }, payload) {
      let players = JSON.parse(payload)
      let player = players.find((pl) => {
        return pl.sid === this._vm.$socket.id.split('#')[1]
      })
      players = players.filter((pl) => {
        return pl.sid !== this._vm.$socket.id.split('#')[1]
      })
      commit('setPlayer', player)
      commit('setPlayers', players)
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
    messageWaiting (state) {
      return state.messageWaiting
    },
    gameStarted (state) {
      return state.gameStarted
    },
    player (state) {
      return state.player
    },
    players (state) {
      return state.players
    }
  }
})
