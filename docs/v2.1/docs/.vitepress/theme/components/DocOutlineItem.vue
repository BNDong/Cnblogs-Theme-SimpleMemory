<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  headers: { type: Array, required: true },
  root: Boolean
})
const { page } = useData()
const isConfig = computed(() => page.value.relativePath.startsWith('reference/config/'))
const items = computed(() => props.headers.map(header => {
  const parts = isConfig.value && header.title.match(/^([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)\s+-\s+(.+)$/)
  return { ...header, configKey: parts?.[1], description: parts?.[2] }
}))

function focusHeading(event) {
  const id = event.currentTarget.hash.slice(1)
  document.getElementById(decodeURIComponent(id))?.focus({ preventScroll: true })
}
</script>

<template>
  <ul class="VPDocOutlineItem" :class="[root ? 'root' : 'nested', { 'sm-config-outline': isConfig }]">
    <li v-for="item in items" :key="item.link">
      <a
        class="outline-link"
        :class="{ 'sm-config-outline-link': item.configKey }"
        :href="item.link"
        :title="item.title"
        :aria-label="item.configKey ? item.title : undefined"
        @click="focusHeading"
      >
        <template v-if="item.configKey">
          <code class="sm-outline-key">{{ item.configKey }}</code>
          <span class="sm-outline-description">{{ item.description }}</span>
        </template>
        <template v-else>{{ item.title }}</template>
      </a>
      <DocOutlineItem v-if="item.children?.length" :headers="item.children" />
    </li>
  </ul>
</template>

<style scoped>
.root { position: relative; z-index: 1; }
.nested { padding-right: 16px; padding-left: 16px; }
.outline-link { display: block; line-height: 32px; font-size: 14px; font-weight: 400; color: var(--vp-c-text-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color .2s; }
.outline-link:hover, .outline-link.active { color: var(--vp-c-text-1); }
.sm-config-outline.nested { padding-right: 0; }
.sm-config-outline-link { margin: 2px 0; border-radius: 6px; padding: 7px 8px; line-height: 1.5; white-space: normal; transition: background .2s; }
.sm-outline-key, .sm-outline-description { display: block; pointer-events: none; }
.sm-outline-key { background: none; color: var(--vp-c-brand-1); font-family: var(--vp-font-family-mono); font-size: 13px; font-weight: 600; line-height: 20px; overflow-wrap: anywhere; }
.sm-outline-description { margin-top: 1px; color: var(--vp-c-text-2); font-size: 12px; font-weight: 400; line-height: 1.6; overflow-wrap: anywhere; }
.sm-config-outline-link:hover { background: var(--vp-c-bg-soft); }
.sm-config-outline-link.active { background: var(--vp-c-brand-soft); }
.sm-config-outline-link.active .sm-outline-key { color: var(--sm-accent); }
.sm-config-outline-link:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 1px; }
@media (prefers-reduced-motion: reduce) {
  .outline-link { transition: none; }
}
</style>
