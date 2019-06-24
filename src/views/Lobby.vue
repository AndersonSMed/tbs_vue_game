<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center headline font-weight-bold error--text text--lighten-2">
        LOBBY
        <div class="subheader font-weight-light grey--text text--lighten-1">
          Esperando por jogadores {{messageWaiting}}
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs2>
        <v-card elevation="1" color="grey lighten-4">
          <v-card-text class="text-xs-center subheading font-weight-medium success--text text--lighten-1 text-truncate">
            Jogadores Online
            <v-list dense style="background-color: transparent" class="mt-2">
              <v-list-tile v-if="player">
                <v-list-tile-content>
                  <v-list-tile-title class="text-truncate font-weight-medium grey--text text--darken-2 subheading text-xs-center">
                    {{player.nickname}}
                    <span class="caption font-weight-medium grey--text">(você)</span>
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <template v-for="jogador in players">
                <v-list-tile :key="jogador.sid">
                  <v-list-tile-content>
                    <v-list-tile-title class="text-truncate font-weight-medium grey--text text--darken-2 subheading text-xs-center">
                      {{jogador.nickname}}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-list>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs8>
        <v-card height="500px" flat style="background-color: rgba(0,0,0,0.05)">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon flat absolute v-on="on" right top class="mt-5 mr-3" style="z-index: 100;" @click="apagarMensagens">
                <v-icon color="grey">delete</v-icon>
              </v-btn>
            </template>
            Apagar Mensagens
          </v-tooltip>
          <v-layout column fill-height justify-end>
            <v-card-text max-height="calc(100%)" class="scroll-y">
              <v-list dense style="background-color: transparent" two-line>
                <template v-for="(mensagem, index) in messages">
                  <v-list-tile :key="index">
                    <v-list-tile-content>
                      <v-list-tile-title class="font-weight-medium body-1 grey--text text--darken-1">
                        {{mensagem.player}}:
                      </v-list-tile-title>
                      <v-list-tile-title class="body-1 font-weight-light">
                        {{mensagem.message}}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card-text>
          </v-layout>
          <v-text-field
            @keydown.enter="sendMessage"
            v-model="mensagem"
            placeholder="Mensagem"
            single-line
            hide-details
          >
            <template v-slot:append-outer>
              <v-btn
                block
                icon
                large
                flat
                class="mt-0"
                @click="sendMessage"
                :disabled="!(mensagem && mensagem.length) "
              >
                <v-icon color="primary lighten-2" medium>send</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      mensagem: null
    }
  },
  computed: {
    messages () {
      return this.$store.getters.messages
    },
    messageWaiting () {
      return this.$store.getters.messageWaiting
    },
    player () {
      return this.$store.getters.player
    },
    players () {
      return this.$store.getters.players
    }
  },
  methods: {
    apagarMensagens () {
      this.$store.dispatch('clearMessages')
    },
    sendMessage () {
      if (this.mensagem && this.mensagem.length) {
        this.$store.dispatch('sendMessage', this.mensagem)
        this.mensagem = null
      }
    }
  }
}
</script>
