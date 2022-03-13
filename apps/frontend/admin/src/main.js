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

console.log('emv', import.meta.env)

const app = createApp({
  setup() {
    // provide(ApolloClients, {
    //   default: apolloClient,
    // })
  },

  render: () => h(App),
})

app.config.errorHandler = function (err, vm, info) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  console.log('Custom vue error handler: ', err, vm.name, info)
}

app.config.warnHandler = function (err, vm, info) {
  // handle error
  // `info` is a Vue-specific error info, e.g. which lifecycle hook
  // the error was found in. Only available in 2.2.0+
  console.log('Custom vue warn handler: ', err, vm.name, info)
}
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.use(store)
app.use(router)
app.mount('#app')

export default {
  apolloClient,
}
