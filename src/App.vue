<template>
  <v-app>
    <router-view/>
    <v-dialog
      hide-overlay
      v-model="snackbar.active"
      width="400"
    >
      <v-card color="grey">
        <v-card-text class="subheader font-weight-medium grey--text text--lighten-3">
          {{snackbar.text}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat icon @click="snackbar.active = false">
            <v-icon color="grey lighten-3">close</v-icon>
          </v-btn>
        </v-card-actions>
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
    'snackbar.active' (val) {
      if (val) {
        setTimeout(() => {
          this.snackbar.active = false
        }, this.snackbar.timeout)
      }
    },
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
