<template>
  <div ref="container" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import * as PIXI from 'pixi.js'

const container = ref<HTMLDivElement | null>(null)
let app: PIXI.Application | null = null

onMounted(async () => {
  // 1️⃣ Création de l’app Pixi
  app = new PIXI.Application()

  await app.init({
    width: 560,
    height: 560,
    background: 0x0f172a,
    antialias: true
  })

  container.value?.appendChild(app.canvas)

  // 2️⃣ Constantes de la grille
  const gridSize = 10
  const cellSize = 50
  const offset = 30

  // 3️⃣ Dessin de la grille
  const grid = new PIXI.Graphics()
  grid.strokeStyle = { width: 1, color: 0xffffff }

  for (let i = 0; i <= gridSize; i++) {
    // lignes verticales
    grid.moveTo(offset + i * cellSize, offset)
    grid.lineTo(offset + i * cellSize, offset + gridSize * cellSize)

    // lignes horizontales
    grid.moveTo(offset, offset + i * cellSize)
    grid.lineTo(offset + gridSize * cellSize, offset + i * cellSize)
  }

  grid.stroke()
  app.stage.addChild(grid)

  // 4️⃣ Lettres (A → J)
  const letters = 'ABCDEFGHIJ'

  for (let i = 0; i < gridSize; i++) {
    const text = new PIXI.Text({
      text: letters[i],
      style: {
        fill: 0xffffff,
        fontSize: 14
      }
    })

    text.x = offset + i * cellSize + cellSize / 2 - text.width / 2
    text.y = 5

    app.stage.addChild(text)
  }

  // 5️⃣ Chiffres (1 → 10)
  for (let i = 0; i < gridSize; i++) {
    const text = new PIXI.Text({
      text: String(i + 1),
      style: {
        fill: 0xffffff,
        fontSize: 14
      }
    })

    text.x = 5
    text.y = offset + i * cellSize + cellSize / 2 - text.height / 2

    app.stage.addChild(text)
  }
})


onBeforeUnmount(() => {
  app?.destroy()
  app = null
})
</script>
