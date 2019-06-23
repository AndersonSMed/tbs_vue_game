<template>
  <v-container fluid fill-height>
    <v-layout fill-height row wrap justify-center>
      <v-flex xs12 class="text-xs-center headline font-weight-bold error--text text--lighten-2">
        LOBBY
        <div class="subheader font-weight-light grey--text text--lighten-1">
          Esperando por jogadores
        </div>
      </v-flex>
      <v-flex xs8>
        <v-card height="500px" flat style="background-color: rgba(0,0,0,0.05)">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon flat absolute v-on="on" right top class="mt-5 mr-3" style="z-index: 100;" @click="apagarMensagens">
                <v-icon color="grey">clear</v-icon>
              </v-btn>
            </template>
            Apagar Mensagens
          </v-tooltip>
          <v-layout column fill-height justify-end>
            <v-card-text max-height="calc(100%)" class="scroll-y">
              <v-list dense style="background-color: transparent" two-line>
                <template v-for="(mensagem, index) in messages">
                  <v-list-tile :key="index" color="transparent">
                    <v-list-tile-content>
                      <v-list-tile-title class="font-weight-medium body-1 grey--text text--darken-1">
                        {{mensagem.nickname}}
                      </v-list-tile-title>
                      <v-list-tile-title class="body-1 font-weight-light">
                        {{mensagem.text}}
                      </v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card-text>
          </v-layout>
        </v-card>
      </v-flex>
      <v-flex xs7>
        <v-text-field
          v-model="mensagem"
          label="Enviar mensagem"
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
            >
              <v-icon color="primary lighten-2" medium>send</v-icon>
            </v-btn>
          </template>
        </v-text-field>
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
    }
  },
  methods: {
    apagarMensagens () {
      this.$store.dispatch('clearMessages')
    },
    sendMessage () {
      this.$store.dispatch('pushMessage', { nickname: 'TESTE', text: this.mensagem })
    }
  }
}
</script>
