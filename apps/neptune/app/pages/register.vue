<template>
  <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 space-y-6">
    <div class="text-center space-y-2">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
        🌊 Neptune
      </h1>
      <h2 class="text-xl font-semibold text-slate-700 dark:text-slate-300">
        Inscription
      </h2>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Créez votre compte pour commencer
      </p>
    </div>

    <form @submit.prevent="handleRegister" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Nom d'utilisateur
        </label>
        <input id="username" v-model="form.username" type="text" required
          class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="johndoe" />
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Email
        </label>
        <input id="email" v-model="form.email" type="email" required
          class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="votre@email.com" />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Mot de passe
        </label>
        <input id="password" v-model="form.password" type="password" required minlength="6"
          class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="••••••••" />
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Confirmer le mot de passe
        </label>
        <input id="confirmPassword" v-model="form.confirmPassword" type="password" required
          class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="••••••••" />
      </div>

      <div v-if="error"
        class="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-lg">
        {{ error }}
      </div>

      <button type="submit" :disabled="loading"
        class="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium rounded-lg transition-colors">
        {{ loading ? 'Création...' : 'Créer mon compte' }}
      </button>
    </form>

    <div class="text-center">
      <p class="text-sm text-slate-600 dark:text-slate-400">
        Déjà un compte ?
        <NuxtLink to="/login" class="text-blue-600 dark:text-blue-400 hover:underline font-medium">
          Se connecter
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

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  loading.value = true
  error.value = ''

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas'
    loading.value = false
    return
  }

  try {
    const config = useRuntimeConfig()
    const response = await $fetch('/auth/register', {
      method: 'POST',
      baseURL: config.public.apiBase,
      body: {
        username: form.value.username,
        email: form.value.email,
        password: form.value.password
      }
    })

    // Auto-login après inscription
    const success = await auth.login({
      email: form.value.email,
      password: form.value.password
    })

    if (success) {
      router.push('/')
    }
  } catch (err: any) {
    error.value = err.data?.message || 'Une erreur est survenue lors de l\'inscription'
  } finally {
    loading.value = false
  }
}
</script>
