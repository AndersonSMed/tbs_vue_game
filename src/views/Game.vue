<template>
  <v-container fill-height grid-list-lg>
    <v-layout fill-height row wrap justify-center>
      <v-flex xs12 md8>
        <v-card height="calc(100%)">
          <v-card-text class="text-xs-center headline font-weight-light grey--text text--darken-2">
            {{player.nickname}}
          </v-card-text>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6>
                <div class="text-xs-center headline font-weight-medium grey--text text--darken-1">
                  Vida
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
                  Stamina
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
                    <v-list-tile :key="jogador.sid" ripple @click="selecionarJogador(jogador)">
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
                  Ações Tomadas
                </div>
                <v-card height="calc(100% - 33px)" style="background-color: rgba(0,0,0,0.05)">
                </v-card>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-layout row wrap fill-height>
            <v-flex xs7 class="pl-4">
              <v-card height="calc(100% - 450px)" style="background-color: rgba(0,0,0,0.7)" flat>
                <v-layout column fill-height justify-end>
                  <v-card-text class="pb-0">
                    <v-list dense style="background-color: transparent" two-line>
                      <template v-for="(mensagem, index) in messages">
                        <v-list-tile :key="index" color="transparent">
                          <v-list-tile-content>
                            <v-list-tile-title class="font-weight-medium body-1 grey--text text--lighten-3">
                              {{mensagem.player}}
                            </v-list-tile-title>
                            <v-list-tile-title class="body-1 font-weight-light grey--text text--lighten-3">
                              {{mensagem.message}}
                            </v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </template>
                    </v-list>
                  </v-card-text>
                  <v-card-actions class="pt-0 pb-0 pr-5 pl-5" >
                    <v-text-field
                      single-line
                      flat
                      solo
                      hide-details
                    ></v-text-field>
                  </v-card-actions>
                </v-layout>
              </v-card>
            </v-flex>
            <v-flex xs5 class="pr-4" v-if="!jogando && jogador">
              <div class="text-xs-center title font-weight-light grey--text text--darken-2 pb-4">
                {{jogador.nome}}
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
      jogador: null
    }
  },
  methods: {
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
      return this.$store.getters.player
    },
    messages () {
      return this.$store.getters.messages
    }
  }
}
</script>

<style scoped>
  .morto {
    opacity: 0.2;
  }
</style>
