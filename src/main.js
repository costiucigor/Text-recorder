import { createApp } from 'vue'
import mdiVue from 'mdi-vue/v3'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import Notifications from '@kyvg/vue3-notification'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        }
    },
})


createApp(App).use(Notifications).use(vuetify).mount('#app')
