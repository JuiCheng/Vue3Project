import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import I18n from './i18n'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(I18n)
  .use(vuetify)
  .mount('#app')
