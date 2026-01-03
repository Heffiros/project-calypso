export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  // Si l'utilisateur est déjà connecté et essaie d'accéder à login/register
  if (auth.token) {
    return navigateTo('/')
  }
})
