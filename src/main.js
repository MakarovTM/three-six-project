import { createApp } from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'

import './registerServiceWorker'

import "@/assets/css/app.min.css"

import Notifications from '@kyvg/vue3-notification'

createApp(App).use(store).use(router).use(Notifications).mount('#app')
