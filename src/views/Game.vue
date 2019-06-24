<template>
  <v-container fill-height grid-list-lg class="pa-0">
    <v-layout fill-height row wrap justify-center>
      <v-flex xs12 md11 lg10 class='pa-0'>
        <v-card height="calc(100%)">
          <v-card-text class="text-xs-center headline font-weight-light grey--text text--darken-2 pb-0">
            {{player.nickname}}
          </v-card-text>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6>
                <div class="text-xs-center headline font-weight-medium grey--text text--darken-1">
                  Vida: {{player.vida}}
                </div>
                <v-progress-linear
                  color="error"
                  background-opacity="0"
                  :value="player.vida"
                  height="15"
                ></v-progress-linear>
              </v-flex>
              <v-flex xs6>
                <div class="text-xs-center headline font-weight-medium grey--text text--darken-1">
                  Stamina: {{player.stamina}}
                </div>
                <v-progress-linear
                  color="success"
                  background-opacity="0"
                  :value="player.stamina"
                  height="15"
                ></v-progress-linear>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-text>
            <v-layout>
              <v-flex xs6 md4>
                <div class="subheading font-weight-medium grey--text text--darken-1 pb-2">
                  Jogadores
                </div>
                <v-list dense style="border: 1px solid black">
                  <template v-for="(jogador) in players">
                    <v-list-tile :key="jogador.sid" ripple @click="selecionarJogador(jogador)" :class="{opaco: !jogador.alive}">
                      <v-list-tile-content>
                        <v-list-tile-title class="font-weight-medium body-1">
                          {{jogador.nickname}}
                        </v-list-tile-title>
                      </v-list-tile-content>
                      <v-list-tile-action>
                        <v-progress-linear
                          color="error"
                          class="ma-0"
                          background-opacity="0"
                          :value="jogador.vida"
                        ></v-progress-linear>
                        <v-progress-linear
                          color="success"
                          class="ma-0"
                          background-opacity="0"
                          :value="jogador.stamina"
                        ></v-progress-linear>
                      </v-list-tile-action>
                    </v-list-tile>
                  </template>
                </v-list>
              </v-flex>
              <v-flex xs6 md8>
                <div class="subheading font-weight-medium grey--text text--darken-1 pb-2">
                  Histórico de ações
                </div>
                <v-card height="200px" style="background-color: rgba(0,0,0,0.05)">
                  <v-layout column fill-height justify-end>
                    <v-card-text class="pb-0 scroll-y" style="max-height: calc(100%);">
                      <v-btn icon flat absolute right top class="mt-5 mr-3" style="z-index: 100;" @click="clearLog">
                        <v-icon color="grey darken-1">delete</v-icon>
                      </v-btn>
                      <v-list dense style="background-color: transparent">
                        <template v-for="(mensagem, index) in log">
                          <v-list-tile :key="index" color="transparent">
                            <v-list-tile-content>
                              <v-list-tile-title class="body-1 font-weight-light grey--text text--darken-3">
                                {{mensagem}}
                              </v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </template>
                      </v-list>
                    </v-card-text>
                  </v-layout>
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-layout row wrap>
            <v-flex xs7 class="pl-4">
              <v-card height="410px" style="background-color: rgba(0,0,0,0.7)" flat>
                <v-btn flat absolute disabled right top class="mt-5 mr-3">
                  <span class="grey--text text--lighten-3">CHAT</span>
                </v-btn>
                <v-layout column fill-height justify-end>
                  <v-card-text class="pb-0 scroll-y" style="max-height: 400px;">
                    <v-list dense style="background-color: transparent" two-line>
                      <template v-for="(mensagem, index) in messages">
                        <v-list-tile :key="index" color="transparent">
                          <v-list-tile-content>
                            <v-list-tile-title class="font-weight-medium body-1 grey--text text--lighten-3">
                              {{mensagem.player}}:
                            </v-list-tile-title>
                            <v-list-tile-title class="body-1 font-weight-light grey--text text--lighten-3">
                              {{mensagem.message}}
                            </v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </template>
                    </v-list>
                  </v-card-text>
                  <v-card-actions>
                    <v-layout xs2>
                      <v-flex class="text-xs-center">
                        <v-btn icon flat class="mt-2" @click="apagarMensagens">
                          <v-icon color="grey lighten-4">delete</v-icon>
                        </v-btn>
                      </v-flex>
                      <v-flex xs10 class="pr-5">
                        <v-text-field
                          v-model="mensagem"
                          placeholder="Mensagem"
                          @keydown.enter="sendMessage"
                          single-line
                          flat
                          solo
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-card-actions>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs5 class="pr-4" v-if="!jogando && jogador">
              <div class="text-xs-center title font-weight-light grey--text text--darken-2 pb-4">
                {{jogador.nickname}}
              </div>
              <div class="text-xs-center subheading font-weight-medium grey--text text--darken-1">
                Vida: {{jogador.vida}}
              </div>
              <v-progress-linear
                color="error"
                background-opacity="0"
                :value="jogador.vida"
                height="10"
              ></v-progress-linear>
              <div class="text-xs-center subheading font-weight-medium grey--text text--darken-1">
                Stamina: {{jogador.stamina}}
              </div>
              <v-progress-linear
                color="success"
                background-opacity="0"
                :value="jogador.stamina"
                height="10"
              ></v-progress-linear>
              <template v-if="myTurn">
                <div class="text-xs-center title font-weight-light grey--text text--darken-2 pb-2 pt-2">
                  Selecione uma ação para atacar
                </div>
                <v-layout>
                  <v-flex xs10>
                    <v-list>
                      <template v-for="attack in attacks">
                        <v-list-tile :key="attack.id" ripple v-if="attack.cost <= player.stamina" @click="atacarPlayer(attack)">
                          <v-list-tile-content>
                            <v-list-tile-title class="font-weight-medium grey--text text--darken-2">
                              {{attack.name}}
                            </v-list-tile-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-list-tile-action-text class="text-xs-left">
                              Causa {{attack.damage}} de dano
                            </v-list-tile-action-text>
                            <v-list-tile-action-text class="text-xs-left">
                              Custa {{attack.cost}} de stamina
                            </v-list-tile-action-text>
                          </v-list-tile-action>
                        </v-list-tile>
                        <v-list-tile :key="attack.id" v-else class="opaco">
                          <v-list-tile-content>
                            <v-list-tile-title class="font-weight-medium grey--text text--darken-2">
                              {{attack.name}}
                            </v-list-tile-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-list-tile-action-text>
                              Causa {{attack.damage}} de dano
                            </v-list-tile-action-text>
                            <v-list-tile-action-text>
                              Custa {{attack.cost}} de stamina
                            </v-list-tile-action-text>
                          </v-list-tile-action>
                        </v-list-tile>
                      </template>
                    </v-list>
                  </v-flex>
                  <v-flex xs2 align-self-center>
                    <v-tooltip left>
                      <template v-slot:activator="{ on }">
                        <v-btn flat icon v-on="on" @click="passarVez">
                          <v-icon color="grey darken-2">navigate_next</v-icon>
                        </v-btn>
                      </template>
                      Passar a vez
                    </v-tooltip>
                  </v-flex>
                </v-layout>
              </template>
            </v-flex>
            <v-flex xs5 align-self-center class="pr-4" v-else-if="myTurn">
              <div class="text-xs-center headline font-weight-light grey--text text--darken-2 pb-5">
                Esse é o seu turno, {{player.nickname}}, selecione um jogador para que possa atacar
              </div>
              <v-btn block flat class="success--text text--darken-1" @click="passarVez">
                PASSAR MINHA VEZ (+20 de stamina)
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      jogando: false,
      jogador: null,
      mensagem: null
    }
  },
  methods: {
    clearLog () {
      this.$store.dispatch('clearLog')
    },
    passarVez () {
      this.$store.dispatch('passarVez')
      this.jogador = null
    },
    sendMessage () {
      if (this.mensagem && this.mensagem.length) {
        this.$store.dispatch('sendMessage', this.mensagem)
        this.mensagem = null
      }
    },
    atacarPlayer (action) {
      this.$store.dispatch('attackPlayer', { targetSid: this.jogador.sid, actionId: action.id })
      this.jogador = null
    },
    apagarMensagens () {
      this.$store.dispatch('clearMessages')
    },
    selecionarJogador (jogador) {
      if (!this.jogando) {
        if (this.jogador === jogador) {
          this.jogador = null
        } else {
          this.jogador = jogador
        }
      }
    }
  },
  computed: {
    player () {
      return this.$store.getters.player
    },
    players () {
      return this.$store.getters.players
    },
    messages () {
      return this.$store.getters.messages
    },
    myTurn () {
      return this.$store.getters.myTurn
    },
    attacks () {
      return this.$store.getters.attacks
    },
    log () {
      return this.$store.getters.log
    }
  }
}
</script>

<style scoped>
  .opaco {
    opacity: 0.2;
  }
</style>
