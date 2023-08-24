import { defineConfig } from 'vitepress'
import zhConfig from './locales/zh.config.js'
export default defineConfig({
  base: '/Cnblogs-Theme-SimpleMemory/v2.1/dist/',
  title: "SMemory",
  description: "Documents",
  head: [
    [
      'link',
      { rel: 'icon', href: '/Cnblogs-Theme-SimpleMemory/v2.1/dist/images/icon.png' }
    ]
  ],
  lastUpdated: true,
  srcDir: './src',
  locales: {
    root: zhConfig,
  },
  themeConfig: {
    logo: '/images/logo.png',
    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/BNDong/Cnblogs-Theme-SimpleMemory' },
    ]
  },
  markdown: {
    lineNumbers: true
  }
})