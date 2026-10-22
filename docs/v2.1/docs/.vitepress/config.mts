import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'
import zhConfig from './locales/zh.config.js'
import codeTheme from './code-theme.mjs'
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
    vite: {
      resolve: {
        alias: [
          // Share the configuration label layout between desktop and mobile outlines.
          { find: './VPDocOutlineItem.vue', replacement: fileURLToPath(new URL('./theme/components/DocOutlineItem.vue', import.meta.url)) }
        ]
      }
    },
    locales: {
      root: zhConfig,
    },
    themeConfig: {
      logo: { src: '/images/logo.png', alt: 'SimpleMemory' },
      siteTitle: false,
      search: {
        provider: 'local',
      },
      socialLinks: [
        { icon: 'github', link: 'https://github.com/BNDong/Cnblogs-Theme-SimpleMemory' },
      ]
    },
    markdown: {
      theme: codeTheme,
      lineNumbers: true
    }
  }
})
