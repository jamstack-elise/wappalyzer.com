import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: {
          base: '#4608ad',
          lighten1: '#f0ebf9',
          darken1: '#32067c',
        },
        accent: {
          base: '#2196f3',
          lighten1: '#e4f2fe',
        },
        secondary: '#fafafa',
        anchor: '#2196f3',
      },
      dark: {
        primary: {
          base: '#4608ad',
          lighten1: '#2b2b2b',
          darken1: '#32067c',
        },
        accent: {
          base: '#2196f3',
          lighten1: '#1e272f',
        },
        secondary: '#1e1e1e',
        anchor: '#2196f3',
      },
    },
  },
})
