import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async () => {
  const auth = useAuthStore()
  const config = useRuntimeConfig()

  auth.init()
  if (!auth.token && config.public.environment === 'development') {
    console.log('🔑 Performing auto-login for development environment')
    await auth.autoLogin()
  }
})
