import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const apiFetch = $fetch.create({
    baseURL: config.public.apiBase,
    async onRequest({ options }) {
      const token = localStorage.getItem('token')
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      }
    }
  })
  nuxtApp.provide('api', apiFetch)
})
