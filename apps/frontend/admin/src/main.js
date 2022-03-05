/* eslint-disable object-curly-newline */
import { createApp, provide, h } from 'vue'
import { DefaultApolloClient, provideApolloClient, ApolloClients } from '@vue/apollo-composable'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Chart, LineController, DoughnutController, ArcElement, Tooltip, registerables } from 'chart.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import apolloClient from './apolloClient'
import icons from './plugins/fontAwesome'
import App from './App.vue'

import './css/app.sass'
import store from './store'
import router from './router'

//console.log(apolloClient)
Chart.register(DoughnutController, ArcElement, Tooltip, LineController, ...registerables)
Chart.defaults.maintainAspectRatio = false
library.add(...icons)
provideApolloClient(apolloClient)

const app = createApp({
  setup() {
    // provide(ApolloClients, {
    //   default: apolloClient,
    // })
  },

  render: () => h(App),
})

app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(store)
app.use(router)
app.mount('#app')

export default {
  apolloClient,
}
