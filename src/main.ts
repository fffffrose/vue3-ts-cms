import { createApp } from 'vue'
import { globalRegister } from './global'

import type { App } from 'vue'

import rootApp from './App.vue'

import router from './router'
import store from './store'

const app: App = createApp(rootApp)

app.use(globalRegister)
app.use(router)
app.use(store)
// app.use(ElementPlus)
app.mount('#app')
// createApp(App).mount('#app')
