<script setup>
import { ref } from 'vue'
import { withBase } from 'vitepress'
import HomeFluidGlow from './HomeFluidGlow.vue'

const previewMode = ref('home')
const previewViews = [
  { key: 'home', title: '首页', description: '首页布局：整屏头图，下滑后是文章列表，可在预览区域滚动查看' },
  { key: 'article', title: '文章页', description: '文章页布局：横幅头图、居中正文和右侧文章目录' }
]
const entries = [
  { title: '开始安装', text: '后台设置、CSS 和插件脚本', link: '/guide/install.html', number: '01' },
  { title: '配置参考', text: '基础、外观、文章、代码与动效', link: '/reference/configs.html', number: '02' },
  { title: '常见问题', text: '配置生效、资源加载与版本切换', link: '/guide/faq.html', number: '03' }
]

function scrollHome(event, showPosts) {
  const preview = event.currentTarget.closest('.sm-skeleton-home')
  preview?.scrollTo({ top: showPosts ? preview.clientHeight : 0 })
}
</script>

<template>
  <div class="sm-home-stage">
    <HomeFluidGlow />
  <main class="sm-home" aria-label="SimpleMemory 文档首页">
    <section class="sm-hero" aria-labelledby="sm-home-title">
      <div class="sm-intro">
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
        <div class="sm-preview" aria-label="主题布局预览">
          <div class="sm-preview-bar">
            <span class="sm-window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
          </div>
          <div
            v-for="view in previewViews"
            v-show="previewMode === view.key"
            :id="`sm-preview-${view.key}`"
            :key="view.key"
            class="sm-theme-skeleton"
            :class="`sm-skeleton-${view.key}`"
            :role="view.key === 'home' ? 'region' : 'img'"
            :tabindex="view.key === 'home' ? 0 : undefined"
            :aria-label="view.description"
          >
            <div class="sm-sk-cover">
              <div class="sm-sk-cover-art" aria-hidden="true">
                <span class="sm-sk-menu"><i></i><i></i><i></i></span>
                <span class="sm-sk-theme"><i></i></span>
                <div class="sm-sk-cover-title">
                  <span></span><i></i><i v-if="view.key === 'article'"></i>
                </div>
              </div>
              <button
                v-if="view.key === 'home'"
                class="sm-sk-scroll-down"
                type="button"
                aria-label="向下查看文章列表"
                @click="scrollHome($event, true)"
              ><span class="sm-sk-down" aria-hidden="true"></span></button>
            </div>
            <div v-if="view.key === 'home'" class="sm-sk-feed" role="group" aria-label="首页文章列表">
              <div class="sm-sk-posts" aria-hidden="true">
                <div v-for="post in 3" :key="post" class="sm-sk-post">
                  <div class="sm-sk-post-heading"><span></span><i v-if="post < 3"></i></div>
                  <span class="sm-sk-meta"></span>
                  <span class="sm-sk-line"></span>
                  <span class="sm-sk-line sm-sk-short"></span>
                  <span class="sm-sk-read"></span>
                </div>
              </div>
              <button class="sm-sk-to-top" type="button" aria-label="返回首页封面" @click="scrollHome($event, false)">
                <span class="vpi-arrow-up" aria-hidden="true"></span>
              </button>
            </div>
            <div v-else-if="view.key === 'article'" class="sm-sk-article" aria-hidden="true">
              <div class="sm-sk-prose">
                <span class="sm-sk-brand"></span>
                <span class="sm-sk-description"></span>
                <span class="sm-sk-section"></span>
                <span v-for="line in 4" :key="line" class="sm-sk-line"></span>
                <span class="sm-sk-section"></span>
                <span class="sm-sk-line"></span>
                <span class="sm-sk-line sm-sk-short"></span>
              </div>
              <div class="sm-sk-outline">
                <span v-for="item in 5" :key="item"></span>
              </div>
            </div>
          </div>
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
        <p class="sm-caption">主题布局示意<span>{{ previewMode === 'home' ? '下滑查看文章列表' : '正文与右侧目录' }}</span></p>
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
  </div>
</template>
