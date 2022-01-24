import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: '#E85a4f',
            secondary: '#e98074',
            accent: '#8e8d8a',
            error: '#b71c1c',
            info:"#D8c3a5",
            background:"#eae7dc",
        },
      },
    }
});
