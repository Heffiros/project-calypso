<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <div class="container mx-auto px-4 py-16">
      <div class="text-center space-y-6">
        <h1 class="text-4xl font-bold text-slate-900 dark:text-white">
          🌊 Neptune
        </h1>
        <p class="text-xl text-slate-600 dark:text-slate-400">
          Frontend Calypso - Nuxt + Vue + Tailwind
        </p>
        <div class="flex gap-4 justify-center">
          <button class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Commencer
          </button>
          <button
            class="px-6 py-3 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            En savoir plus
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from '~/composables/useTheme'

const { isDark } = useTheme()

definePageMeta({
  title: 'Accueil'
})
</script>