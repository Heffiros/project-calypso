<template>
  <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 space-y-6">
    <div class="text-center space-y-2">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
        🌊 Neptune
      </h1>
      <h2 class="text-xl font-semibold text-slate-700 dark:text-slate-300">
        Connexion
      </h2>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Connectez-vous pour continuer
      </p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Email
        </label>
        <input id="email" v-model="credentials.email" type="email" required
          class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="votre@email.com" />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Mot de passe
        </label>
        <input id="password" v-model="credentials.password" type="password" required
          class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="••••••••" />
      </div>

      <div v-if="error"
        class="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg">
        {{ error }}
      </div>

      <button type="submit" :disabled="loading"
        class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium rounded-lg transition-colors">
        {{ loading ? 'Connexion...' : 'Se connecter' }}
      </button>
    </form>

    <div class="text-center">
      <p class="text-sm text-slate-600 dark:text-slate-400">
        Pas encore de compte ?
        <NuxtLink to="/register" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
          S'inscrire
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
})

const auth = useAuthStore()
const router = useRouter()

const credentials = ref({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    const success = await auth.login(credentials.value)
    if (success) {
      router.push('/')
    } else {
      error.value = 'Email ou mot de passe incorrect'
    }
  } catch (err) {
    error.value = 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>
