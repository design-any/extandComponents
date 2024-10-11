import { createApp } from 'vue'
import App from './App.vue'
// ************************************************
import '../dist/designany.basiccomps.min.css'
import '../dist/designany.basiccomps.min.js'
// ************************************************
var currentApp = createApp(App)

currentApp.mount('#app')
