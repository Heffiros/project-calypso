<template>
  <div class="h-screen flex items-center justify-center">
    <h1 class="text-2xl font-bold">
      🎮 Partie en cours
    </h1>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '~/stores/game'

const game = useGameStore()

if (!game.room) {
  alert('error')
}
</script>
