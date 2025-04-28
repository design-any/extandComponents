import { createApp } from 'vue'
import App from './App.vue'
// ************************************************
import '../dist/designany.extands.min.css'
import '../dist/designany.extands.min.js'
// ************************************************
var currentApp = createApp(App)

currentApp.mount('#app')
