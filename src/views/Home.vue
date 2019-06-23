<template>
  <v-container fluid fill-height grid-list-lg>
    <v-layout fill-height justify-center align-content-center row wrap>
      <v-flex xs6 md3>
        <v-layout column>
          <v-flex class="text-xs-center headline font-weight-light success--text text--lighten-1">
            Seja bem vindo(a)
          </v-flex>
        </v-layout>
        <v-layout column>
          <v-flex>
            <v-text-field
              outline
              label="Digite seu nickname"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-btn
              block
              outline
              class="green--text font-weight-bold"
              @click="conectar"
            >
              ENTRAR
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  methods: {
    conectar () {
    }
  }
}
</script>
