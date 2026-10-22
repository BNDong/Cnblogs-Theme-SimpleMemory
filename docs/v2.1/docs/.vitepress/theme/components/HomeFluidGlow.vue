<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useData } from 'vitepress'

const canvas = ref(null)
const field = ref(null)
const probes = ref([])
const { isDark } = useData()
let dispose = () => {}

onMounted(() => {
  const surface = canvas.value
  const context = surface.getContext('2d')
  if (!context) return

  field.value.classList.add('has-canvas')
  const stage = surface.closest('.sm-home-stage')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  const finePointer = window.matchMedia('(pointer: fine)')
  const streams = [
    { color: 0, x: .25, y: .2, phase: 0, opacity: .8 },
    { color: 1, x: .76, y: .32, phase: 2.3, opacity: .76 },
    { color: 2, x: .59, y: .17, phase: 4.4, opacity: .6 },
    { color: 0, x: .49, y: .43, phase: 1.4, opacity: .45 }
  ]
  let colors = []
  let frame = 0
  let pointerFrame = 0
  let visible = true
  let elapsed = 3
  let previous = 0
  let lastPaint = 0
  let pointerX = 0
  let pointerY = 0
  let bounds = stage.getBoundingClientRect()

  function paint(time) {
    const { width, height } = surface
    const flowTime = time * 1.9
    context.clearRect(0, 0, width, height)
    context.globalCompositeOperation = isDark.value ? 'screen' : 'source-over'
    streams.forEach((stream, index) => {
      const phase = stream.phase
      const x = width * (stream.x + .24 * Math.sin(flowTime * .43 + phase) + .07 * Math.cos(flowTime * .71 + phase))
      const y = height * (stream.y + .21 * Math.cos(flowTime * .36 + phase) + .08 * Math.sin(flowTime * .58 + phase))
      const radiusX = width * (.34 + .11 * Math.sin(flowTime * .51 + phase))
      const radiusY = height * (.4 + .16 * Math.cos(flowTime * .47 + phase))
      context.save()
      context.translate(x, y)
      context.rotate(1.1 * Math.sin(flowTime * .23 + phase) + index * .7)
      context.scale(radiusX, radiusY)
      const gradient = context.createRadialGradient(-.2 * Math.sin(flowTime * .3 + phase), .16 * Math.cos(flowTime * .37 + phase), 0, 0, 0, 1)
      const color = colors[stream.color]
      gradient.addColorStop(0, `rgba(${color}, ${stream.opacity})`)
      gradient.addColorStop(.38, `rgba(${color}, ${stream.opacity * .65})`)
      gradient.addColorStop(.75, `rgba(${color}, ${stream.opacity * .17})`)
      gradient.addColorStop(1, `rgba(${color}, 0)`)
      context.fillStyle = gradient
      context.fillRect(-1.3, -1.3, 2.6, 2.6)
      context.restore()
    })
  }

  function refreshColors() {
    colors = probes.value.map(probe => getComputedStyle(probe).color.match(/[\d.]+/g).slice(0, 3).join(', '))
    paint(reducedMotion.matches ? 3 : elapsed)
  }

  function resize() {
    bounds = stage.getBoundingClientRect()
    // A soft light field needs no retina backing buffer; bound its rendering cost.
    const scale = Math.min(.75, 1000 / bounds.width)
    surface.width = Math.max(1, Math.round(bounds.width * scale))
    surface.height = Math.max(1, Math.round(Math.min(bounds.height, 900) * scale))
    paint(reducedMotion.matches ? 3 : elapsed)
  }

  function updateBounds() {
    bounds = stage.getBoundingClientRect()
  }

  function animate(now) {
    elapsed += previous ? Math.min(now - previous, 100) / 1000 : 0
    previous = now
    if (now - lastPaint >= 1000 / 30) {
      paint(elapsed)
      lastPaint = now
    }
    frame = requestAnimationFrame(animate)
  }

  function syncAnimation() {
    cancelAnimationFrame(frame)
    frame = 0
    previous = 0
    if (reducedMotion.matches) {
      resetPointer()
      paint(3)
    } else if (visible && !document.hidden) {
      frame = requestAnimationFrame(animate)
    }
  }

  function movePointer(event) {
    if (reducedMotion.matches || !finePointer.matches) return
    pointerX = (event.clientX / Math.max(bounds.width, 1) - .5) * 20
    pointerY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - .5) * 14
    if (!pointerFrame) pointerFrame = requestAnimationFrame(() => {
      field.value.style.transform = `translate(${Math.max(-10, Math.min(10, pointerX))}px, ${Math.max(-7, Math.min(7, pointerY))}px)`
      pointerFrame = 0
    })
  }

  function resetPointer() {
    cancelAnimationFrame(pointerFrame)
    pointerFrame = 0
    field.value.style.transform = ''
  }

  refreshColors()
  resize()
  const stopThemeWatch = watch(isDark, refreshColors, { flush: 'post' })
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(stage)
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    syncAnimation()
  })
  intersectionObserver.observe(surface)
  document.addEventListener('visibilitychange', syncAnimation)
  reducedMotion.addEventListener('change', syncAnimation)
  finePointer.addEventListener('change', resetPointer)
  stage.addEventListener('pointermove', movePointer, { passive: true })
  stage.addEventListener('pointerleave', resetPointer)
  // Refresh viewport coordinates after page scrolling without layout reads per frame.
  window.addEventListener('scroll', updateBounds, { passive: true })
  syncAnimation()

  dispose = () => {
    cancelAnimationFrame(frame)
    cancelAnimationFrame(pointerFrame)
    stopThemeWatch()
    resizeObserver.disconnect()
    intersectionObserver.disconnect()
    document.removeEventListener('visibilitychange', syncAnimation)
    reducedMotion.removeEventListener('change', syncAnimation)
    finePointer.removeEventListener('change', resetPointer)
    stage.removeEventListener('pointermove', movePointer)
    stage.removeEventListener('pointerleave', resetPointer)
    window.removeEventListener('scroll', updateBounds)
  }
})

onUnmounted(() => dispose())
</script>

<template>
  <div class="sm-fluid-glow" aria-hidden="true">
    <div ref="field" class="sm-fluid-field">
      <canvas ref="canvas"></canvas>
    </div>
    <span v-for="color in ['violet', 'rose', 'peach']" :key="color" ref="probes" class="sm-glow-probe" :style="{ color: `var(--sm-glow-${color})` }"></span>
  </div>
</template>
