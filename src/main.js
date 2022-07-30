import { createApp } from 'vue'
import store from './store'
import './sass/main.scss'
import App from './App.vue'

const app = createApp(App)
app.use(store)
app.mount('#app')
