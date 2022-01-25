import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { Chart, LineController, DoughnutController, ArcElement, Tooltip, registerables } from 'chart.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import icons from './plugins/fontAwesome'
import App from './App.vue'
import './css/app.sass'
import store from './store'
import router from './router'

Chart.register(DoughnutController, ArcElement, Tooltip, LineController, ...registerables)
library.add(...icons)
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store)
app.use(router)
app.mount('#app')
