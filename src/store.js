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
    messageWaiting: null,
    myTurn: false,
    attacks: [],
    log: []
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
    },
    setMyTurn (state, payload) {
      state.myTurn = payload
    },
    setAttacks (state, payload) {
      state.attacks = payload
    },
    addLog (state, payload) {
      state.log.push(payload)
    },
    setLog (state, payload) {
      state.log = payload
    }
  },
  actions: {
    SOCKET_set_actions ({ commit }, payload) {
      commit('setAttacks', JSON.parse(payload))
    },
    SOCKET_log ({ commit }, payload) {
      commit('addLog', payload)
    },
    SOCKET_set_turn ({ commit }, payload) {
      commit('setMyTurn', payload)
    },
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
    },
    passarVez ({ commit }) {
      this._vm.$socket.emit('passar_vez')
    },
    clearLog ({ commit }) {
      commit('setLog', [])
    },
    attackPlayer ({ commit }, payload) {
      this._vm.$socket.emit('attack', payload.targetSid, payload.actionId)
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
    },
    myTurn (state) {
      return state.myTurn
    },
    attacks (state) {
      return state.attacks
    },
    log (state) {
      return state.log
    }
  }
})
