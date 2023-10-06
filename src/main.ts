import '@/style.css'
import 'element-plus/dist/index.css'
import 'view-ui-plus/dist/styles/viewuiplus.css'

import App from '@/App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ViewUIPlus from 'view-ui-plus'
import ElementPlus from 'element-plus'
import { Authorize } from '@/httpUnit/UserAPI.ts'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 验证Token是否有效
Authorize()

const app = createApp(App)
app.use(createPinia())
app.use(ViewUIPlus)
app.use(ElementPlus,{
    locale: zhCn,
  })
app.mount('#app')
