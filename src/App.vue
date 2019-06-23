<template>
  <v-app>
    <router-view/>
    <v-snackbar
      v-model="snackbar.active"
      bottom
      :color="snackbar.color"
      :timeout="6000"
      :vertical="true"
    >
      {{snackbar.text}}
        <v-btn
          flat
          @click="snackbar.active = false"
        >
          <v-icon>close</v-icon>
        </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      snackbar: {
        active: false,
        color: 'info',
        text: null
      }
    }
  },
  watch: {
    info (val) {
      if (val !== null && val !== undefined) {
        this.snackbar.text = val
        this.snackbar.color = 'info'
        this.snackbar.active = true
      }
    },
    error (val) {
      if (val !== null && val !== undefined) {
        this.snackbar.text = val
        this.snackbar.color = 'error'
        this.snackbar.active = true
      }
    }
  },
  computed: {
    info () {
      return this.$store.getters.info
    },
    error () {
      return this.$store.getters.error
    }
  }
}
</script>
