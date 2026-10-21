<script setup>
import { ref } from 'vue'
import { withBase } from 'vitepress'

const previewMode = ref('home')
const previewViews = [
  {
    key: 'home',
    title: '首页',
    image: '/images/preview/home.jpg',
    alt: '示例博客首页：整屏云层头图、居中的 BNDong 标题和左上角菜单',
    link: 'https://www.cnblogs.com/bndong/'
  },
  {
    key: 'posts',
    title: '文章列表',
    image: '/images/preview/posts.jpg',
    alt: '示例博客文章列表：头图下方居中的文章摘要、发布时间和阅读全文入口',
    link: 'https://www.cnblogs.com/bndong/#home'
  },
  {
    key: 'article',
    title: '文章页',
    image: '/images/preview/article.jpg',
    alt: '示例博客文章页：横幅头图、文章标题、居中的正文和右侧文章目录',
    link: 'https://www.cnblogs.com/bndong/p/9132439.html'
  }
]
const entries = [
  { title: '开始安装', text: '后台设置、CSS 和插件脚本', link: '/guide/install.html', number: '01' },
  { title: '配置参考', text: '基础、外观、文章、代码与动效', link: '/reference/configs.html', number: '02' },
  { title: '常见问题', text: '配置生效、资源加载与版本切换', link: '/guide/faq.html', number: '03' }
]
</script>

<template>
  <main class="sm-home" aria-label="SimpleMemory 文档首页">
    <section class="sm-hero" aria-labelledby="sm-home-title">
      <div class="sm-intro">
        <p class="sm-eyebrow"><span aria-hidden="true"></span>CNBLOGS THEME EXTENSION</p>
        <h1 id="sm-home-title">SimpleMemory</h1>
        <p class="sm-subtitle">博客园主题扩展</p>
        <p class="sm-summary">安装、配置与使用说明。<br>从头图和导航，到文章目录与代码样式。</p>
        <div class="sm-actions">
          <a class="sm-button sm-button-primary" :href="withBase('/guide/install.html')">
            安装配置 <span class="vpi-arrow-right" aria-hidden="true"></span>
          </a>
          <a class="sm-button" href="https://www.cnblogs.com/bndong/" target="_blank" rel="noopener noreferrer">
            查看示例 <span class="vp-external-link-icon" aria-hidden="true"></span>
          </a>
        </div>
      </div>

      <div class="sm-visual-wrap">
        <div class="sm-preview" aria-label="示例博客截图">
          <div class="sm-preview-bar">
            <span class="sm-window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="sm-preview-title">cnblogs.com/bndong</span>
          </div>
          <a
            v-for="view in previewViews"
            v-show="previewMode === view.key"
            :id="`sm-preview-${view.key}`"
            :key="view.key"
            class="sm-site-preview"
            :href="view.link"
            :aria-label="`打开示例博客${view.title}（新窗口）`"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              class="sm-site-image"
              :src="withBase(view.image)"
              :alt="view.alt"
              width="1440"
              height="775"
              :loading="view.key === 'home' ? 'eager' : 'lazy'"
              decoding="async"
            >
            <span class="sm-preview-open" aria-hidden="true">打开示例 <span class="vp-external-link-icon"></span></span>
          </a>
          <div class="sm-preview-tabs" aria-label="选择预览页面">
            <button
              v-for="view in previewViews"
              :key="view.key"
              type="button"
              :aria-pressed="previewMode === view.key"
              :aria-controls="`sm-preview-${view.key}`"
              @click="previewMode = view.key"
            >{{ view.title }}</button>
          </div>
        </div>
        <p class="sm-caption">示例博客截图<span>点击图片访问示例</span></p>
      </div>
    </section>

    <section class="sm-entries" aria-label="常用文档入口">
      <a v-for="entry in entries" :key="entry.number" class="sm-entry" :href="withBase(entry.link)">
        <span class="sm-entry-number" aria-hidden="true">{{ entry.number }}</span>
        <span class="sm-entry-title">{{ entry.title }}<span class="vpi-arrow-right" aria-hidden="true"></span></span>
        <span class="sm-entry-description">{{ entry.text }}</span>
      </a>
    </section>

    <nav class="sm-more" aria-label="更多文档">
      <span>继续阅读</span>
      <a :href="withBase('/guide/versionSwitch.html')">版本切换</a>
      <a :href="withBase('/guide/codespaces.html')">调试开发</a>
      <a :href="withBase('/changelog/')">更新历史</a>
    </nav>
  </main>
</template>
