<template>
  <v-app>
    <router-view/>
    <v-dialog
      hide-overlay
      v-model="snackbar.active"
      width="300"
    >
      <v-card color="grey" @click="snackbar.active = false">
        <v-card-text class="subheader font-weight-medium grey--text text--lighten-3">
          {{snackbar.text}}
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      snackbar: {
        active: false,
        text: null,
        timeout: 4000
      }
    }
  },
  watch: {
    gameStarted (val, oldval) {
      if (val && !oldval) {
        this.$router.push('/game')
      }
    },
    info (val) {
      if (val !== null && val !== undefined) {
        this.snackbar.text = val
        this.snackbar.active = true
      }
    }
  },
  computed: {
    info () {
      return this.$store.getters.info
    },
    gameStarted () {
      return this.$store.getters.gameStarted
    }
  }
}
</script>
