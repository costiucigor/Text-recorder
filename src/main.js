import { createApp } from 'vue'
import mdiVue from 'mdi-vue/v3'
import * as mdijs from '@mdi/js'
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue'

createApp(App).use(mdiVue, {
    icons: mdijs
}).use(Notifications).mount('#app')
