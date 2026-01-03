export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuthStore()

  // Si l'utilisateur n'est pas connecté et n'est pas sur login/register
  if (!auth.token && to.path !== '/login' && to.path !== '/register') {
    return navigateTo('/login')
  }
})
