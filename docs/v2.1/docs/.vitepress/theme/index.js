import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import SimpleMemoryHome from './components/SimpleMemoryHome.vue'
import DocImageViewer from './components/DocImageViewer.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, {
    'layout-bottom': () => h(DocImageViewer)
  }),
  enhanceApp({ app }) {
    app.component('SimpleMemoryHome', SimpleMemoryHome)
  }
}
