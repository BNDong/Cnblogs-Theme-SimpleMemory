<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { onContentUpdated, useRoute } from 'vitepress'

const dialog = ref(null)
const image = ref(null)
const route = useRoute()

function close() {
  dialog.value?.close()
}

async function enhanceImages() {
  await nextTick()
  document.querySelectorAll('.vp-doc img').forEach((img) => {
    if (img.closest('a, button')) return
    const link = document.createElement('a')
    link.className = 'sm-doc-image'
    link.href = img.currentSrc || img.src
    link.setAttribute('aria-label', `放大图片：${img.alt || '文档配图'}`)
    link.setAttribute('aria-haspopup', 'dialog')
    img.before(link)
    link.append(img)
    link.addEventListener('click', (event) => {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !dialog.value?.showModal) return
      event.preventDefault()
      image.value = { src: img.currentSrc || img.src, alt: img.alt }
      dialog.value.showModal()
    })
  })
}

onMounted(enhanceImages)
onContentUpdated(enhanceImages)
watch(() => route.path, close)
</script>

<template>
  <dialog ref="dialog" class="sm-image-dialog" aria-label="图片预览" @click="event => event.target === dialog && close()" @close="image = null">
    <button type="button" class="sm-image-close" aria-label="关闭图片预览" @click="close">关闭 <span aria-hidden="true">×</span></button>
    <img v-if="image" :src="image.src" :alt="image.alt">
  </dialog>
</template>
