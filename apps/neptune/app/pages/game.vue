<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="mb-8">
      <h1 class="text-2xl font-bold">
        🎮 Partie en cours
      </h1>
    </div>
    <div>
      <GamePixiGame />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/game'

const game = useGameStore()

if (!game.room) {
  alert('error')
}
</script>
