<script setup>
import { computed, onUnmounted, ref } from 'vue'
import { withBase } from 'vitepress'

const previewMode = ref('visual')
const numbered = ref(true)
const lineNumbers = ref(true)
const copyMessage = ref('复制配置')
let copyTimer

const config = computed(() => `window.cnblogsConfig = {
  articleDirectory: {
    number: ${numbered.value},
  },
  code: {
    options: { line: ${lineNumbers.value} },
  },
};`)
const sampleCode = computed(() => ['window.cnblogsConfig = {', '  articleDirectory: {', `    number: ${numbered.value},`, '  },', '};'])
const entries = [
  { title: '开始安装', text: '后台设置、CSS 和插件脚本', link: '/guide/install.html', number: '01' },
  { title: '配置参考', text: '基础、外观、文章、代码与动效', link: '/reference/configs.html', number: '02' },
  { title: '常见问题', text: '配置生效、资源加载与版本切换', link: '/guide/faq.html', number: '03' }
]

async function copyConfig() {
  clearTimeout(copyTimer)
  try {
    await navigator.clipboard.writeText(config.value)
    copyMessage.value = '已复制'
  } catch {
    copyMessage.value = '请选中代码复制'
  }
  copyTimer = setTimeout(() => { copyMessage.value = '复制配置' }, 2500)
}

onUnmounted(() => clearTimeout(copyTimer))
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
        <div class="sm-preview" aria-label="主题效果与配置示意">
          <div class="sm-preview-bar">
            <span class="sm-window-dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="sm-preview-title">SimpleMemory</span>
            <div class="sm-preview-tabs" aria-label="预览内容">
              <button type="button" :aria-pressed="previewMode === 'visual'" aria-controls="sm-preview-visual" @click="previewMode = 'visual'">效果</button>
              <button type="button" :aria-pressed="previewMode === 'config'" aria-controls="sm-preview-config" @click="previewMode = 'config'">配置</button>
            </div>
          </div>

          <div v-show="previewMode === 'visual'" id="sm-preview-visual" class="sm-preview-panel">
            <div class="sm-blog-banner">
              <p class="sm-blog-name">SimpleMemory</p>
              <p>记录与分享</p>
            </div>
            <div class="sm-blog-article">
              <div class="sm-blog-body">
                <p class="sm-blog-heading">文章目录与代码展示</p>
                <div class="sm-mini-line" aria-hidden="true"></div>
                <div class="sm-mini-line sm-mini-line-short" aria-hidden="true"></div>
                <pre class="sm-mini-code" aria-label="文章中的代码示例"><code><span v-for="(line, index) in sampleCode" :key="index" class="sm-code-line"><span v-if="lineNumbers" class="sm-code-number" aria-hidden="true">{{ index + 1 }}</span>{{ line }}</span></code></pre>
              </div>
              <div class="sm-blog-toc">
                <p>本文目录</p>
                <span class="sm-toc-active">{{ numbered ? '1. ' : '' }}安装配置</span>
                <span>{{ numbered ? '2. ' : '' }}使用说明</span>
              </div>
            </div>
          </div>

          <div v-show="previewMode === 'config'" id="sm-preview-config" class="sm-preview-panel sm-config-panel">
            <div class="sm-config-heading"><span>配置示例</span><button type="button" @click="copyConfig"><span aria-live="polite">{{ copyMessage }}</span></button></div>
            <pre class="sm-config"><code>{{ config }}</code></pre>
          </div>

          <div class="sm-preview-options" aria-label="调整示意效果">
            <label><input v-model="numbered" type="checkbox">目录编号</label>
            <label><input v-model="lineNumbers" type="checkbox">代码行号</label>
          </div>
        </div>
        <p class="sm-caption">主题效果示意<span>可切换选项查看配置</span></p>
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
