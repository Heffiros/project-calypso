<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 transition-colors duration-300">
    <div class="flex items-center justify-center min-h-screen px-4 py-12">
      <div class="w-full max-w-md">
        <slot />
      </div>
    </div>

    <!-- Toggle dark mode en bas à droite -->
    <button @click="toggleTheme"
      class="fixed bottom-6 right-6 p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border border-slate-200 dark:border-slate-700">
      <Sun v-if="isDark" class="w-5 h-5 text-slate-700 dark:text-slate-300" />
      <Moon v-else class="w-5 h-5 text-slate-700 dark:text-slate-300" />
    </button>

    <CommonAppPopup />
  </div>
</template>

<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>
