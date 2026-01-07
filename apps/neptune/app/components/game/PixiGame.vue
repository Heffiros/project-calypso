<template>
  <div ref="pixiContainer" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as PIXI from 'pixi.js'
import {
  drawGrid,
  drawColumnLabels,
  drawRowLabels,
} from '../../pixi/grid'
import {
  registerGridInteractions
} from '../../pixi/interactions'


const pixiContainer = ref<HTMLDivElement | null>(null)

onMounted(async () => {
  const app = new PIXI.Application()
  await app.init({ width: 560, height: 560, background: 0x0f172a, antialias: true })

  pixiContainer.value!.appendChild(app.canvas)

  const gridContainer = new PIXI.Container()
  app.stage.addChild(gridContainer)

  drawGrid(gridContainer)
  drawColumnLabels(gridContainer)
  drawRowLabels(gridContainer)

  registerGridInteractions(app)
})
</script>
