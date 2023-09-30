import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ViewUIPlus from 'view-ui-plus'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/style.css'
import 'view-ui-plus/dist/styles/viewuiplus.css'

const app = createApp(App)
app.use(createPinia())
app.use(ViewUIPlus)
app.use(ElementPlus)
app.mount('#app')
