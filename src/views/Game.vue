<template>
  <v-container fill-height grid-list-lg>
    <v-layout fill-height row wrap justify-center>
      <v-flex xs12 md8>
        <v-card height="calc(100%)">
          <v-card-text class="text-xs-center headline font-weight-light grey--text text--darken-2">
            ANDERSON
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
                  :value="100"
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
                  :value="100"
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
                  <template v-for="(jogador, index) in jogadores">
                    <v-list-tile :key="index" ripple @click="selecionarJogador(jogador)">
                      <v-list-tile-content>
                        <v-list-tile-title class="font-weight-medium body-1">
                          {{jogador.nome}}
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
              <v-card height="calc(100% - 450px)">awd</v-card>
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
      jogador: null,
      jogadores: [
        {
          nome: 'Josefo',
          stamina: 100,
          vida: 100
        },
        {
          nome: 'Maria',
          stamina: 100,
          vida: 80
        },
        {
          nome: 'João',
          stamina: 100,
          vida: 50
        },
        {
          nome: 'Janaina',
          stamina: 10,
          vida: 70
        }
      ]
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
  }
}
</script>

<style scoped>
  .morto {
    opacity: 0.2;
  }
</style>
