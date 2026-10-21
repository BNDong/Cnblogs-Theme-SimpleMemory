import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'
import zhConfig from './locales/zh.config.js'
export default defineConfig(({ mode }) => {
  const base = mode === 'development' ? '/' : '/Cnblogs-Theme-SimpleMemory/v2.1/dist/'
  return {
    base,
    title: "SimpleMemory",
    description: "博客园 SimpleMemory 扩展插件的安装、配置与开发文档",
    head: [
      [
        'link',
        { rel: 'icon', href: `${base}images/icon.png` }
      ]
    ],
    lastUpdated: true,
    srcDir: './src',
    outDir: fileURLToPath(new URL('../../dist', import.meta.url)),
    transformHtml: (html) => html.replace(/^[\t ]+$/gm, ''),
    locales: {
      root: zhConfig,
    },
    themeConfig: {
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
  }
})
